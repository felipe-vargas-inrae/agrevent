
import findspark
findspark.init()
import pyspark
from pyspark.sql import SparkSession
import json

import pandas as pd 

import pyspark.sql.functions as F
from pyspark.sql.window import *

from pyspark.ml.regression import RandomForestRegressor
from pyspark.ml.evaluation import RegressionEvaluator


from pyspark.ml.feature import OneHotEncoderEstimator, StringIndexer, VectorAssembler

from pyspark.mllib.stat import Statistics

from pyspark.ml import Pipeline


class PysparkHelper:

    # self.sql_pipeline_dfs={}
    # self.sql_joiner={}
    # ml_pipeline_df={}
    # final_dataset={}
    
    def __init__(self):
        self.sql_pipeline_dfs={}
        self.sql_joiner={}
        self.ml_pipeline_df={}
        self.final_dataset={}

        

    def init_spark_session(self):
        MONGO_URI="mongodb://localhost:27017/iot_db" 
        self.my_spark_session = SparkSession \
        .builder \
        .appName("agreventPrototypeV1") \
        .master('local[*]')\
        .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.11:2.3.2")\
        .config("spark.mongodb.input.uri", MONGO_URI+".phis_experiments") \
        .getOrCreate()
    
    def stop_spark_session(self):
        self.my_spark_session.stop()
    
    def restart_spark_session(self):
        self.my_spark_session.stop()
        self.init_spark_session()
    
    def get_dataframe_spark(self,dataframe_name) : 
        print(dataframe_name)
        return self.my_spark_session.read.format("com.mongodb.spark.sql.DefaultSource")\
                                                .option("database","iot_db")\
                                                .option("collection", dataframe_name)\
                                                .load()
    
    def get_first_n_rows(self, dataframe_name, n_rows):
        df= self.get_dataframe_spark(dataframe_name)
        df_take=df.toJSON().map(lambda j: json.loads(j)).take(n_rows)
        return df_take

    
    def cal_correlation(self,df):
        col_names = df.columns
        features = df.rdd.map(lambda row: row[0:])
        corr_mat=Statistics.corr(features, method="pearson")
        corr_df = pd.DataFrame(corr_mat)
        corr_df.index, corr_df.columns = col_names, col_names
        return corr_df
    
    def join_dataframes(self,df1,df2, f1_column, f2_column):
        ta = df1.alias('ta')
        tb = df2.alias('tb')
        df_join = ta.join(tb, ta[f1_column] == tb[f2_column])
        return df_join

    
    def iterator_sql_pipeline(self,pipeline):
        name=pipeline["name"]

        self.sql_pipeline_dfs[name]={}#case 0 no relevant
        for method in pipeline["methods"]:
            
            self.sql_pipeline_dfs[name]=self.cases_sql_pipeline( self.sql_pipeline_dfs[name], method)
            

    
    def pipeline_param_value(self, params, param_name):
        for param in params:
            if param["name"]==param_name:
                if(param["type"]=='list'):
                    return  param["value"].split(',')
                return param["value"]

        return None

    
    def cases_sql_pipeline(self, df_previous, pipeline_properties):
        m = pipeline_properties["method"]
        params=pipeline_properties["params"]
        if m == 'read':
            df_name= self.pipeline_param_value(params,"dataframeName")
            return self.get_dataframe_spark(df_name)
        elif m == 'select':
            cols= self.pipeline_param_value(params,"cols")
            return df_previous.select(cols)
        elif m == 'drop':
            cols= self.pipeline_param_value(params,"cols")
            return df_previous.select([column for column in df_previous.columns if column not in cols])
        elif m == 'groupBy':
            cols = self.pipeline_param_value(params,"cols")
            return df_previous.groupBy(cols)
        elif m == 'pivot':
            col = self.pipeline_param_value(params,"col")
            return df_previous.pivot(col)
        elif m == 'mean':
            col = self.pipeline_param_value(params,"col")
            return df_previous.mean(col)
        elif m == 'sample':
            percentage = self.pipeline_param_value(params,"percentage")
            return df_previous.sample(False, float(percentage), 12345)
        elif m == 'timeseriesSumarizator':
            col_partition = self.pipeline_param_value(params,"colPartition")
            col_order_by = self.pipeline_param_value(params,"colOrderBy")
            group_size_days = self.pipeline_param_value(params,"groupSizeDays")
            n_days = self.pipeline_param_value(params,"nDays")
            col_group=col_partition

            df_current = self.sequential_basedon_window( df_previous, col_partition, col_order_by)
            df_current = self.filter_n_days( df_current, n_days)
            df_current = self.create_ts_groups( df_current, group_size_days)
            df_current = self.pivot_ts_groups_variables(df_current, col_group, n_days, group_size_days)
            
            return df_current
        else:
            return "function not included"
    
    def iterator_sql_join(self,joiner):
        
        LEFT_PIPELINE="leftPipeline"

        RIGHT_PIPELINE_FACTOR="rightPipeline"
        LEFT_COLUMN_FACTOR="leftColumn"
        RIGHT_COLUMN_FACTOR="rightColumn"

        df1_name=joiner[LEFT_PIPELINE]

        self.sql_joiner=self.sql_pipeline_dfs[df1_name]

        keys=joiner.keys()
        for key in keys :
            if(RIGHT_PIPELINE_FACTOR in key ):
                index= key[-1]

                df2_name= joiner[RIGHT_PIPELINE_FACTOR+index]
                df1=self.sql_joiner
                df2=self.sql_pipeline_dfs[df2_name]
                col1=joiner[LEFT_COLUMN_FACTOR+index]
                col2=joiner[RIGHT_COLUMN_FACTOR+index]

                self.sql_joiner=self.join_dataframes(df1,df2,col1,col2)
    
    def preprocessing_pipelines(self, json_pipelines_joiner):
        pipelines_list=json_pipelines_joiner["pipelineList"]
        joiner=json_pipelines_joiner["joinner"]
        # this method add the pipeline to global self.sql_pipeline_dfs
        for pipe in pipelines_list:
            self.iterator_sql_pipeline(pipe)
        
        # this method assume that pipelines exists in PysparkHelper.self.sql_pipeline_dfs
        # result is saved in final_dataset temporary it keeps in sql_joiner
        self.iterator_sql_join(joiner)

        

       # self.sql_joiner = self.sql_joiner()
        columns= self.sql_joiner.columns
        # fill na because problem with json tranformation
        df_take=self.sql_joiner.toJSON().map(lambda j: json.loads(j)).take(50)

        print("expected values",df_take)
        # df_describe=self.sql_joiner.describe().toJSON().map(lambda j: json.loads(j)).collect()
        return df_take, columns

    def sequential_basedon_window(self, dataframe, col_partition, col_order_by):
       
        window_spec=Window.partitionBy(col_partition).orderBy(col_order_by) 
        dataframe= dataframe.withColumn("row_number", F.row_number().over(window_spec))
        return dataframe
    def filter_n_days(self, dataframe, n_days):
        # no used yet
        dataframe= dataframe[dataframe["row_number"]<= n_days]
        return dataframe
    def create_ts_groups(self, dataframe, group_size_days):
        
        dataframe=dataframe.withColumn("ts_groups", F.ceil(F.col("row_number")/group_size_days))
        return dataframe
    def pivot_ts_groups_variables(selft,dataframe, col_group, n_days, group_size_days):
        number_groups=int(int(n_days)/int(group_size_days))

        print(number_groups)
        calculated_groups= list(range(1,number_groups+1)) # optimizing pivot function 


        excluded= ["ts_groups", "row_number", "dayOfYear","plantURI"]
        new_list= list(filter(lambda x: x not in excluded  , dataframe.columns))
        dict_vars =dict.fromkeys(new_list , 'mean')
        

        dataframe= dataframe.groupBy(col_group).pivot("ts_groups", calculated_groups).agg(dict_vars)
        return dataframe

    def run_ml(self, model_name,y,xi):

        xi.append(y)
        df_final= self.sql_joiner.select(xi)
        df_final=self.pipeline_ml(df_final,y)

        #df_take=df_final.toJSON().map(lambda j: json.loads(j)).take(50)

        # training dataset 
        df_final=df_final.na.drop()
        train, test = df_final.randomSplit([0.7, 0.3], seed = 2018)
        print("Training Dataset Count: " + str(train.count()))
        print("Test Dataset Count: " + str(test.count()))

        # return df_take
        if model_name=="RandomForest":


            # rf = RandomForestRegressor(featuresCol = 'features', labelCol = 'MV')
            # rf_model=rf.fit(train)
            # rf_predictions = rf_model.transform(test)
            # rf_evaluator = RegressionEvaluator(
            # labelCol="MV", predictionCol="prediction", metricName="rmse")
            # rmse = rf_evaluator.evaluate(rf_predictions)
            # print("Root Mean Squared Error (RMSE) on test data = %g" % rmse)
            # # feature importance
            # rf_model.featureImportances

            
            rf = RandomForestRegressor(featuresCol = 'features', labelCol = 'MV')
            rf_model=rf.fit(train)
            rf_predictions = rf_model.transform(test)

            # output results
            rf_evaluator_rmse = RegressionEvaluator(
                labelCol="MV", predictionCol="prediction", metricName="rmse")
            rf_evaluator_r2 = RegressionEvaluator(
                labelCol="MV", predictionCol="prediction", metricName="r2")
            
            rmse = rf_evaluator_rmse.evaluate(rf_predictions)
            r2 = rf_evaluator_r2.evaluate(rf_predictions)
            rmse_message=("Root Mean Squared Error (RMSE) on test data = %g" % rmse) 

            r2_message=("R2 on test data = %g" % r2) 


            evaluator_vs=  rf_predictions.toPandas()[['MV','prediction']].to_json(orient='records')

            return {"messageRMSE":rmse_message, "messageR2":r2_message , "predictions": evaluator_vs }


        else: return None
        

    def pipeline_ml(self, df, target_y):

       
        df_dataset_final=df

        # df_dataset_final=df_dataset_final.withColumnRenamed(target_y,"MV")
        # df_dataset_final=df_dataset_final.na.drop()

        # delete rows with no biomass value
        #df_dataset_final = df_dataset_final.na.drop(subset=[target_y])

        df_dataset_final=df_dataset_final.withColumn("MV", df_dataset_final[target_y].cast("double"))

        df_dataset_final= df_dataset_final.drop(target_y)
        df_dataset_final=df_dataset_final.na.drop()



        numeric_features = [t[0] for t in df_dataset_final.dtypes if t[1] == 'double' and t[0]!= "MV"]

        categorical_features = [t[0] for t in df_dataset_final.dtypes if t[1] == 'string' and t[0]!= "MV"]

        stages = []
        for categoricalCol in categorical_features:
            stringIndexer = StringIndexer(inputCol = categoricalCol, outputCol = categoricalCol + 'Index')
            encoder = OneHotEncoderEstimator(inputCols=[stringIndexer.getOutputCol()], outputCols=[categoricalCol + "classVec"])
            stages += [stringIndexer, encoder]


        assemblerInputs = [c + "classVec" for c in categorical_features] + numeric_features

        assembler = VectorAssembler(inputCols=assemblerInputs, outputCol="features")

        stages+=[assembler]

        # pipeline 
        
        pipeline = Pipeline(stages = stages)
        pipelineModel = pipeline.fit(df_dataset_final)
        df = pipelineModel.transform(df_dataset_final)
        selectedCols = ['MV', 'features'] + assemblerInputs
        df = df.select(selectedCols)



        return df



    def joiner_corrrelations(self):

        columnList = [item[0] for item in self.sql_joiner.dtypes if item[1].startswith('double')]
        joiner_aux= self.sql_joiner.select(columnList)

        joiner_aux=joiner_aux.na.fill(0.0)

        correlation_df = self.cal_correlation(joiner_aux) # pandas dataframe
        print(correlation_df)
        print('jello')

        return correlation_df.to_json()

        

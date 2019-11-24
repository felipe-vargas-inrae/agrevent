
import findspark
findspark.init()
import pyspark
from pyspark.sql import SparkSession
import json

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
        global my_spark_session
        my_spark_session = SparkSession \
        .builder \
        .appName("agreventPrototypeV1") \
        .master('local[*]')\
        .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.11:2.3.2")\
        .config("spark.mongodb.input.uri", MONGO_URI+".phis_experiments") \
        .getOrCreate()
    
    def stop_spark_session(self):
        my_spark_session.stop()
    
    def restart_spark_session(self):
        my_spark_session.stop()
        init_spark_session()
    
    def get_dataframe_spark(self,dataframe_name) : 
        print(dataframe_name)
        return my_spark_session.read.format("com.mongodb.spark.sql.DefaultSource")\
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
    
    def join_dataframes(df1,df2, f1_column, f2_column):
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
        elif m == 'groupBy':
            cols = pipeline_properties["params"]["cols"]
            return df_previous.groupBy(cols)
        elif m == 'pivot':
            col = pipeline_properties["params"]["col"]
            return df_previous.pivot(col)
        elif m == 'mean':
            col = pipeline_properties["params"]["col"]
            return df_previous.mean(col)
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
        # result is saved in final_dataset
        self.iterator_sql_join(joiner)

        
        df_take=self.sql_joiner.toJSON().map(lambda j: json.loads(j)).take(20)

        return df_take
        


        
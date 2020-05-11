
from pyspark.ml.regression import RandomForestRegressor
from pyspark.ml.evaluation import RegressionEvaluator

from pyspark.ml.feature import OneHotEncoderEstimator, StringIndexer, VectorAssembler
from pyspark.ml import Pipeline

from helpers.messages import Messages

from models.machine_learning_models import MachineLearningModels
'''
This class is for organizing machine learning call from pyspark
'''

LABEL_COL = "MV"
FEATURES_COL = "features"
PREDICTION_COL = "prediction"
MODEL_RF = MachineLearningModels.RF

class PySparkML:

    @classmethod
    def split_dataframe(cls, df_interno, training_rate=0.8):
    
        test_rate= 1.0 - training_rate 
        train, test = df_interno.randomSplit([training_rate, test_rate], seed = 2018)  
        return train, test

    @classmethod


    def run_ml(cls, model_name, y , xi,  sql_joiner):

        xi.append(y)# columns names

        df_final= sql_joiner.select(xi)
        df_final=cls.pipeline_ml(df_final,y)

        # training dataset 
        df_final=df_final.na.drop()
        train, test = cls.split_dataframe(df_final)
        # return df_take
        if model_name==MODEL_RF:
            rf = RandomForestRegressor(featuresCol = FEATURES_COL, labelCol = LABEL_COL)
            rf_model=rf.fit(train)
            
            rf_predictions = rf_model.transform(test)

            # output results
            rf_evaluator_rmse = RegressionEvaluator(
                labelCol=LABEL_COL, predictionCol=PREDICTION_COL, metricName="rmse")
            rf_evaluator_r2 = RegressionEvaluator(
                labelCol=LABEL_COL, predictionCol=PREDICTION_COL, metricName="r2")
            
            rmse = rf_evaluator_rmse.evaluate(rf_predictions)
            r2 = rf_evaluator_r2.evaluate(rf_predictions)
            rmse_message=(Messages.RMSE_MESSAGE % rmse) 

            r2_message=(Messages.R2_MESSAGE % r2) 


            evaluator_vs=  rf_predictions.select([LABEL_COL,PREDICTION_COL]).toPandas().to_json(orient='records')

            return dict(messageRMSE=rmse_message, messageR2=r2_message , predictions= evaluator_vs)


        else: return None

    @classmethod
    def pipeline_ml(cls, df, target_y):
        df_dataset_final=df

        df_dataset_final=df_dataset_final.withColumn(LABEL_COL, df_dataset_final[target_y].cast("double"))

        df_dataset_final= df_dataset_final.drop(target_y)
        df_dataset_final=df_dataset_final.na.drop()

        numeric_features = [t[0] for t in df_dataset_final.dtypes if t[1] == 'double' and t[0]!= LABEL_COL]

        categorical_features = [t[0] for t in df_dataset_final.dtypes if t[1] == 'string' and t[0]!= LABEL_COL]

        stages = []
        for categoricalCol in categorical_features:
            stringIndexer = StringIndexer(inputCol = categoricalCol, outputCol = categoricalCol + 'Index')
            encoder = OneHotEncoderEstimator(inputCols=[stringIndexer.getOutputCol()], outputCols=[categoricalCol + "classVec"])
            stages += [stringIndexer, encoder]


        assemblerInputs = [c + "classVec" for c in categorical_features] + numeric_features

        assembler = VectorAssembler(inputCols=assemblerInputs, outputCol=FEATURES_COL)

        stages+=[assembler]
        # pipeline 

        pipeline = Pipeline(stages = stages)
        pipelineModel = pipeline.fit(df_dataset_final)
        df = pipelineModel.transform(df_dataset_final)
        selectedCols = [LABEL_COL, FEATURES_COL] + assemblerInputs
        df = df.select(selectedCols)
        return df

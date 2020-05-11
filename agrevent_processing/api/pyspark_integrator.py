import pandas as pd 

#import pyspark.sql.functions as F
#from pyspark.sql.window import *


from pyspark_pipelines import PySparkPipelines
from pyspark_statistics import PySparkStatistics
from pyspark_ml import PySparkML
from pyspark_preprocessing import PySparkPreprocessing
from app_state import AppState
from pyspark_serializer import PySparkSerializer

# keeps the application state throught the four attributes instanced in init and updated during requests
class PysparkIntegrator:

    def __init__(self):
        print("crea un spark integrator")
        self.app_state=AppState() # instance an specific state 

    def get_dataframe_spark(self,dataframe_name) : 
        return PySparkPipelines.get_dataframe_spark(dataframe_name)
    
    # def get_first_n_rows(self, dataframe_name, n_rows):
    #     return PySparkSQL.get_first_n_rows(dataframe_name, n_rows)
    
    # def cal_correlation(self,df):
    #     return PySparkStatistics.cal_correlation(df)
    
    # def join_dataframes(self,df1,df2, f1_column, f2_column):
    #     return PySparkStatistics.join_dataframes(df1,df2, f1_column, f2_column)

    # def cases_sql_pipeline(self, df_previous, pipeline_properties):
    #     return PipelinesPySpark.cases_sql_pipeline(df_previous, pipeline_properties)
    
    def preprocessing_pipelines(self, json_pipelines_joiner):
        return PySparkPreprocessing.preprocessing_pipelines(json_pipelines_joiner, self.app_state)

    def run_ml(self, request_info):

        PARAM1="ModelML"
        PARAM2="target"
        PARAM3="listVariables"
        model_name = request_info[PARAM1]
        y = request_info[PARAM2]
        xi = request_info[PARAM3]

        return PySparkML.run_ml(model_name,y,xi, self.app_state.sql_joiner)
        

    # def pipeline_ml(self, df, target_y):
    #    return PySparkML.pipeline_ml(df, target_y)

    def joiner_corrrelations(self):
        sql_joiner=self.app_state.sql_joiner

        print("sql joiner", sql_joiner)
        correlation_df = PySparkStatistics.cal_correlation(sql_joiner) # pandas dataframe
        return PySparkSerializer.pandas_to_json(correlation_df)

        

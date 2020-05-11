

from models.schema_validator import SchemaValidator
from pyspark_pipelines import PySparkPipelines
from pyspark_serializer import PySparkSerializer
class PySparkPreprocessing: 
    

    @classmethod 
    def iterator_sql_join(cls,joiner_dict, sql_pipeline_dfs):
        
        LEFT_PIPELINE="leftPipeline"
        RIGHT_PIPELINE_FACTOR="rightPipeline"
        LEFT_COLUMN_FACTOR="leftColumn"
        RIGHT_COLUMN_FACTOR="rightColumn"

        df1_name=joiner_dict[LEFT_PIPELINE]
        sql_joiner=sql_pipeline_dfs[df1_name]

        keys=joiner_dict.keys()
        for key in keys :
            if(RIGHT_PIPELINE_FACTOR in key ):
                index= key[-1]

                df2_name= joiner_dict[RIGHT_PIPELINE_FACTOR+index]
                df1=sql_joiner
                df2=sql_pipeline_dfs[df2_name]
                col1=joiner_dict[LEFT_COLUMN_FACTOR+index]
                col2=joiner_dict[RIGHT_COLUMN_FACTOR+index]

                sql_joiner=PySparkPipelines.join_dataframes(df1,df2,col1,col2)

        return sql_joiner


    @classmethod
    def preprocessing_pipelines(cls, json_pipelines_joiner, app_state):

        N_RECORDS = 50
        
        pipelines_list_dict=json_pipelines_joiner["pipelineList"]
        joiner_dic=json_pipelines_joiner["joiner"]
        # this method add the pipeline to global self.sql_pipeline_dfs
        for pipe in pipelines_list_dict:
            pipeline_stages, pipeline_name = cls.iterator_sql_pipeline(pipe)
            app_state.update_sql_pipeline(pipeline_name,pipeline_stages) #save the state
        
        # this method assume that pipelines exists in PysparkHelper.self.sql_pipeline_dfs
        # result is saved in sql_joiner temporary it keeps in sql_joiner
        sql_joiner= cls.iterator_sql_join(joiner_dic, app_state.sql_pipeline_dfs)

        app_state.update_joiner(sql_joiner) # save the state 

        columns= sql_joiner.columns
        # fill na because problem with json tranformation
        df_take= PySparkSerializer.take_n_json(sql_joiner, N_RECORDS)                  

        #print("expected values",df_take)
        # df_describe=self.sql_joiner.describe().toJSON().map(lambda j: json.loads(j)).collect()
        return df_take, columns

    @classmethod
    def iterator_sql_pipeline(cls, pipeline_dict):
        
        
        name=pipeline_dict["name"]
        pipeline_stage_i= dict()
        for method in pipeline_dict["methods"]:
            pipeline_stage_i=PySparkPipelines.cases_sql_pipeline( pipeline_stage_i, method)

        return pipeline_stage_i, name
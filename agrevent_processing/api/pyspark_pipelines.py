

from helpers.singleton_spark_session import SingletonSparkSession
from transformation.transformation_sumarizator import TransformationSumarizator 

class PySparkPipelines:
    '''
    This class is for grouping pipelines methods. A pipeline is a ordered set of transformations aime to apply all the steps to some dataframe.
    A transformation can be methods like select, pivot, drop.
    It is different from ML Pipelines since  it is used the Dataframe API
    '''
    @classmethod
    def cases_sql_pipeline(cls, df_previous, pipeline_properties):
        ''' take a dataframe and apply the methods according to the case label then return a new transformed dataframe '''
        m = pipeline_properties["method"]
        params=pipeline_properties["params"]

        if m == 'read':
            df_name= cls.pipeline_param_value(params,"dataframeName")
            return cls.get_dataframe_spark(df_name)
        elif m == 'select':
            cols= cls.pipeline_param_value(params,"cols")
            return df_previous.select(cols)
        elif m == 'drop':
            cols= cls.pipeline_param_value(params,"cols")
            return df_previous.select([column for column in df_previous.columns if column not in cols])
        elif m == 'groupBy':
            cols = cls.pipeline_param_value(params,"cols")
            return df_previous.groupBy(cols)
        elif m == 'pivot':
            col = cls.pipeline_param_value(params,"col")
            return df_previous.pivot(col)
        elif m == 'mean':
            col = cls.pipeline_param_value(params,"col")
            return df_previous.mean(col)
        elif m == 'sample':
            percentage = cls.pipeline_param_value(params,"percentage")
            return df_previous.sample(False, float(percentage), 12345)
        elif m == 'timeseriesSumarizator':
            col_partition = cls.pipeline_param_value(params,"colPartition")
            col_order_by = cls.pipeline_param_value(params,"colOrderBy")
            group_size_days = cls.pipeline_param_value(params,"groupSizeDays")
            n_days = cls.pipeline_param_value(params,"nDays")
            col_group=col_partition
            sumarizator= TransformationSumarizator()
            return sumarizator.run_transformation(df_previous,col_partition,\
                col_order_by,group_size_days,n_days,col_group)

        else:
            return "function not included"
    @classmethod
    def pipeline_param_value(cls, params, param_name):
        ''' pipeline calls require parameters in some cases. Here is returned the param value from a list of parameters'''
        for param in params:
            if param["name"]==param_name:
                if(param["type"]=='list'):
                    return  param["value"].split(',')
                return param["value"]

        return None
    @classmethod
    def get_dataframe_spark(cls,dataframe_name) : 
        ''' 
        convert a mongodb collection into a spark dataframe, 
        this methods returns a Spark Dataframe methods such as select, group by, and so on could be used
        '''

        DATA_BASE = "iot_db"

        instance=SingletonSparkSession.getInstance()
        spark_session = instance.get_spark_session()

        return spark_session.read.format("com.mongodb.spark.sql.DefaultSource")\
                                                .option("database",DATA_BASE)\
                                                .option("collection", dataframe_name)\
                                                .load()
                                                
    @classmethod
    def join_dataframes(cls,df1,df2, f1_column, f2_column): 
        '''Apply join function to two spark dataframes'''
        ta = df1#.alias('ta')
        tb = df2#.alias('tb')
        
        if f1_column == f2_column: ## avoid repeat column in join result
            df_join = ta.join(tb,[f1_column])
        else:   
            df_join = ta.join(tb, ta[f1_column] == tb[f2_column])
        return df_join


    
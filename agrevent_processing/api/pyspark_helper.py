
import findspark
findspark.init()
import pyspark
from pyspark.sql import SparkSession

class PysparkHelper:

    sql_pipeline_dfs={}
    ml_pipeline_df={}
    final_dataset=[]
    @classmethod
    def init_spark_session(cls):
        MONGO_URI="mongodb://localhost:27017/iot_db" 
        global my_spark_session
        my_spark_session = SparkSession \
        .builder \
        .appName("agreventPrototypeV1") \
        .master('local[*]')\
        .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.11:2.3.2")\
        .config("spark.mongodb.input.uri", MONGO_URI+".phis_experiments") \
        .getOrCreate()
    @classmethod
    def stop_spark_session(cls):
        my_spark_session.stop()
    @classmethod
    def restart_spark_session(cls):
        my_spark_session.stop()
        init_spark_session()
    @classmethod
    def get_dataframe_spark(cls,dataframe_name) : 
        print(dataframe_name)
        return my_spark_session.read.format("com.mongodb.spark.sql.DefaultSource")\
                                                .option("database","iot_db")\
                                                .option("collection", dataframe_name)\
                                                .load()
    @classmethod
    def get_first_n_rows(cls, dataframe_name, n_rows):
        df= cls.get_dataframe_spark(dataframe_name)
        df_take=df.toJSON().map(lambda j: json.loads(j)).take(n_rows)
        return df_take

    @classmethod
    def cal_correlation(cls,df):
        col_names = df.columns
        features = df.rdd.map(lambda row: row[0:])
        corr_mat=Statistics.corr(features, method="pearson")
        corr_df = pd.DataFrame(corr_mat)
        corr_df.index, corr_df.columns = col_names, col_names
        return corr_df
    @classmethod
    def join_dataframes(df1,df2, f1_column, f2_column):
        ta = df1.alias('ta')
        tb = df2.alias('tb')
        df_join = ta.join(tb, ta[f1_column] == tb[f2_column])
        return df_join

    @classmethod
    def iterator_sql_pipeline(pipeline):
        global sql_pipeline_dfs
        name=pipeline["name"]
        for method in pipeline["methods"]:
            sql_pipeline_dfs[name]=cases_sql_pipeline( sql_pipeline_dfs[name], method)
            

    @classmethod
    def cases_sql_pipeline(cls, df_previous, pipeline_properties):
        m = pipeline_properties["method"]
        if m == 'read_df':
            df_name= pipeline_properties["params"]["df_name"]
            return get_dataframe_spark(df_name)
        elif m == 'select':
            cols= pipeline_properties["params"]["cols"]
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
    @classmethod
    def join_sql():
        global sql_pipeline_dfs
        df1_name = join_properties["params"]["df_name_1"]
        df2_name = pipeline_properties["params"]["df_name_2"]
        df1= sql_pipeline_dfs[df1_name]
        df2= sql_pipeline_dfs[df1_name]
        col=pipeline_properties["params"]["col"]
        return cls.join_dataframes(df1,df2,col,col)
        

from pyspark.mllib.stat import Statistics
import pandas as pd 
'''
This class is for organizing statistical calls from pyspark
'''
class PySparkStatistics:

    @classmethod
    def get_numerical_columns(cls, df):
        return [item[0] for item in df.dtypes if item[1].startswith('double')]

        
    @classmethod
    def cal_correlation(cls,df):

        METHOD = "pearson"
        columnList = cls.get_numerical_columns(df)

        df_aux= df.select(columnList)
        df_aux=df_aux.na.fill(0.0)
        col_names = df_aux.columns
        features = df_aux.rdd.map(lambda row: row[0:])
        corr_mat=Statistics.corr(features, method=METHOD)
        corr_df = pd.DataFrame(corr_mat)
        corr_df.index, corr_df.columns = col_names, col_names

        return corr_df

    
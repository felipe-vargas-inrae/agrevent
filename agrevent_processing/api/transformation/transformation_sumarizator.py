
import pyspark.sql.functions as F
from pyspark.sql.window import *


class TransformationSumarizator:
    @classmethod
    def run_transformation(cls, df_previous, col_partition,col_order_by,group_size_days, n_days, col_group):

        
        df_current = cls.sequential_basedon_window( df_previous, col_partition, col_order_by)
        df_current = cls.filter_n_days( df_current, n_days)
        df_current = cls.create_ts_groups( df_current, group_size_days)
        df_current = cls.pivot_ts_groups_variables(df_current, col_group, n_days, group_size_days)

        return df_current
    @classmethod    
    def sequential_basedon_window(cls, dataframe, col_partition, col_order_by):
        ''' create a row secuencial counting from 1 to n based on a window, a subset from data '''
        window_spec=Window.partitionBy(col_partition).orderBy(col_order_by) 
        dataframe= dataframe.withColumn("row_number", F.row_number().over(window_spec))
        return dataframe
    @classmethod
    def filter_n_days(cls, dataframe, n_days):
        '''based on the sequencial row_number get only the first n days'''
        # no used yet
        dataframe= dataframe[dataframe["row_number"]<= n_days]
        return dataframe
    @classmethod
    def create_ts_groups(cls, dataframe, group_size_days):
        '''define groups based in the group_size_days param, row_number is divided by the days and the part integer is the new group '''
        dataframe=dataframe.withColumn("ts_groups", F.ceil(F.col("row_number")/group_size_days))
        return dataframe
    @classmethod
    def pivot_ts_groups_variables(clst,dataframe, col_group, n_days, group_size_days):
        '''
        having created the ts_groups field inside the dataset, to perform the pivot function to aggregate
        variables using ts_groups as pivot field. If it is present a variable x and there is two groups then
        in the result will appear two new variables 1avg_(x) and  2avg_(x)
        '''
        number_groups=int(int(n_days)/int(group_size_days))
        print(number_groups)
        calculated_groups= list(range(1,number_groups+1)) # optimizing pivot function 


        ## columnns created during the processing
        excluded= ["ts_groups", "row_number", "dayOfYear","plantURI"]
        new_list= list(filter(lambda x: x not in excluded  , dataframe.columns))
        dict_vars =dict.fromkeys(new_list , 'mean')
        
        dataframe= dataframe.groupBy(col_group).pivot("ts_groups", calculated_groups).agg(dict_vars)
        return dataframe

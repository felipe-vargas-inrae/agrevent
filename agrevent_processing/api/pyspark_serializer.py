'''
This class aimed at converting spark ouputs in other formart for example pandas or json
'''
import json


class PySparkSerializer:

    @classmethod
    def take_n_json(cls,df, n_rows):
        df_take=df.toJSON().map(lambda j: json.loads(j)).take(n_rows)
        return df_take
        
    @classmethod
    def pandas_to_json(cls,df):
        return df.to_json()


class AppState:
    def __init__(self):
        print("crea un spark integrator")
        self.sql_pipeline_dfs=dict()
        self.sql_joiner=dict()
        # self.ml_pipeline_df=dict()
        # self.final_dataset=dict()
    def update_sql_pipeline(self,pipeline_name, pipeline_stages):
        self.sql_pipeline_dfs[pipeline_name]=pipeline_stages

    def update_joiner(self,df_joiner):
        self.sql_joiner= df_joiner
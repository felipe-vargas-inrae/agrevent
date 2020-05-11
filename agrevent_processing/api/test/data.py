

# Path hack.
import sys, os
import pathlib
parent_path = str(pathlib.Path(__file__).parent.parent.absolute())
sys.path.insert(0, parent_path)

from models.machine_learning_models import MachineLearningModels

pipeline_list_summary = {
        "name": "summary_pipeline",
        "methods": [
            {
                "method": "read",
                "params": [
                    {
                        "name": "dataframeName",
                        "value": "phis_biomass",
                        "type": "value"
                    }
                ]
            },
            {
                "method": "select",
                "params": [
                    {
                        "name": "cols",
                        "value": "plantURI,Genotype,Treatment,Biomass(gramos_pesofresco)",
                        "type": "list"
                    }
                ]
            }
        ]
    }


pipeline_list_timeseries={ 
    "name": "timeseries_pipeline", 

    "methods": [
        
        { "method": "read", "params": [{ "name": "dataframeName", "value": "phis_imagenanalysesangle_aggregated_by_day", "type": "value" }] }, 
        { "method": "sample", "params": [{ "name": "percentage", "value": "0.1", "type": "value" }] }, 
        { "method": "select", "params": [{ "name": "cols", "value": "plantURI,dayOfYear,variableCode,variableCodeValueAvg", "type": "list" }] },
        { "method": "groupBy", "params": [{ "name": "cols", "value": "plantURI,dayOfYear", "type": "list" }] }, 
        { "method": "pivot", "params": [{ "name": "col", "value": "variableCode", "type": "value" }] }, 
        { "method": "mean", "params": [{ "name": "col", "value": "variableCodeValueAvg", "type": "value" }] },
        { "method": "timeseriesSumarizator", "params": [{ "name": "colPartition", "value": "plantURI", "type": "value" }, { "name": "colOrderBy", "value": "dayOfYear", "type": "value" }, { "name": "nDays", "value": "30", "type": "value" }, { "name": "groupSizeDays", "value": "15", "type": "value" }] }, 
    ] 
}

joiner_summary = dict(leftPipeline="summary_pipeline")
joiner_timeseries = dict(leftPipeline="timeseries_pipeline")
joiner_join = dict(leftPipeline="summary_pipeline", rightPipeline1="timeseries_pipeline",\
                            leftColumn1="plantURI" , rightColumn1= "plantURI" )



def pipeline_data_summary():
    data=dict(pipelineList=[pipeline_list_summary], joiner=joiner_summary)
    return data

def pipeline_data_timeseries():
    data=dict(pipelineList=[pipeline_list_timeseries], joiner=joiner_timeseries)
    return data

def pipeline_data_joiner():
    data=dict(pipelineList=[pipeline_list_summary,pipeline_list_timeseries], joiner=joiner_join)
    return data

def ml_run_data():
    ml_run_data = dict(ModelML=MachineLearningModels.RF, target="Biomass(gramos_pesofresco)", listVariables=['2_avg(convex_hull_area)']  )
    return ml_run_data


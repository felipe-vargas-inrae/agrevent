
const list = [
    {
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
    },

    { 
        "name": "timeseries_pipeline", 
    
        "methods": [{ "method": "read", "params": [{ "name": "dataframeName", "value": "phis_imagenanalysesangle_aggregated_by_day", "type": "value" }] }, 

                { "method": "sample", "params": [{ "name": "percentage", "value": "0.1", "type": "value" }] }, 
                { "method": "select", "params": [{ "name": "cols", "value": "plantURI,dayOfYear,variableCode,variableCodeValueAvg", "type": "list" }] },
                { "method": "groupBy", "params": [{ "name": "cols", "value": "plantURI,dayOfYear", "type": "list" }] }, 
                { "method": "pivot", "params": [{ "name": "col", "value": "variableCode", "type": "value" }] }, 
                { "method": "mean", "params": [{ "name": "col", "value": "variableCodeValueAvg", "type": "value" }] },
                { "method": "timeseriesSumarizator", "params": [{ "name": "colPartition", "value": "plantURI", "type": "value" }, { "name": "colOrderBy", "value": "dayOfYear", "type": "value" }, { "name": "nDays", "value": "30", "type": "value" }, { "name": "groupSizeDays", "value": "15", "type": "value" }] },
                
            ] 
    
    }
     
     
]

export default list

/**
 * se necesita la matrix de correlacion de las variables numericas
 * 
 */
/**
 * to delete 1_avg(CAST(dayOfYear AS BIGINT)),1_avg(CAST(row_number AS BIGINT)),1_avg(ts_groups)
 */
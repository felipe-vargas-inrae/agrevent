
const list = [
    {
        "name": "pipeline1",
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
                "method": "map",
                "params": [
                    {
                        "name": "col1",
                        "value": "plantURI",
                        "type": "value"
                    },
                    {
                        "name": "col2",
                        "value": "ConvexHullArea",
                        "type": "value"
                    }
                ]
            },
            {
                "method": "select",
                "params": [
                    {
                        "name": "cols",
                        "value": "Biomass(gramos_pesofresco),Treatment",
                        "type": "list"
                    }
                ]
            }]
    },

    { "name": "ts_pipeline", 
    "methods": 
    [{ "method": "read", "params":
     [{ "name": "dataframeName", "value": "phis_imagenanalysesangle_aggregated_by_day", "type": "value" }] }, 
     { "method": "select", "params": [{ "name": "cols", "value": "plantURI,dayOfYear,variableCode,variableCodeValueAvg", "type": "list" }] },
     { "method": "groupBy", "params": [{ "name": "cols", "value": "plantURI,dayOfYear", "type": "list" }] }, 
     { "method": "pivot", "params": [{ "name": "col", "value": "variableCode", "type": "value" }] }, 
     { "method": "mean", "params": [{ "name": "col", "value": "variableCodeValueAvg", "type": "value" }] },
     { "method": "timeseriesSumarizator", "params": [{ "name": "colPartition", "value": "plantURI", "type": "value" }, { "name": "colOrderBy", "value": "dayOfYear", "type": "value" }, { "name": "nDays", "value": "30", "type": "value" }, { "name": "groupSizeDays", "value": "15", "type": "value" }] }] }
]

export default list
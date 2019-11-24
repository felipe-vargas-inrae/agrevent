
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
    }
]

export default list
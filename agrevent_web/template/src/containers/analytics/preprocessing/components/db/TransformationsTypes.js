

// df_images_anaysis.select("plantURI", "dayOfYear", "variableCode", "variableCodeValueAvg")
// df_images_anaysis.groupBy("plantURI", "dayOfYear").pivot("variableCode").mean("variableCodeValueAvg")
// df_grp_img_analysis.orderBy("plantURI","dayOfYear")

// actions 
// def cal_correlation(df)

const list= [
{
    method:"map",
    params:[
        {name:"col1" , value:"", type:"value" },
        {name:"col2" , value:"", type:"value" }
    ]
},
{
    method:"select",
    params:[
        {name:"cols" , value:"", type:"list" }
    ]
},
{
    method:"groupBy",
    params:[
        {name:"cols" , value:"", type:"list" }
    ]
},
{
    method:"pivot",
    params:[
        {name:"col" , value:"", type:"value" }
    ]
},
{
    method:"mean",
    params:[
        {name:"col" , value:"", type:"value" }
    ]
},
{
    method:"orderBy",
    params:[
        {name:"cols" , value:"", type:"list" }
    ]
}
// elaborated
,
{
    method:"timeseriesSumarizator",
    params:[
        {name:"colPartition" , value:"", type:"value" },
        {name:"colOrderBy" , value:"", type:"value" },
        {name:"nDays" , value:"", type:"value" },
        {name:"groupSizeDays" , value:"", type:"value" }
    ]
}
]

export default list
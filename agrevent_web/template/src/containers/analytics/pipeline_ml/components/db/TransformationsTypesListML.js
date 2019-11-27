

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
}
]
    
export default list
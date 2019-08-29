const ModelPhisList = require("../db/models/model_phis_entities_list")
const ctrl={}
ctrl.extractAllImagenAnalysisFromMongoDB=extractAllImagenAnalysisFromMongoDB

module.exports = ctrl;

const IMG_SCHEMA="imagesAnalysis"
const EXP_SCHEMA="experiments"

async function  validatePreviousCall(myApi, experimentURI){
    const schemaName= myApi
    const model= ModelPhisList.getModel(schemaName)
    const resultList=await model.findOne({experimentURI:experimentURI})
    return resultList != null 
}
async function extractAllImagenAnalysisFromMongoDB(req,response){
    const modelExperiments= ModelPhisList.getModel(EXP_SCHEMA)
    const projection={experimentURI:1, _id:0}
    const experimentList=await modelExperiments.find({}, projection)

    const messageList=[]
    for (let experiment of experimentList) {
        const wasCalledBefore=await validatePreviousCall(IMG_SCHEMA,experiment.experimentURI)
        if(wasCalledBefore){
            messageList.push({"message":"This call was made previously, delete the records associated exp:"+experiment.experimentURI })
        }
        else {
            const message=await extractImagenAnalysisFromMongoDB(experiment.experimentURI)
        }
    }
    console.log("final function for experiments")
    response.json(messageList)
}
async function extractImagenAnalysisFromMongoDB(expURI){
    
    console.log(expURI)
    const connectionURI = 'mongodb://147.100.175.101:27017/m3p'
    const fileSchema="imagenAnalysis_mongodb"
    const collectionName='imagesAnalysisResults'
    const model1= ModelPhisList.getModelDifferentConnection(fileSchema,connectionURI,collectionName)
    
    
    //const cursor=model1.find({"context.experiment":expURI})
    const countRecords=await model1.find({"context.experiment":expURI}).countDocuments();
    const pageSize=1000
    let skipIterator=0

    while(pageSize*skipIterator<countRecords && skipIterator<1){
        console.log("begin while")

        try {
            debugger
            const resultData= await model1.find({"context.experiment":expURI},{},{skip:skipIterator*pageSize,limit:pageSize})
            const transformedList= []

            for (let item of resultData) 
            {
                const baseObject={
                    experimentURI:item.context.experiment,
                    plantURI: item.context.plant,
                    date:item.date,
                    imageUri: item.images["1"].uri,
                    variablesObject:item.data
                }
                transformedList.push(baseObject)
                /*const jsonLikeVariables=item.data
                const keys= Object.keys(jsonLikeVariables)
                for(let i = 0;i<keys.length ;i++){
                    const currentKey= keys[i];
                    const currentValue=jsonLikeVariables[currentKey]
                    const finalObject= Object.assign({variableCodeId:currentKey,value:currentValue.value }, baseObject)
                    transformedList.push(finalObject)
                }*/
            }
            saveLocalDb(transformedList)
            

        } catch(error){
            console.log("error catch"+error)
            return [{message:"error page"+skipIterator }]
        }
         
         // add other
        skipIterator=skipIterator+1;
        console.log("page::"+skipIterator)
    }
}

async function saveLocalDb(resultList){
    const model= ModelPhisList.getModel(IMG_SCHEMA)
    model.insertMany(resultList,{ordered:false}).then(()=>{
        console.log("data saved locally")
    })
}
const ModelPhisList = require("../db/models/model_phis_entities_list")

const Performance  = require("../utils/performance")
const ctrl={}
ctrl.extractAllImagenAnalysisFromMongoDB=extractAllImagenAnalysisFromMongoDB

module.exports = ctrl;

const IMG_SCHEMA="imagesAnalysis"
const EXP_SCHEMA="experiments"
const model= ModelPhisList.getModel(IMG_SCHEMA)

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
    const pageSize=10000
    let skipIterator=0

    const start = new Date();
    while(pageSize*skipIterator<countRecords && skipIterator<4){
        console.log("begin while "+(countRecords-(pageSize*skipIterator)))
        //await timeout(1000)// 2 second per request
        try {
            
            const resultData= await model1.find({"context.experiment":expURI},{},{skip:skipIterator*pageSize,limit:pageSize})
            const transformedList= []

            for (let item of resultData) 
            {
                const baseObject={
                    experimentURI:item.context.experiment,
                    plantURI: item.context.plant,
                    date:item.images["1"].date,
                    imageUri: item.images["1"].uri,
                   // variablesCodeList:"prueba" //item.data
                }

                //console.log(item.data)

                
                const jsonLikeVariables=item.data
                const keys= Object.keys(jsonLikeVariables)
                const listKeysValue=[]
                for(let i = 0;i<keys.length ;i++){
                    const currentKey= keys[i];
                    const currentValue=jsonLikeVariables[currentKey]
                    const obj= {variableCodeId:currentKey,value:currentValue.value, angle:item.images["1"].cameraAngle }
                    listKeysValue.push(obj)
                    //transformedList.push(finalObject)
                }
                const finalObject = Object.assign(baseObject,{variablesCodeList:listKeysValue})

                transformedList.push(finalObject)
            }
            await saveLocalDb(transformedList,skipIterator)// one by moment
            //console.log(transformedList)
            

        } catch(error){
            console.log("error catch"+error)
            return [{message:"error page"+skipIterator }]
        }
         
         // add other
        skipIterator=skipIterator+1;
        console.log("page::"+skipIterator)
    }

    const end = new Date()

    Performance.timeUsage(start,end)
    Performance.memoryUsage()


}

async function saveLocalDb(resultList,page){
    try {
        const res= await model.insertMany(resultList,{ordered:true, rawResult: true })
        
        let inserted = res.ops;
        //let notInserted = res.mongoose.validationErrors
        
        //console.log('Inserted:\n', inserted);
        console.log(' Inserted:\n', res.insertedCount);    
        console.log("Insertion finalized ")
    }
    catch(error){
        console.error("Mongo", "error  page "+page)
        //console.error(resultList)
        //console.error(error)
        /*var maxSize=0.0
        for(let item of resultList){

            const bson = require('bson')
            var objSize= bson.calculateObjectSize(item)
            var kbSize= Math.round(objSize/(1024))
            if(maxSize<kbSize) maxSize=kbSize
            //console.log(objSize)
        }
        console.log(maxSize)*/
        console.log(error)
    }
}

//helper function for avoid stress the servers
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
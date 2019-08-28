const axios = require('axios');
const ModelPhisList = require("../db/models/model_phis_entities_list")
const AppResultToJsonFile = require("../services/phis_etl/app_phis_etl")
//const kafkaProducerBroker= require('../services/kafka/producer')

const ctrl={};
//experiments 
ctrl.getExperiments=getExperiments;
ctrl.createExperimentsSchemas=createExperimentsSchemas;
// enviroments 
ctrl.createEnvironmentsSchemas=createEnvironmentsSchemas;
ctrl.getEnvironmentsByExperiment=getEnvironmentsByExperiment;
ctrl.getAllEnvironments=getAllEnvironments
// image analysis
ctrl.createImagenAnalysisSchemas=createImagenAnalysisSchemas;
ctrl.getImagenAnalysisByExperiment=getImagenAnalysisByExperiment;
ctrl.getAllImagesAnalysis=getAllImagesAnalysis

// germplasm
ctrl.getGermplasmsByExperiment=getGermplasmsByExperiment;
ctrl.createGermplasmsSchemas=createGermplasmsSchemas;
ctrl.getAllGermplasms=getAllGermplasms

// plants
ctrl.getPlantsByExperiment=getPlantsByExperiment
ctrl.createPlantsSchemas=createPlantsSchemas;
ctrl.getAllPlants=getAllPlants

// watering
ctrl.getWateringByExperiment=getWateringByExperiment
ctrl.createWateringSchemas=createWateringSchemas;
ctrl.getAllWatering=getAllWatering

// weigthing
ctrl.createWeighingSchemas=createWeighingSchemas;
ctrl.getWeighingByExperiment=getWeighingByExperiment;
ctrl.getAllWeighing=getAllWeighing


module.exports = ctrl;

const API="http://147.100.179.156:8080/phenomeapi/resources/"
const API_EXP = API + "experiments"
const API_ENV = API + "environment"
const API_IMG = API + "imagesAnalysis"
const API_GRM= API+"germplasms"
const API_WEIG= API+"weighing"
const API_WAT= API+"watering"
const API_PLANTS=API + "plants"
const API_TOKEN= API + "token"

const authData= {username:"guestphis@supagro.inra.fr",password:"guestphis" }
const envData={
    experimentURI:"http://www.phenome-fppn.fr/diaphen/DIA2017-05-19"
}// used for created initial schema

const imgData={
    experimentURI:"http://www.phenome-fppn.fr/m3p/ARCH2017-03-30"
}// used for created initial schema

const wgData = imgData;

const defaultPage= {pageSize:"1000", page:"0"}

function getRootApi(fullApi){
    // used to name the model and the folder
    return fullApi.replace(API, '').split('?')[0];// always has at least the token
}

async function getExperiments(req, resInitial, next){
    getAllElements(resInitial,API_EXP)
}
async function createExperimentsSchemas(req, resInitial, next){
    createSchemas(resInitial,API_EXP);
}

// environments ----------------------------------------------------
async function createEnvironmentsSchemas(req, resInitial, next){
    createSchemas(resInitial,API_ENV, envData);
}
async function getAllEnvironments(req, resInitial,next){
    getAllGenericIteraExperiment(req,resInitial,"/get_environments/")  
}
async function getEnvironmentsByExperiment(req, resInitial, next){
    
    cleanFolder("environment")
    const data = {experimentURI:req.params.experimentURI }
    console.log("data in environment ",data)
    getAllElements(resInitial,API_ENV, data, (x)=>{
        x.experimentURI=req.params.experimentURI
        x.codeVariable= x.codeVariable.split(" ")[0]
        delete x.facility
        delete x.yyyymmdd
        return x
    });
}



// plants -------------------------------------------
async function createPlantsSchemas(req, resInitial, next){
    createSchemas(resInitial,API_PLANTS, imgData);
}
async function getPlantsByExperiment(req, resInitial, next){
    
    cleanFolder("plants")
    const data = {experimentURI:req.params.experimentURI }
    getAllElements(resInitial,API_PLANTS, data, (x)=>{
        x.experimentURI=req.params.experimentURI
        return x
    });
}
async function getAllPlants(req,resInitial){
    getAllGenericIteraExperiment(req,resInitial,"/get_plants/")
}

// watering -------------------------------------------
async function createWateringSchemas(req, resInitial, next){
    createSchemas(resInitial,API_WAT, imgData);
}
async function getWateringByExperiment(req, resInitial, next){
    
    cleanFolder("watering")
    const data = {experimentURI:req.params.experimentURI }
    getAllElements(resInitial,API_WAT, data, (x)=>{
        x.experimentURI=req.params.experimentURI
        return x
    });
}
async function getAllWatering(req,resInitial){
    getAllGenericIteraExperiment(req,resInitial,"/get_watering/")
}

// imagen analysis -------------------------------------------
async function createImagenAnalysisSchemas(req, resInitial, next){
    createSchemas(resInitial,API_IMG, imgData);
}
async function getImagenAnalysisByExperiment(req, resInitial, next){
    
    cleanFolder("image_analysis")
    const data = {experimentURI:req.params.experimentURI }
    getAllElements(resInitial,API_IMG, data, (x)=>{
        x.experimentURI=req.params.experimentURI
        return x
    });
}
async function getAllImagesAnalysis(req,resInitial){
    getAllGenericIteraExperiment(req,resInitial,"/get_imagen_analysis/")
}

// germplasm
async function createGermplasmsSchemas(req, resInitial, next){
    createSchemas(resInitial,API_GRM, imgData);
}
async function getGermplasmsByExperiment(req, resInitial, next){
    
    cleanFolder("germplasms")
    const data = {experimentURI:req.params.experimentURI }
    getAllElements(resInitial,API_GRM, data, (x)=>{
        x.experimentURI=req.params.experimentURI
        return x
    });
}
async function getAllGermplasms(req,resInitial){
    getAllGenericIteraExperiment(req,resInitial,"/get_germplasms/")
}

// weighing ------------------------------------------------------------------
async function createWeighingSchemas(req, resInitial, next){
    createSchemas(resInitial,API_WEIG, wgData);
}
async function getWeighingByExperiment(req, resInitial, next){
    cleanFolder("weighing")
    const data = {experimentURI:req.params.experimentURI }
    getAllElements(resInitial,API_IMG, data, (x)=>{
        x.experimentURI=req.params.experimentURI
        return x
    });
}
async function getAllWeighing(req,resInitial){
    getAllGenericIteraExperiment(req,resInitial,"/get_weighing/")
}

// HELPERS---------------------
async function getTokenAxios(){
    // Want to use async/await? Add the `async` keyword to your outer function/method.
    try {
      const response = await axios.get(API_TOKEN, {params:authData});
      const sessionId={sessionId:response.data["session_token"]} 
      return sessionId
    } catch (error) {
      console.error("token error");
    }
    return null
}

//helper function for avoid stress the servers
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function  validatePreviousCall(myApi, experimentURI){
    const schemaName= getRootApi(myApi)// always has at least the token
    const model= ModelPhisList.getModel(schemaName)
    const resultList=await model.findOne({experimentURI:experimentURI})
    return resultList != null 
}
// GENERIC FUNCTIONS --------------------------
async function getAllPages(apiURL, myToken, queryData, limit=10, mapFunc, saveIn="list"){

    wasCalledBefore=await validatePreviousCall(apiURL,queryData.experimentURI)
    if(wasCalledBefore){
        return {"message":"This call was made previously, delete the records associated" }
    }
    let myList = []
    // Want to use async/await? Add the `async` keyword to your outer function/method.
    let messageResponse=[]
    
    const par = Object.assign(myToken, queryData);

    let response={}
    try {
        response = await axios.get(apiURL, {params:par});
        response = response.data
       
    }catch(error){
        const message={message:"no information associated in sheet 0 "}
        console.log(message)
        return message
    }
    
    
    const realTotalPages= response["metadata"]["pagination"]["totalPages"] || 0
    const totalPages = realTotalPages > limit ? limit : realTotalPages // limit huge request
    const folderName= getRootApi(apiURL)// always has at least the token

    myList=response["result"]["data"]
    //myList=response
    if(mapFunc){
        myList=myList.map(mapFunc);
    }
    saveResult(myList,myList,saveIn, folderName)

    let arrayPromises=[]
    const counter={count:1.0}

    const myInterval=setInterval(function () { 
        //console.log("counting progress "+totalPages)
        console.log("progress",counter.count/totalPages)
        if(counter.count>=totalPages){
            clearInterval(myInterval)
        }
    }, 3000);
        
    let requestCounter=0
    const MAX_REQUEST=5
    const TIME_MS=10000
    for (let i=1; i< totalPages; i++){

        console.log("current i:", i)
        console.log("not resolved :", i-counter.count)

        
        const auxFunCallAxios = (itera)=>{
            const clonePar=Object.assign({}, par)
            clonePar.page=itera
            return axios.get(apiURL, {params:clonePar})
        }
        const myPromise =  auxFunCallAxios(i)
        myPromise.then((resp)=> { 

            let resultList=resp["data"]["result"]["data"]
            //let resultList=resp["data"]
            
            if(mapFunc){
                resultList=resultList.map(mapFunc);
            }
            saveResult(resultList,myList,saveIn, folderName)
            counter.count=counter.count+1.0;
            console.error("success "+i);
            
        }).catch(function (error) {
            // handle error
            console.error("error "+i);
            //console.error(error);
            counter.count=counter.count+1.0;
            messageResponse.push({"message": "error page:"+i})
        })

        if(i%MAX_REQUEST==0){
            // wait every 10 calls 10 seconds
            await timeout(TIME_MS)
        }
        arrayPromises.push(myPromise)
    }
    try {
        await axios.all(arrayPromises)
        if (saveIn=="list"){
            return myList
        }
        return messageResponse
    }
    catch(bad) {
        console.log("error catch all"); 
        messageResponse.push({"message": "error catch all"})
        return messageResponse
    }
    
}  

async function getAllElements(resInitial,currentApi, dataRequest, mapFunc){
    console.log("downloading elements ");
    var allElements=[]
    var myToken= await getTokenAxios()
    data = Object.assign(defaultPage,dataRequest)

    if (myToken){
       let allElements= await getAllPages(currentApi, myToken, data,Number.MAX_VALUE , mapFunc, "db")// no limit of pages
       resInitial.json({"message":allElements})
    }
    else {
        resInitial.json({"message":"token was not generated"})
    }
}
async function createSchemas(resInitial,currentApi, dataRequest){
    console.log("downloading elements ICASA");
    
    const myToken= await getTokenAxios()
    console.log("get token "+myToken)
    const schemaName= getRootApi(currentApi)
    if (myToken){
        const data = Object.assign(defaultPage,dataRequest)
        let allElements= await getAllPages(currentApi, myToken, data)// limit to 10 pages, save in list
        createSchemaFromList(allElements, schemaName, ()=>{
                resInitial.json({"message":schemaName+" schema created"})
        })
    }
    else {
        resInitial.json({"message":"token was not generated"})
    }
}
function createSchemaFromList(list, schemaName, callback){
    const AppICASAtoMongoose= require("../services/mongo_icasa/app_icasa_to_mongoose");
    AppICASAtoMongoose.addPhisSchemaFromJSONList(list,schemaName ).then(callback);
}
function cleanFolder(folderName){
    
    AppResultToJsonFile.cleanPhisFolder(folderName)
}

function saveResult(resultList, ListOptional, option, folderName){
    
    switch(option){
        case "list":{
            ListOptional=ListOptional.concat(resultList)
            break;
        }
        case "file":{
            
            AppResultToJsonFile.printPhisData(resultList, folderName)
            break;
        }
        case "db":{
            
            const model= ModelPhisList.getModel(folderName)

            //let resultList2= [{repetition:'12-12-1991'},{repetition:'www'}]

            model.insertMany(resultList).then(()=>{console.log("inserted")}).catch((error)=>{
                console.error("error in insert many", error)
            })
            break
        }
        case "broker":{
            //kafkaProducerBroker.sendDataToBroker(resultList, folderName)
            if(folderName=="experiments"){// save experiments in database for retrieval information
                saveResult(resultList, ListOptional, "db", folderName)
            }
        }
    }
}

async function getAllGenericIteraExperiment(req, resInitial, shorUrl){
    //query all the experiment
    
    const modelExperiments= ModelPhisList.getModel(getRootApi(API_EXP))
    const projection={experimentURI:1, _id:0}
    
    const urlInterna= "http://"+req.headers.host+req.baseUrl+shorUrl//"/get_environments/"
    console.log(urlInterna)
    modelExperiments.find({}, projection).then(async (allExperiments)=>{
        if (allExperiments){
            const responseArray=[]
            const axiosArray=[]
            allExperiments.forEach((experiment)=>{

                const axiosCall=axios.get(urlInterna+encodeURIComponent(experiment.experimentURI)).then((response)=>{
                    responseArray.push({message:shorUrl+" for experiment "+experiment.experimentURI, response:response.data})
                    console.log("experiment "+experiment.experimentURI)
                }).catch((error)=>{
                    console.log("error axios "+experiment.experimentURI)
                    responseArray.push({message:shorUrl+" for experiment "+experiment.experimentURI, response:error })
                })
                axiosArray.push(axiosCall)
            })
            await axios.all(axiosArray)

            
            AppResultToJsonFile.printPhisData(responseArray, shorUrl.replace('/',''))
            resInitial.json(responseArray)
        }
    }).catch((error)=>{
        console.log(error)
    })
}
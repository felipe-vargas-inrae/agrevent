const axios = require('axios');

const ctrl={};
//experiments 
ctrl.getExperiments=getExperiments;
ctrl.createExperimentsSchemas=createExperimentsSchemas;
// enviroments 
ctrl.createEnvironmentsSchemas=createEnvironmentsSchemas;
ctrl.getEnvironmentsByExperiment=getEnvironmentsByExperiment;
// image analysis
ctrl.createImagenAnalysisSchemas=createImagenAnalysisSchemas;
ctrl.getImagenAnalysisByExperiment=getImagenAnalysisByExperiment;
// germplasm
ctrl.getGermByExperiment=getGermByExperiment;

//for all
ctrl.getAllEnvironments=getAllEnvironments

ctrl.getAllImagesAnalysis=getAllImagesAnalysis

module.exports = ctrl;

const API="http://147.100.179.156:8080/phenomeapi/resources/"
const API_EXP = API + "experiments"
const API_ENV = API + "environment"
const API_IMG = API + "imagesAnalysis"
const API_GRM= API+"germplasms"
const API_TOKEN= API + "token"

const authData= {username:"guestphis@supagro.inra.fr",password:"guestphis" }
const envData={
    experimentURI:"http://www.phenome-fppn.fr/diaphen/DIA2017-05-19"
}// used for created initial schema

const imgData={
    experimentURI:"http://www.phenome-fppn.fr/m3p/ARCH2017-03-30"
}// used for created initial schema

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

// environments
async function createEnvironmentsSchemas(req, resInitial, next){
    // se hace necesario saber cual es el elemento que al consultarlo genera una lista
    createSchemas(resInitial,API_ENV, envData);
}

async function getAllEnvironments(req, resInitial,next){
    //query all the experiment
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

// imagen analysis
async function createImagenAnalysisSchemas(req, resInitial, next){
    createSchemas(resInitial,API_IMG, imgData);
}
async function getImagenAnalysisByExperiment(req, resInitial, next){
    
    cleanFolder("image_analysis")
    const data = {experimentURI:req.params.experimentURI }
    getAllElements(resInitial,API_IMG, data, (x)=>{
        x.experimentURI=req.params.experimentURI
        /*x.codeVariable= x.codeVariable.split(" ")[0]
        delete x.facility
        delete x.yyyymmdd*/
        
        return x
    });
}

async function getAllImagesAnalysis(req,resInitial){
    getAllGenericIteraExperiment(req,resInitial,"/get_imagen_analysis/")
}

async function getGermByExperiment(req, resInitial, next){
    
    cleanFolder("germplasm")
    const data = {experimentURI:req.params.experimentURI }
    getAllElements(resInitial,API_GRM, data, (x)=>{
        x.experimentURI=req.params.experimentURI
        /*x.codeVariable= x.codeVariable.split(" ")[0]
        delete x.facility
        delete x.yyyymmdd*/
        return x
    });
}

// HELPER
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


// GENERIC FUNCTIONS
async function getAllPages(apiURL, myToken, queryData, limit=10, mapFunc, saveIn="list"){
    let myList = []
    // Want to use async/await? Add the `async` keyword to your outer function/method.
    let messageResponse=[]
    
    const par = Object.assign(myToken, queryData);

    let response={}
    try {
        response = await axios.get(apiURL, {params:par});
        response = response.data
    }catch(error){
        const message={message:"no information associated in sheet 0 ", url:apiURL, settings:par}
        console.log(message)
        return [message]
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
        console.log("counting progress "+totalPages)
        console.log(counter.count/totalPages)
        if(counter.count>=totalPages){
            clearInterval(myInterval)
        }
    }, 3000);
        

    for (let i=1; i< totalPages; i++){
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
        arrayPromises.push(myPromise)
    }
    try {
        await axios.all(arrayPromises)
    }
    catch(bad) {
        console.log("error catch all"); 
    }
    if (saveIn=="list"){
        return myList
    }
    return messageResponse
}  

async function getAllElements(resInitial,currentApi, dataRequest, mapFunc){
    console.log("downloading elements ");
    var allElements=[]
    var myToken= await getTokenAxios()
    data = Object.assign(defaultPage,dataRequest)

    if (myToken){
       let allElements= await getAllPages(currentApi, myToken, data,5 , mapFunc, "broker")// no limit of pages
       resInitial.json({"data":allElements})
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
    const AppResultToJsonFile = require("../services/phis_etl/app_phis_etl")
    AppResultToJsonFile.cleanPhisFolder(folderName)
}

function saveResult(resultList, ListOptional, option, folderName){
    
    switch(option){
        case "list":{
            ListOptional=ListOptional.concat(resultList)
            break;
        }
        case "file":{
            const AppResultToJsonFile = require("../services/phis_etl/app_phis_etl")
            AppResultToJsonFile.printPhisData(resultList, folderName)
            break;
        }
        case "db":{
            const ModelPhisList = require("../db/models/model_phis_entities_list")
            const model= ModelPhisList.getModel(folderName)
            model.insertMany(resultList).then(()=>{console.log("inserted")}).catch(()=>{
                console.error("error in insert many")
            })
            break
        }
        case "broker":{
            const kafkaProducerBroker= require('../services/kafka/producer')
            kafkaProducerBroker.sendDataToBroker(resultList, folderName)
        }
    }
}


async function getAllGenericIteraExperiment(req, resInitial, shorUrl){
    //query all the experiment
    const ModelPhisList = require("../db/models/model_phis_entities_list")
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
                    responseArray.push({message:shorUrl+" for experiment"+experiment.experimentURI})
                    console.log("experiment "+experiment.experimentURI)
                }).catch((error)=>{
                    console.log("error axios "+experiment.experimentURI)
                    console.log(error)
                })
                axiosArray.push(axiosCall)
            })
            await axios.all(axiosArray)
            resInitial.json(responseArray)
        }
    }).catch((error)=>{
        console.log(error)
    })
}
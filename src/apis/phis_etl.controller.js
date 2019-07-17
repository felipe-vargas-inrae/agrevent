
const request = require('request');
const axios = require('axios');

const ctrl={};
//experiments 
ctrl.getExperiments=getExperiments;
ctrl.createExperimentsSchemas=createExperimentsSchemas;
ctrl.loadExperimentsDB=loadExperimentsDB;
// enviroments 
ctrl.createEnvironmentsSchemas=createEnvironmentsSchemas;
ctrl.getEnvironmentsByExperiment=getEnvironmentsByExperiment;

module.exports = ctrl;

var myToken=null;
const API="http://147.100.179.156:8080/phenomeapi/resources/"
const API_EXP = API + "experiments"
const API_ENV = API + "environment"
const API_TOKEN= API + "token"

const authData= {username:"guestphis@supagro.inra.fr",password:"guestphis" }
const envData={
    experimentURI:"http://www.phenome-fppn.fr/diaphen/DIA2017-05-19"
    ,startDate:"2017-05-19", endDate:"2017-09-22"
}// used for created initial schema

const defaultPage= {pageSize:"20", page:"0"}

async function getExperiments(req, resInitial, next){
    getAllElements(resInitial,API_EXP)
}
async function createExperimentsSchemas(req, resInitial, next){
    createSchemas(resInitial,API_ENV, "experiments");
}

// environments
async function createEnvironmentsSchemas(req, resInitial, next){
    createSchemas(resInitial,API_ENV, "enviroments", envData);
}
async function getEnvironmentsByExperiment(req, resInitial, next){
    
    cleanFolder("environment")
    const data = {experimentURI:req.params.experimentURI }
    getAllElements(resInitial,API_ENV, data, (x)=>{
        x.experimentURI=req.params.experimentURI
        return x
    });
}


// debo crear una funcion generica para que sea relacionado a la carga en la bd
async function loadExperimentsDB(req, resInitial, next){

    console.log("downloading experiments ");
    var allExperiments=[]
    var myToken= await getTokenAxios()
    if (myToken){
       const allExperiments= await getAllPages(API_EXP, myToken, defaultPage)
       resInitial.json({"data":allExperiments})
    }
}


// HELPER
async function getTokenAxios(){
    // Want to use async/await? Add the `async` keyword to your outer function/method.
    try {
      const response = await axios.get(API_TOKEN, {params:authData});
      const sessionId={sessionId:response.data["session_token"]} 
      return sessionId
    } catch (error) {
      console.error(error);
    }
    return null
}


// GENERIC FUNCTIONS

async function getAllPages(apiURL, myToken, queryData, limit=10, mapFunc){
    let myList = []
    // Want to use async/await? Add the `async` keyword to your outer function/method.

    try {
        const par = Object.assign(myToken, queryData);
        let response = await axios.get(apiURL, {params:par});
        
        
        response = response.data

        

        const realTotalPages= response["metadata"]["pagination"]["totalPages"] || 0

        const totalPages = realTotalPages > limit ? limit : realTotalPages // limit huge request

        const folderName= apiURL.replace(API, '').split('?')[0];// always has at least the token

        //myList=response["result"]["data"]
        myList=response
        if(mapFunc){
            //myList=myList.map(mapFunc);
        }
        saveResult(myList,myList,"file", folderName)

        let arrayPromises=[]
        for (let i=1; i< totalPages; i++){

            
            let clonePar=Object.assign(par, {page:i})
            //console.log(clonePar)


            const myPromise =  axios.get(apiURL, {params:clonePar}).then((resp)=> { 
                //let resultList=resp["data"]["result"]["data"]


                //saveResult(resp,myList,"file", folderName)
                console.log("config", resp.config)

                let resultList=resp["data"]
                if(mapFunc){
                    //console.log(resultList["metadata"])
                    //resultList=resultList.map(mapFunc);
                }
                //saveResult(resultList,myList,"file", folderName)
                
             })
            arrayPromises.push(myPromise)
        }
        await Promise.all(arrayPromises)
        return myList
    } catch (error) {
        console.error(error);
    }
    return null
}  

async function getAllElements(resInitial,currentApi, dataRequest, mapFunc){
    console.log("downloading elements ");
    var allElements=[]
    var myToken= await getTokenAxios()
    data = Object.assign(defaultPage,dataRequest)

    console.log("main function",myToken )
    if (myToken){
       let allElements= await getAllPages(currentApi, myToken, data, 10 , mapFunc)// limit of pages
       //allElements=allElements.map(mapFunc)
       resInitial.json({"data":allElements})
    }
}
async function createSchemas(resInitial,currentApi, schemaName, dataRequest){
    console.log("downloading elements ICASA");
    var allElements=[]
    var myToken= await getTokenAxios()
    if (myToken){
        data = Object.assign(defaultPage,dataRequest)
        const allElements= await getAllPages(currentApi, myToken, data)// limit to 10 pages
        createSchemaFromList(allElements, schemaName, ()=>{
                resInitial.json({"message":schemaName+" schema created"})
        })
    }
}
function createSchemaFromList(list, schemaName, callback){
    const AppICASAtoMongoose= require("../mongoICASA/appICASAtoMongoose");
    AppICASAtoMongoose.addSchemaFromJSONList(list,schemaName ).then(callback);
}


function cleanFolder(folderName){
    const AppResultToJsonFile = require("../services/phis_etl/app_phis_etl")
    AppResultToJsonFile.cleanPhisFolder(folderName)
}
function saveResult(resultList, ListOptional, option, folderName){
    
    switch(option){
        case "concat":{
            ListOptional=ListOptional.concat(resultList)
            break;
        }
        case "file":{
            const AppResultToJsonFile = require("../services/phis_etl/app_phis_etl")
            AppResultToJsonFile.printPhisData(resultList, folderName)
            break;
        }
    }
}
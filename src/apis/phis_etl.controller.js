
const request = require('request');
const axios = require('axios');

const ctrl={};
ctrl.getExperiments=getExperiments;
ctrl.createExperimentsSchemas=createExperimentsSchemas;
ctrl.loadExperimentsDB=loadExperimentsDB;

module.exports = ctrl;

var myToken=null;
const API="http://147.100.179.156:8080/phenomeapi/resources/"
const API_EXP = API + "experiments"
const API_TOKEN= API + "token"
const authData= {username:"guestphis@supagro.inra.fr",password:"guestphis" }
const defaultPage= {pageSize:"20", page:"0"}

async function getExperiments(req, resInitial, next){

    console.log("downloading experiments ICASA");
    var allExperiments=[]
    var myToken= await getTokenAxios()
    console.log("main function",myToken )
    if (myToken){
       const allExperiments= await getAllPages(API_EXP, myToken, defaultPage)
       resInitial.json({"data":allExperiments})
    }
}

async function createExperimentsSchemas(req, resInitial, next){

    console.log("downloading experiments ICASA");
    var allExperiments=[]
    var myToken= await getTokenAxios()
    console.log("main function",myToken )
    if (myToken){
       const allExperiments= await getAllPages(API_EXP, myToken, defaultPage)

       createSchemaFromList(allExperiments, "experiments", ()=>{
            resInitial.json({"message":"experiment schema created"})
       })
    }
}

async function loadExperimentsDB(req, resInitial, next){

    console.log("downloading experiments ICASA");
    var allExperiments=[]
    var myToken= await getTokenAxios()
    console.log("main function",myToken )
    if (myToken){
       const allExperiments= await getAllPages(API_EXP, myToken, defaultPage)
       resInitial.json({"data":allExperiments})
    }
}

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

async function getAllPages(apiURL, myToken, queryData){
    let myList = []
    // Want to use async/await? Add the `async` keyword to your outer function/method.

    try {
        const par = Object.assign(myToken, queryData);
        let response = await axios.get(apiURL, {params:par});
        console.log("page 1 data", response.data);
        response = response.data

        const totalPages= response["metadata"]["pagination"]["totalPages"] || 0

        myList=response["result"]["data"]
        let arrayPromises=[]
        for (let i=0; i< totalPages; i++){
            const myPromise =  axios.get(apiURL, {params:par});
            myPromise.then((resp)=> { myList.concat(resp["data"]["result"]["data"]) })
            arrayPromises.push(myPromise)
        }
        await Promise.all(arrayPromises)
        return myList
    } catch (error) {
        console.error(error);
    }
    return null
}

function createSchemaFromList(list, schemaName, callback){
    const AppICASAtoMongoose= require("../mongoICASA/appICASAtoMongoose");
    AppICASAtoMongoose.addSchemaFromJSONList(list,schemaName ).then(callback);
}


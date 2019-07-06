

const request = require('request');
const axios = require('axios');

const ctrl={};
ctrl.getExperiments=getExperiments;

module.exports = ctrl;

//const authData={"username":"guestphis", "password":"guestphis"}
var myToken=null;

const API="http://147.100.179.156:8080/phenomeapi/resources/"
const API_EXP = API + "experiments"
const API_TOKEN= API + "token"
//const API_EXP_ALL=API+"experiments?pageSize=20&{page}&sessionId={token}"

//const API_TOKEN_PARAMS= API_TOKEN+"?username=guestphis%40supagro.inra.fr&password=guestphis" 
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

/*
    request.get(API_URL_TOKEN , (err, res, body) => {
        if (err) { return console.log(err); }
        body=JSON.parse(body)
        myToken =body["session_token"]
        request.get(
            API_URL_ALL_EXP.replace("{page}","page=0").replace("{token}",myToken ) 
            , (err, res, body) => {
                if(err) return console.log("error")

                const currentPage= 0 
                body=JSON.parse(body)
                const totalPages = body["metadata"]["pagination"]["totalPages"]
                const items= body["result"]["data"]
                console.log("items",items)
                allExperiments=allExperiments.concat(items)
                for(var i=1; i<totalPages ;i++){
                    request.get(
                         API_URL_ALL_EXP.replace("{page}","page="+i).replace("{token}",myToken )  , 
                         (err, res, body) => {
                            body=JSON.parse(body)
                            const items= body["result"]["data"]
                            console.log("items",items)
                            allExperiments=allExperiments.concat(items)
                        })
                }
                

                allExperiments= allExperiments.map((experiment)=>{

                    return  {id:experiment["experimentDbId"], uri:  experiment["experimentURI"]}
                })

                resInitial.json({"data":allExperiments})
            }
        )
        
    });*/
}

function getToken(){

    return request.get(API_URL_TOKEN , (err, res, body) => {
        if (err) { return console.log(err); }
        body=JSON.parse(body)
        myToken =body["session_token"]
        
    });
}

async function getTokenAxios(){
    // Want to use async/await? Add the `async` keyword to your outer function/method.
    try {
      const response = await axios.get(API_TOKEN, {params:authData});
      console.log("inside method axios", response.data);
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
        console.log("no pasa promesas", myList)
        return myList
        //return response.data["session_token"]
    } catch (error) {
        console.error(error);
    }
    return null

}


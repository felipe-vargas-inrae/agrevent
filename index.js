/*var app = require('express')();
var fileUpload = require('express-fileupload');
var server = require('http').Server(app);
 
app.use(fileUpload());
 
server.listen(80);
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});*/

/*const mongoose = require('mongoose');
mongoose.connect("mongodb://0.tcp.ngrok.io:10844/iot_db", { useNewUrlParser: true });
require('dotenv').config();

console.log(mongoose.connection.readyState);
setTimeout(()=>{console.log(mongoose.connection.readyState)},5000)
/*
const readline = require('readline-sync');

const appMongo= require("./src/mongoStations/appMongoLoader");

const AppDocICASAtoJson= require("./src/mongoICASA/appDocICASAtoJson");

const AppICASAtoMongoose= require("./src/mongoICASA/appICASAtoMongoose");

const AppCleanFolders= require("./src/mongoICASA/appCleanFolders");

const AppDataToMongo=require("./src/mongoICASA/appDataToMongo")

var runJobName ="none"; //readline.question("What job run?");

AppDataToMongo.run()

switch(runJobName){
  case "read_doc":
    AppDocICASAtoJson.run();
    break;
  case "data_schema":
    AppICASAtoMongoose.run();
    break;
  case "clean":
    AppCleanFolders.run();
    break;
  case "model_gen":

    break;
  default:
    console.log("this is not a job name");
  */
//}
const mongoose = require('mongoose');
const fs = require('fs')


let ModelPhisList = {};
//const icasaTables = process.env.LIST_COLLECTIONS_ICASA.split(",");
const readFileJSON = (file) => {
  data = fs.readFileSync(file, 'utf8')
  obj = JSON.parse(data);
  return obj;
}
const schemaGeneration = (schemaJson, modelName) => {
  let schemaId = {
    _id: mongoose.Schema.Types.ObjectId
  }

  if(["environment","imagesAnalysis","plants","watering", "germplasms"].includes(modelName)){
    schemaId = {...schemaId, ...{experimentURI:{type:"String"}}}
  }
  const localSchema = mongoose.Schema(
    {...schemaId, ...schemaJson }
  );
  return localSchema
}
let modelList={}
function getModel(modelName){
  if(modelList[modelName]) return modelList[modelName]//avoid created twice
  const localFolder = process.env.FOLDER_SCHEMAS_JSON_PHIS;
  const localPrefix = process.env.PREFIX_SCHEMAS_JSON;
  const localFile = localFolder + localPrefix + modelName + ".json";
  const localJsonSchema = readFileJSON(localFile);
  const localMoongooseSchema = schemaGeneration(localJsonSchema,modelName)
  const PREFIX= process.env.PREFIX_PHIS_DATA;
  modelList[modelName]=mongoose.model(PREFIX+modelName, localMoongooseSchema);
  return  modelList[modelName]
}

function getModelDifferentConnection(modelName,connection,collectionName){
  if(modelList[modelName]) return modelList[modelName]//avoid created twice
  const localFolder = process.env.FOLDER_SCHEMAS_JSON_PHIS;
  const localPrefix = process.env.PREFIX_SCHEMAS_JSON;
  const localFile = localFolder + localPrefix + modelName + ".json";
  const localJsonSchema = readFileJSON(localFile);
  const localMoongooseSchema = schemaGeneration(localJsonSchema,modelName)

  var conn2 = mongoose.createConnection(connection,{ useNewUrlParser: true });
  const model=conn2.model("MySchemaImg", localMoongooseSchema, collectionName);

  // CONNECTION EVENTS
// When successfully connected
conn2.on('connected', function () {  
  console.log('Mongoose default connection open to ' );
}); 

// If the connection throws an error
conn2.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
conn2.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

  return  model
}
//ICASAStandardSchema.index({Timestamp:1});
//var ICASAStandardModel= mongoose.model("ICASAStandard", ICASAStandardSchema);
ModelPhisList.getModel=getModel
ModelPhisList.getModelDifferentConnection=getModelDifferentConnection

module.exports = ModelPhisList
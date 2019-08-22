const mongoose = require('mongoose');
const fs = require('fs')


let ModelPhisList = {};
const icasaTables = process.env.LIST_COLLECTIONS_ICASA.split(",");
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
//ICASAStandardSchema.index({Timestamp:1});
//var ICASAStandardModel= mongoose.model("ICASAStandard", ICASAStandardSchema);
ModelPhisList.getModel=getModel

module.exports = ModelPhisList
const mongoose = require('mongoose');
const fs = require('fs')


let ModelICASAStandardList = {};
const icasaTables = process.env.LIST_COLLECTIONS_ICASA.split(",");
const readFileJSON = (file) => {
  data = fs.readFileSync(file, 'utf8')
  obj = JSON.parse(data);
  return obj;
}
const schemaGeneration = (schemaJson) => {
  schemaId = {
    _id: mongoose.Schema.Types.ObjectId
  }
  const localSchema = mongoose.Schema(
    {...schemaId, ...schemaJson }
  );
  return localSchema
}
icasaTables.forEach(element => {
  localFolder = process.env.FOLDER_SCHEMAS_JSON_ICASA;
  localPrefix = process.env.PREFIX_SCHEMAS_JSON_ICASA;
  localFile = localFolder + localPrefix + element + ".json";
  localJsonSchema = readFileJSON(localFile);
  localMoongooseSchema = schemaGeneration(localJsonSchema)

  const PREFIX="ICASA_";
  ModelICASAStandardList[element] = mongoose.model(PREFIX+element, localMoongooseSchema);
});
//ICASAStandardSchema.index({Timestamp:1});
//var ICASAStandardModel= mongoose.model("ICASAStandard", ICASAStandardSchema);

module.exports = ModelICASAStandardList;

const ModelICASAStandardList = require("../db/models/model_icasa_standard_list")

exports.getModelICASA=(name)=>{
    return ModelICASAStandardList[name];
}
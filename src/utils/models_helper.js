const ModelICASAStandardList = require("../../models/modelICASAStandardList")

exports.getModelICASA=(name)=>{
    return ModelICASAStandardList[name];
}
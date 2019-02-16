
const utils= require('../utils/models_helper')
const TABLE_NAME= "Measured_data";
const model = utils.getModelICASA(TABLE_NAME)


exports.index= (req, res)=>{
    var projection = { variable_name: 1 ,_id: 0 }
    model.find({},projection,function (err, data) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        data=data.map((item)=>{return item.variable_name})
        res.json(data);
    });
}

exports.validatorNames= (req, res)=>{
    
    var reqList=req.body.variablesNames ;
    getVariables(reqList).then((data)=>{
        const dataToList=data.map((doc)=>{return doc.variable_name})
        result=reqList.map((item)=>{
            var test=dataToList.includes(item)
            return {variable_name:item, is_in:test}
        })
        res.json(result)
    })
}

const getVariables=(variablesNames  )=>{
    const projection={variable_name:1, _id:0}
    return  model.find({variable_name:{"$in":variablesNames}}, projection)
}

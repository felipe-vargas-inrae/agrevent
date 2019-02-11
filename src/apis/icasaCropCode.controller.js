
const utils= require('../utils/models_helper')
const TABLE_NAME= "Crop_codes";
const modelCropCodes = utils.getModelICASA(TABLE_NAME)


exports.index= (req, res)=>{
    var usersProjection = { crop_code: 1,common_name:1, _id: 0 }
    modelCropCodes.find({},usersProjection,function (err, data) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Crops retrieved successfully",
            data: data
        });
    });
}

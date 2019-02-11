var mongoose= require('mongoose');

var stationMeasureSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        StationId:{type:String, required: true},
        Timestamp:{type:Date, required: true},
        Values:{//by hour
            "0":Schema.Types.Decimal128,
            "1":Schema.Types.Decimal128,
            "2":Schema.Types.Decimal128,
            "3":Schema.Types.Decimal128,
            "4":Schema.Types.Decimal128,
            "5":Schema.Types.Decimal128,
            "6":Schema.Types.Decimal128,
            "7":Schema.Types.Decimal128,
            "8":Schema.Types.Decimal128,
            "9":Schema.Types.Decimal128,
            "10":Schema.Types.Decimal128,
            "11":Schema.Types.Decimal128,
            "12":Schema.Types.Decimal128,
            "13":Schema.Types.Decimal128,
            "14":Schema.Types.Decimal128,
            "15":Schema.Types.Decimal128,
            "16":Schema.Types.Decimal128,
            "17":Schema.Types.Decimal128,
            "18":Schema.Types.Decimal128,
            "19":Schema.Types.Decimal128,
            "20":Schema.Types.Decimal128,
            "21":Schema.Types.Decimal128,
            "22":Schema.Types.Decimal128,
            "23":Schema.Types.Decimal128
        }
    }
);

stationMeasureSchema.index({Timestamp:1});
var StationMeasureModel= mongoose.model("StationMeasure", stationMeasureSchema);
module.exports=StationMeasureModel;
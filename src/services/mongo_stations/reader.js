
const  fs = require('fs');
const csv=require('csvtojson');
const Reader={

    getFilesFromFolder:function(folder, callback){
        fs.readdir(folder, callback);
    },
    getJsonfromCsvFile:function(csvFilePath){
        return csv()
        .fromFile(csvFilePath);
    }
}

module.exports=Reader
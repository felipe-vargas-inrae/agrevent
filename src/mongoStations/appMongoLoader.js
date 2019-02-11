
const reader= require("./reader");
const uploader= require("./uploader");

const FOLDER="D:/Felipe/Tesis/DataSets/Measures/";

const AppMongo={
    run:function(){
        reader.getFilesFromFolder(FOLDER,function(err,files){

            files.slice(0,3).forEach(
                async (currentFile, index) =>{
                    const csvFilePath= FOLDER + currentFile;
                    console.log("before "+ index);
                    const jsonArray=await reader.getJsonfromCsvFile(csvFilePath);
                    console.log("after"+index);
                }
            );
        });
    }
};


module.exports=AppMongo;



const ctrl={};
ctrl.downloadDoc=downloadDoc;
ctrl.createSchemas=createSchemas;
ctrl.cleanFiles=cleanFiles;
ctrl.createTables=createTables;
module.exports = ctrl;

/**
 * Download the ICASA google Doc and organice in JSON Files
 */
function downloadDoc(req, res, next){
    console.log("downloading doc ICASA");
    const AppDocICASAtoJson= require("../mongoICASA/appDocICASAtoJson");
    const result= AppDocICASAtoJson.run((result)=>{ res.json(result)});
}

function createSchemas(req, res, next){
    console.log("creating moongose schemas");
    const AppICASAtoMongoose= require("../mongoICASA/appICASAtoMongoose");
    const result= AppICASAtoMongoose.run((result)=>{ res.json(result)});
}

function cleanFiles(req, res, next){
    console.log("removing files ");
    const AppCleanFolders= require("../mongoICASA/appCleanFolders");
    const result= AppCleanFolders.run((result)=>{ res.json(result)});
}

function createTables(req, res, next){
    console.log("add to mongodb  ");

    
    const AppDataToMongo=require("../mongoICASA/appDataToMongo")
    const result= AppDataToMongo.run((result)=>{ 
        res.json(result)
        
    });
    
}





const fs = require('fs');
const util = require('util')
const fs_writeFile = util.promisify(fs.writeFile)
const  uniqueFilename = require('unique-filename')
var rimraf = require("rimraf");


const fs_unlink = util.promisify(fs.unlink)
/**
 * A module to create functions suitable to extract phis information from rest service
*/

const  AppResultToJsonFile={
    printPhisData(result,folderName){
        return printFile(result,folderName, process.env.FOLDER_OUTPUT_DATA_PHIS );
    },
    cleanPhisFolder(folderName){
        const outFolder=process.env.FOLDER_OUTPUT_DATA_PHIS;
        const completeOutFolder=outFolder+folderName
        rimraf.sync(completeOutFolder);
    },
    printLog(result,folderName){
        return printFile(result,folderName, process.env.FOLDER_OUTPUT_LOGS_PHIS );
    }
}

const printFile= (result, folderName, outFolder) => {

    const content = JSON.stringify(result);
    createFolder(outFolder)// block code
    const completeOutFolder=outFolder+folderName
    createFolder(completeOutFolder)
    const name=  uniqueFilename(completeOutFolder)
    return fs_writeFile(name+'.json', content, 'utf8'); 
};

const createFolder = (folder)=>{
    if (!fs.existsSync(folder)){
        fs.mkdirSync(folder);
    }
}
module.exports=AppResultToJsonFile;


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
        return printFile(result,folderName );
    },

    cleanPhisFolder(folderName){
        const outFolder=process.env.FOLDER_OUTPUT_DATA_PHIS;
        const completeOutFolder=outFolder+folderName
        rimraf.sync(completeOutFolder);
    }
}

const printFile= (result, folderName) => {

    
    const content = JSON.stringify(result);
    const outFolder=process.env.FOLDER_OUTPUT_DATA_PHIS;
    const prefix=process.env.PREFIX_PHIS_DATA;

   

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
const fs = require('fs');
const util = require('util');

const fs_unlink = util.promisify(fs.unlink)
const AppCleanFolders ={

    run:async function(callback){

        let result= []
        const f1=process.env.FOLDER_OUTPUT_DATA;
        const f2=process.env.FOLDER_SCHEMAS_JSON_ICASA;
        const tables=process.env.LIST_COLLECTIONS_ICASA.split(","); 

        const sufix1=process.env.PREFIX_ICASA_DATA,
                sufix2=process.env.PREFIX_SCHEMAS_JSON_ICASA;

        const promises = tables.map(async element => {
            await fs_unlink(f1+sufix1+element+".json").then(()=>{
                result.push({type:"success",sheet:element, message:"json file removed"});
            }).catch(function(err) {
                result.push({type:"error",sheet:element, message:err.message});
            });
            await fs_unlink(f2+sufix2+element+".json" ).then(
                ()=>{
                    result.push({type:"success",sheet:element, message:"schema file removed"});
                }
            ).catch(function(err) {
                result.push({type:"error",sheet:element, message:err.message});
            });
        });

        await Promise.all(promises);
        callback(result);
        console.log("termina  el for each");
    }
} 

module.exports=AppCleanFolders
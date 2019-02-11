
//const docURL="https://docs.google.com/spreadsheets/d/1MYx1ukUsCAM1pcixbVQSu49NU-LfXg-Dtt-ncLBzGAM/pub?output=html"

const fs = require('fs');
const util = require('util')
const fs_writeFile = util.promisify(fs.writeFile)

const printFile= (result, name) => {

    const content = JSON.stringify(result);
    const outFolder=process.env.FOLDER_OUTPUT_DATA;
    const prefix=process.env.PREFIX_ICASA_DATA;
    return fs_writeFile(outFolder+prefix+name+'.json', content, 'utf8'); 
};

const  AppDocICASAtoJson={
    run:async function(callback){

        let result = [];
        const  worksheets=process.env.LIST_COLLECTIONS_ICASA.split(",");

        const CLIMATE_CODES="Climate_codes";
       // const  worksheets=["Climate_codes"];
        console.log("inicia el for each");
        const promises = worksheets.map( async (sheet,index)=> {
            const gsjson = require('google-spreadsheet-to-json');
            let options={
                spreadsheetId: '1MYx1ukUsCAM1pcixbVQSu49NU-LfXg-Dtt-ncLBzGAM',
                worksheet:sheet
            }
            if(sheet==CLIMATE_CODES){
                //this sheet has many problematics rows difficult for automatizations
                options.ignoreRow=[1,2,3,4,28,29,39,40,41,60,61,62,84,85,86,89,90,91,111,112,113,
                    115,116,117,130,131,132]
            }
            await gsjson(options)
            .then(
                (result)=>{
                    
                    return printFile(result,sheet );
                }
            )
            .then(
                (error)=>{ 
                    result.push({type:"success", sheet:sheet, message:"saved"})
                } 
            )
            .catch(function(err) {
                result.push({type:"error",sheet:sheet, message:err.message});
            });
        })
        await Promise.all(promises);

        //res.json({type:"processing", message:"The process is runing"})
        callback(result);
        console.log("termina  el for each");
        
        

    }
}

module.exports=AppDocICASAtoJson;


const fs = require('fs');
const util = require('util');
const fs_readFile = util.promisify(fs.readFile);

const ModelICASAStandardList = require("../../models/modelICASAStandardList")


const readData = async (file) => {
    data = await fs.readFile(file, 'utf8')
    obj = await JSON.parse(data);
    return obj;
}
const AppDataToMongo = {
  run: async function (callback) {
    const icasaTables = process.env.LIST_COLLECTIONS_ICASA.split(",");
    let result=[]

    console.log(icasaTables);
    const promises = icasaTables.map(async (element, index) => {
      const localModel=ModelICASAStandardList[element] ;
      
      //const content = JSON.stringify(result);
      const inFolder=process.env.FOLDER_OUTPUT_DATA;
      const prefix=process.env.PREFIX_ICASA_DATA;
      const file=inFolder+prefix+element+'.json'

      await localModel.deleteMany({}).then(()=>{
        return fs_readFile(file)
      })
      .then((data)=>{
        return JSON.parse(data);
      }).then((data)=> {
        const promise=localModel.insertMany(data);
        console.log(promise)
        return promise
      }).then(()=> {
        result.push({type:"success",sheet:element, message:"records storaged"});
      })
      .catch(function(err) {
          result.push({type:"error",sheet:element, message:err.message});
      });
    });

    await Promise.all(promises);
    callback(result);
    console.log("termina  el for each");


  }

  
}

module.exports = AppDataToMongo


const fs = require('fs');
const util = require('util');
const fs_writeFile = util.promisify(fs.writeFile);
const fs_readFile = util.promisify(fs.readFile);

const TABLE= "Management_codes";

const additionalRules=(schema, element)=>{
    console.log("entra", element);
    if (element==TABLE){
        return {...schema, "comment": {"type": "String"}}
    }

    return schema;
}

const printFile= (result, name) => {
    const content = JSON.stringify(result);
    const outFolder=process.env.FOLDER_SCHEMAS_JSON_ICASA;
    const prefix=process.env.PREFIX_SCHEMAS_JSON_ICASA;

    return fs_writeFile(outFolder+prefix+name+'.json', content, 'utf8'); 
};

const AppICASAtoMongoose={
    
    run:async function(callback){

        let result = [];

        const GenerateSchema = require('generate-schema')
        
        const dataFolder=process.env.FOLDER_OUTPUT_DATA;
        const prefix=process.env.PREFIX_ICASA_DATA;
        
        const  tables=process.env.LIST_COLLECTIONS_ICASA.split(",");

        const promises = tables.map(async (element)=>{

                                      
            console.log(" process "+element)
            await fs_readFile(dataFolder+prefix+element+'.json','utf8').then( (data) => {

                objList = JSON.parse(data);

                // this loop transform a list of objects in an object containing all the possible keys
                const objReduced=objList.reduce(
                    ( accumObj, currentValueObj)=>{
                        
                        const listKeysCurrent=Object.keys(currentValueObj);
                        listKeysCurrent.forEach((key,index)=>{
                            const a=  accumObj[key], b =currentValueObj[key];
                            const aType= typeof a, bType= typeof b;
                            if(a){
                                // types order first object, string, number this is the priority
                                if(bType === "object"){
                                    accumObj[key]= b;
                                }else if(bType === "string" && aType !== "object"){
                                    accumObj[key]= b;
                                }
                            }
                            else {
                                accumObj[key]=b;
                            }
                        })
                        return accumObj;

                    }, {}
                )

                var schema = GenerateSchema.mongoose( objReduced);
                // when automatic types is not enough
                schema = additionalRules( schema, element);   
                return printFile(schema,element )
            }).then(()=>{
                result.push({type:"success", sheet:element, message:"schema created"})
                
            }).catch(function(err) {
                result.push({type:"error",sheet:element, message:err.message});
            });

        });
        
        await Promise.all(promises);
        callback(result);
        console.log("termina  el for each");
          
    }
}

module.exports=AppICASAtoMongoose;
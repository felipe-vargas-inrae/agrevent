const ctrl={}

ctrl.memoryUsage=()=>{

    const used = process.memoryUsage();
    for (let key in used) {
    console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }

}

ctrl.timeUsage=(start,end)=>{

    console.log("time: "+(end-start)+"ms")
}


module.exports=ctrl

const list= [
{

    name:"pipeline1",
    methods:[
        {
            method:"map", params:{col:"platURI"}
        },
        {
            method:"mean", params:{col:"platURI"}
        },
        {
            method:"select", params:{cols:["platURI","OthreColumn"]}
        }
    ]
},

{

    name:"pipeline2",
    methods:[
        {
            method:"map", params:{col:"platURI"}
        },
        {
            method:"mean", params:{col:"platURI"}
        },
        {
            method:"select", params:{cols:["platURI","OthreColumn"]}
        }
    ]
},

{

    name:"pipeline3",
    methods:[
        {
            method:"map", params:{col:"platURI"}
        },
        {
            method:"mean", params:{col:"platURI"}
        },
        {
            method:"select", params:{cols:["platURI","OthreColumn"]}
        }
    ]
}
]

export default list
const express = require("express")
const cluster = require("cluster")
const os = require("os")
const app = express()
const compression = require("compression")
const total = os.cpus().length
app.use(compression())
console.log(total)

    app.get("/",(req,res)=>{
        res.send("hello world")
    })

    app.listen(3000,()=>{
        console.log("server running on 3000");
    })

// if(cluster.isPrimary){
//     for(i=0;i<total;i++){
//         cluster.fork();
//     }
// }else{
//     app.get("/",(req,res)=>{
//         res.send("hello world")
//     })

//     app.listen(3000,()=>{
//         console.log("server running on 3000");
//     })
// }
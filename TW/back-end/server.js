const express=require('express');
const router = require("./routes");
const connection = require("./models/index").connection;
const config = require("./config/config.json");


const app=express();

app.use(express.json());
app.use("/api", router);

app.get('/sync',async(req, res)=>{  
    try{
        await connection.sync({force:true});
        res.status(201).json({message:'tables created'})
    }catch(err){
        console.warn(err)
        res.status(500).json({message:'some error occured'})
    }
})


app.listen(8000,()=>{
    console.log("Server on 8000");
})
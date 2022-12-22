const express=require('express');
const routerExperience = require("./routes/experience");
const bodyParser=require("body-parser");
const routerUser = require("./routes/user");
const connection = require("./models/index").connection;
const cors = require("cors")
const config = require("./config/config.json");


const app=express();

app.use(bodyParser.json())
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use("/users", routerUser);
app.use("/experiences", routerExperience);



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
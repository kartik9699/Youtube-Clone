import express from 'express';
const app=express();
//server created using 3000 port
app.listen(3000,()=>{
    console.log("server is started")
})
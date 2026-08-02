import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
const app=express();
//Database Connection
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Database is connected");
})
.catch((err)=>{
    console.log("Database is not connected");
})
//server created using 3000 port
app.listen(process.env.PORT,()=>{
    console.log("server is started")
})
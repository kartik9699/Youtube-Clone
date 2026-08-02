import express from 'express';
import mongoose from 'mongoose';
const app=express();
//server created using 3000 port
mongoose.connect('mongodb+srv://kartikparab300_db_user:pzW8cHg7YF07jqKy@cluster0.vzsrw0z.mongodb.net/?appName=Cluster0')
.then(()=>{
    console.log("Database is connected");
})
.catch((err)=>{
    console.log("Database is not connected");
})
app.listen(3000,()=>{
    console.log("server is started")
})
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { userRoutes } from './Routes/user.routes.js';
import { videoRoutes } from './Routes/video.routes.js';
import { commentRoutes } from './Routes/comment.routes.js';
import { channelRoutes } from './Routes/channel.routes.js';

const app=express();
app.use(express.json());
// Enable CORS so the frontend (Vite dev server) can fetch data from the API
app.use(cors());
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
    console.log(`server is started ${process.env.PORT}`)
})
//all routes calling
userRoutes(app)
videoRoutes(app)
commentRoutes(app)
channelRoutes(app)
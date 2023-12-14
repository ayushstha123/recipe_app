import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from './routes/user.js'
import { recipesRouter } from './routes/recipes.js';

const app=express();
app.use(express.json())
app.use(cors());
app.use("/auth",userRouter);
app.use("/recipes",recipesRouter);
mongoose.connect('mongodb://recipe:recipe@ac-ldhdtst-shard-00-00.5bz2rzy.mongodb.net:27017,ac-ldhdtst-shard-00-01.5bz2rzy.mongodb.net:27017,ac-ldhdtst-shard-00-02.5bz2rzy.mongodb.net:27017/?replicaSet=atlas-wwlyo5-shard-0&ssl=true&authSource=admin');
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  mongoose.connection.on('open', () => {
    console.log('MongoDB connected');
  });

app.listen(3001,()=>{console.log(`Server Started`)})
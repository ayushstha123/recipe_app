import experss from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from './routes/user.js'

const app=experss();
app.use(experss.json())
app.use(cors());
app.use("/auth",userRouter);
mongoose.connect('mongodb://recipe:recipe@ac-ldhdtst-shard-00-00.5bz2rzy.mongodb.net:27017,ac-ldhdtst-shard-00-01.5bz2rzy.mongodb.net:27017,ac-ldhdtst-shard-00-02.5bz2rzy.mongodb.net:27017/?replicaSet=atlas-wwlyo5-shard-0&ssl=true&authSource=admin');


app.listen(3001,()=>{console.log(`Server Started`)})
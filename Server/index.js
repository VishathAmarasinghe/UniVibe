import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import Postsroute from './routes/posts.js';
import user from './routes/users.js';

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const connection__URL =
  "mongodb+srv://abcuser:abcuser@cluster0.6kstnpx.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(connection__URL)
    .then(console.log("connected to the database")).catch((err)=>console.log(err));
  



app.use('/posts',Postsroute);
app.use('/user',user);

app.listen(PORT,()=>{
    console.log(`Application connected to the server with port no ${PORT}`);
})


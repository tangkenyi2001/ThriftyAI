import mongoose from "mongoose";
import express from "express";
const app=express();
import {config} from "dotenv";
config();
//connect to db
const connectDB = async()=>{   
  const dbURI=process.env.dbURI
    try {
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error(err.message);
    }
}
export default connectDB;

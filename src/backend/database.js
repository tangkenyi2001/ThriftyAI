import mongoose from "mongoose";
import express from "express";
const app=express();
//connect to db
const connectDB = async()=>{
    const dbURI='mongodb+srv://User:test@ken.sifl7.mongodb.net/KenGPT?retryWrites=true&w=majority&appName=Ken';
   
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

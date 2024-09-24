
import mongoose from "mongoose";
const Schema=mongoose.Schema;

const requestSchema=new Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    }
},{timestamps:true})

const Request=mongoose.model('Request',requestSchema)
export default Request;

import mongoose from "mongoose";
const Schema=mongoose.Schema;

const responseSchema=new Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    }
},{timestamps:true})
const Response=mongoose.model('Response',responseSchema)
export default Response;
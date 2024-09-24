
import mongoose from "mongoose";
const Schema=mongoose.Schema;

const entrySchema=new Schema({
    request:{
        type:String,
        required: true
    },
    response:{
        type:String,
        required: true
    }
},{timestamps:true})
const Entry=mongoose.model('Entry',entrySchema)
export default Entry;
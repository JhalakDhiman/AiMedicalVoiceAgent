import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
    age:{
        type:Number
    },
    subscription:{
        type:Boolean,
        default:false
    }
})

export default  mongoose.models.User|| mongoose.model("User",userSchema);
import mongoose, { Schema, model } from "mongoose";
const userSchema=new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String
    }

})
export const User=mongoose.model('User', userSchema)
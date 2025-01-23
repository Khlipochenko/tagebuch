import { Schema, model } from "mongoose";
const NotizSchema= new Schema({
    title:{
        type:String,

    },
    text:{
        type:String,
       
    },
    datum:{
        type:String,
        required:true
    }, 
    userId:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    images:{
        type:String
    }
},
{ timestamps: true })

export const Notiz=model('notiz', NotizSchema)
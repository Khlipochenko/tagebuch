import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/Users.js";
import Notiz from '../models/Notiz.js'

//Notiz speichern
export const notizSchreiben=async(req,res,next)=>{
    const userId=req.auth.userId
    const images=req.files
    
    const  {title, text, datum, }=req.body
    console.log('req', req);
  
    try{
        const user= User.findById(userId)
        if(user){
            if(images){
     const imagesUpload=await cloudinary.uploader.upload(images.path)  }    
    await Notiz.create({
    title:title, 
    text:text,
    datum:datum,
    userId:user._id,
    images:imagesUpload.secure_url
   }

)}
else{
    res.status(404).json({success:false, message:'User not found'})
}
res.sendStatus(201)
}catch(error){
    console.log(error);
    res.status(400).json(error)
   }

}
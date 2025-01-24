import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/Users.js";
import {Notiz} from '../models/Notiz.js'

//Notiz speichern
export const notizSchreiben=async(req,res,next)=>{
    const userId=req.auth.userId
    const images=req.files
    
    const  {title, text, datum, }=req.body
    console.log('req', req);
  
    try{
        const user=await  User.findById(userId)
        if(user){
            let uploadedImages = [];
            if (images && images.length > 0) {
               
                
                for (let i = 0; i < images.length; i++) {
                  const uploadResult = await cloudinary.uploader.upload(images[i].path); // Der 'path' wird verwendet, um das Bild hochzuladen
                  uploadedImages.push(uploadResult.secure_url); // Die URL des hochgeladenen Bildes speichern
                }
              }
          
   
    await Notiz.create({
    title:title, 
    text:text,
    datum:datum,
    userId:user._id,
    images:uploadedImages
   }  

)}
else{
    res.status(404).json({success:false, message:'User not found'})
}
res.status(201).json({success:true, message:user.name})
}catch(error){
    console.log(error);
    res.status(400).json(error)
   }

}
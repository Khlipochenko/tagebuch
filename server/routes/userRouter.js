import { Router } from "express";
import { Notiz } from "../models/Notiz.js";
import { User } from "../models/Users.js";
export const userRouter=Router()
userRouter.post('/write',async(req,res,next)=>{
    const userId=req.auth.userId
    
    const  {title, text, datum, images}=req.body
    if(!text || !datum){
        res.status(400).json({success:false, message:'Datum und text ist required'})
    }
    try{
        const user= User.findById(userId)
        if(user){
    await Notiz.create({
    title:title, 
    text:text,
    datum:String(datum),
    userId:user._id
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

})
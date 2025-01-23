import { Router } from "express";
import { Notiz } from "../models/Notiz.js";
import { User } from "../models/Users.js";
export const userRouter=Router()
userRouter.post('/write',async(req,res,next)=>{
    const userId=req.auth.userId
    
    const  {title, text, datum, images}=req.body
    try{
        const user= User.findById(userId)
        if(user){
    await Notiz.create({
    title, text,datum,userId:user._id
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
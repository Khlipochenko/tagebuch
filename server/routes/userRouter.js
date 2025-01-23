import { Router } from "express";
import { Notiz } from "../models/Notiz.js";
export const userRouter=Router()
userRouter.post('/write',async(req,res,next)=>{
    const userId=req.auth.userId
    const  {title, text, datum, images}=req.body
    try{
    await Notiz.create({
    title, text,datum,userId
   }

)
res.sendStatus(201)
}catch(error){
    console.log(error);
    res.status(400).json(error)
   }

})
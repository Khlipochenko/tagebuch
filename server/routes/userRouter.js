import { Router } from "express";
export const userRouter=Router()
userRouter.post('write',async(req,res,next)=>{
    const userId=req.auth.userId
    console.log(userId);
    res.json(userId)

})
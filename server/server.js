import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connect }from './utils/connect.js'
import { userRouter } from './routes/userRouter.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import { clerkMiddleware } from '@clerk/express'
import { connectCloudinary } from './utils/cloudinary.js'
dotenv.config()
const app= express()
app.use(express.json())
app.use(cors())
await connectCloudinary()
const clerkOptions = {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  };
  
  app.use(clerkMiddleware(clerkOptions));
const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;
console.log(PUBLISHABLE_KEY);
app.use('/users', userRouter)
app.get('/',(req,res)=>res.send('API Working'))
app.post('/webhooks', clerkWebhooks)
app.use((err, req,res,next)=>{
    console.log(err);
    return res.sendStatus(500)
})
const PORT=process.env.PORT ||5000
console.log(PORT);
connect().then(()=>{
    app.listen (PORT, ()=> console.log(`Server läuft auf http://localhost:${PORT}`))
})

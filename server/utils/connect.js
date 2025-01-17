import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
export const connect= async()=>{
    const MONGODB_URL=process.env.MONGODB_URL
    if(MONGODB_URL){
        await mongoose.connect(`${MONGODB_URL}tagebuch`)
        console.log('MD connected');
    }else{
        throw new Error('Error: MONGODB_URL not found');
    }

}
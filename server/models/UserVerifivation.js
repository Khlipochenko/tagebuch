import {Schema, model} from 'mongoose'
const userVerifivationSchema=new Schema({
    userId:{
        ref:'user',
        type:Schema.Types.ObjectId
    }
})
export const UserVarification=model('user_verification', userVerifivationSchema)
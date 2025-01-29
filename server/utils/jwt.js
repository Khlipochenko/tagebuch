import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function createToken(payload){
    const token=jwt.sign(payload, process.env.JWT_SECRET,{
 expiresIn: '365d'
    });
    return token
}
export function verifyToken(token){
    const payload=jwt.verify(token, process.env.JWT_SECRET)
    return payload
}
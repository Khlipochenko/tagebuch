import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function createToken(payload, time){
    const token=jwt.sign(payload, process.env.JWT_SECRET,{
 expiresIn: time

    });
    return token
}
export function verifyToken(token){
    try{
   return jwt.verify(token, process.env.JWT_SECRET)
    
    }catch(e){
        if (e.name === 'TokenExpiredError') {
            return { expired: true }; // Spezielle Rückgabe für abgelaufene Tokens
        }
        console.log(e); // Andere Fehler loggen
        return null;

    }
   
}
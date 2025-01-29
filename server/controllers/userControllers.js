import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/Users.js";
import { Notiz } from '../models/Notiz.js'
import { UserVarification } from "../models/UserVerifivation.js";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { createToken } from "../utils/jwt.js";
dotenv.config()
//Resend für Email
const resend = new Resend(process.env.RESEND_API_KEY)
const MY_EMAIL = process.env.MY_EMAIL;
const MY_PASSWORD = process.env.MY_PASSWORD;
//Regestrieren
export const userRegistirieren = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ successs: false, message: 'Alle Felder müssen ausgefüllt werden' })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: 'Ein Benutzer mit dieser E-Mail-Adresse existiert bereits' })
        }
        const newUser = await User.create({ email, name, password })
      


        //VERIFICATION
        const verification = await UserVarification.create({ userId: newUser._id })
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: MY_EMAIL,
              pass: MY_PASSWORD,
            },
          });
          const htmlContent = `
        <h3>Willkommen bei Tagebuch</h3>
        <p>Bitte bestätigen Sie diese E-Mail-Adresse, indem Sie auf folgenden Link klicken:</p>
        <a href="http://localhost:5173/verify/${verification._id}">
               Link
           </a>
        <p>Mit freundlichen Grüßen,</p>
        <p> Ihres Team</p>
        `;
          async function main() {
            const info = await transporter.sendMail({
              from: " <teamsendemail@gmail.com>", // sender address
              to: email, // list of receivers
              subject: "Email verifizieren", // Subject line
        
              html: htmlContent, // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
          }
        
          main().catch(console.error);


        //
         

//         const { data, error } = await resend.emails.send({
//             from: "Acme <onboarding@resend.dev>",
//             to: [email],
//             subject: "Email verifizieren",
//             html: `
//     <h1>Willkommen bei Tagebuch</h1>
//       <p>
//           <a href=`http://localhost:5173/verify/${verification._id}`>
//               Klicke hier, um dein Konto zu verifizieren
//           </a>
//       </p>
//     `,
//         });

//         if (error) {
//             return res.status(400).json({ error });
//         }
// console.log(data)
         return res.status(201).json({ success: true, message: 'Herzlichen Glückwunsch zur Resistrierung. Bitte prüffen Sie Ihre Email!' })
     } catch (e) {
        next(e);
     }
 }


 export const verifyUser = async (req, res, next) => {
     const ver = req.params.ver
     try {
         const verification = await UserVarification.findById(ver)
          if (verification) {
            
         
         const user = await User.findById(verification.userId);

         if (!user) {
             return res.status(404).json({ success: false, message: 'Benutzer nicht gefunden' });
         }
 
         // Benutzer als verifiziert markieren
         await User.findByIdAndUpdate(user._id, { verified: new Date() });
         await verification.deleteOne(); 
         return res.status(200).json({ success: true, message: 'Erfolgleich.  Du kannst dich jetzt einloggen.' })}
         else{
            return res.status(400).json({ success: false, message: ' Nicht erfolgleich.' })}
         
         
 //return res.redirect('http://localhost:5173/home')
     } catch (e) {
         next(e)
     }
 }

//LOGIN
export const userLogin=async(req,res,next)=>{
    try{

        const {email, password}=req.body
        const user=await User.findOne({email})
        if(!user){
          return  res.status(404).json({success: false, message: `User mit ${email} nicht gefunden`})
        }
        if(!bcrypt.compareSync(password, user.password)){
           return res.status(401). json({success:false,message: "Passwort ist nicht korrekt!"})
        }
        if(!user.verified){
            return res.status(401). json({success:false,message: "Sie haben Ihre E-Mail nicht verifiziert."})  
        }
const token=createToken(user.toJSON())
 res.cookie("tagebuch", token, {
    httpOnly: true,
    secure: true,
    sameSite:"lax",
    expires: new Date(Date.now() + 900000),
  })
  return res.status(200).json({ success: true, message: `Willkommen ${user.name[0].toUpperCase()+user.name.slice(1).toLowerCase()}`, userData:user });
    }
    catch(e){
        next(e)
    }
}
// Senden UserData
export const getUserData=(req,res,next)=>{
   try{
    const userData=req.user
if(userData){
    return res.status(200).json({success:true, userData:userData})
}}catch(e){
    next(e)
}
}

//Notiz speichern
export const notizSchreiben = async (req, res, next) => {
    const userId = req.auth.userId
    const images = req.files

    const { title, text, datum, } = req.body
    console.log('req', req);

    try {
        const user = await User.findById(userId)
        if (user) {
            let uploadedImages = [];
            if (images && images.length > 0) {


                for (let i = 0; i < images.length; i++) {
                    const uploadResult = await cloudinary.uploader.upload(images[i].path); // Der 'path' wird verwendet, um das Bild hochzuladen
                    uploadedImages.push(uploadResult.secure_url); // Die URL des hochgeladenen Bildes speichern
                }
            }


            await Notiz.create({
                title: title,
                text: text,
                datum: datum,
                userId: user._id,
                images: uploadedImages
            }

            )
        }
        else {
            res.status(404).json({ success: false, message: 'User not found' })
        }
        res.status(201).json({ success: true, message: user.name })
    } catch (error) {
       next(error)
    }

}
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/Users.js";
import { Notiz } from "../models/Notiz.js";
import { UserVarification } from "../models/UserVerifivation.js";

import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/jwt.js";
import { OAuth2Client } from "google-auth-library";
dotenv.config();
//google-auth
const client = new OAuth2Client();
export const googleAuth = async (req, res, next) => {
  const { credential, client_id } = req.body;
  try {
    // Verify the ID token with Google's API
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    if (!ticket) {
      return res
        .status(401)
        .json({ success: false, message: "Ungültiger Token" });
    }
    const payload = ticket.getPayload();
    const { email, given_name, family_name, exp, ...rest } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user if they don't exist
      user = await User.create({
        email,
        name: `${given_name} ${family_name}`,
        authSource: "google",
      });
    }
    const token = createToken(
      { email, name: user.name, authSource: user.authSource, _id: user._id },
      "1h"
    );
    res
      .status(200)
      .cookie("tagebuch", token, {
        httpOnly: true,
        secure: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 3600000, // 1 hour in milliseconds
      })
      .json({
        success: true,
        message: `Willkommen ${
          user.name[0].toUpperCase() + user.name.slice(1)
        }`,
        userData: user,
      });
  } catch (e) {
    next(e);
  }
};

//Resend für Email
const MY_EMAIL = process.env.MY_EMAIL;
const MY_PASSWORD = process.env.MY_PASSWORD;
//Regestrieren

export const userRegistirieren = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //    console.log('password register:', password)
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          successs: false,
          message: "Alle Felder müssen ausgefüllt werden",
        });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Ein Benutzer mit dieser E-Mail-Adresse existiert bereits",
        });
    }
    const newUser = await User.create({ email, name, password });

    //VERIFICATION
    const URL = process.env.URL;
    const verification = await UserVarification.create({ userId: newUser._id });
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
        <a href="${URL}/verify/${verification._id}">
               Link
           </a>
        <p>Mit freundlichen Grüßen,</p>
        <p> Ihres Team</p>
        `;

    const info = await transporter.sendMail({
      from: " <teamsendemail@gmail.com>", // sender address
      to: email, // list of receivers
      subject: "Email verifizieren", // Subject line

      html: htmlContent, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

    return res
      .status(201)
      .json({
        success: true,
        message:
          "Herzlichen Glückwunsch zur Resistrierung. Bitte prüffen Sie Ihre Email!",
      });
  } catch (e) {
    next(e);
  }
};

export const verifyUser = async (req, res, next) => {
  const ver = req.params.ver;
  try {
    const verification = await UserVarification.findById(ver);
    if (verification) {
      const user = await User.findById(verification.userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Benutzer nicht gefunden" });
      }

      // Benutzer als verifiziert markieren
      await User.findByIdAndUpdate(user._id, { verified: new Date() });
      await verification.deleteOne();
      return res
        .status(200)
        .json({
          success: true,
          message: "Erfolgleich.  Du kannst dich jetzt einloggen.",
        });
    } else {
      return res
        .status(400)
        .json({ success: false, message: " Nicht erfolgleich." });
    }

    //return res.redirect('http://localhost:5173/home')
  } catch (e) {
    next(e);
  }
};

//LOGIN
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //     console.log('password login:', password)
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `User mit ${email} nicht gefunden` });
    }
    //      console.log('user.password',user.password)
    //       console.log('vergleichen:',  bcrypt.compareSync(password, user.password))
    if (user.authSource === "self") {
      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(401)
          .json({ success: false, message: "Passwort ist nicht korrekt!" });
      }
      if (!user.verified) {
        return res
          .status(401)
          .json({
            success: false,
            message: "Sie haben Ihre E-Mail nicht verifiziert.",
          });
      }
      const token = createToken(user.toJSON(), "1h");
      res.cookie("tagebuch", token, {
        httpOnly: true,
        secure: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        expires: new Date(Date.now() + 900000),
      });
      return res
        .status(200)
        .json({
          success: true,
          message: `Willkommen ${
            user.name[0].toUpperCase() + user.name.slice(1)
          }`,
          userData: user,
        });
    } else if (user.authSource === "google") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Bitte melden Sie sich mit Ihrem Google-Konto an.",
        });
    }
  } catch (e) {
    next(e);
  }
};
// Senden UserData
export const getUserData = (req, res, next) => {
  try {
    const userData = req.user;
    if (userData) {
      return res.status(200).json({ success: true, userData: userData });
    }
  } catch (e) {
    next(e);
  }
};

//LOGOUT
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("tagebuch", {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.end();
  } catch (e) {
    next(e);
  }
};

//Notiz speichern
export const notizSchreiben = async (req, res, next) => {
  const userId = req.user._id;

  const images = req.files;

  const { title, text, datum, onlyText } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User nicht gefunden" });
    }

    let uploadedImages = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const uploadResult = await cloudinary.uploader.upload(images[i].path); // Der 'path' wird verwendet, um das Bild hochzuladen
        uploadedImages.push(uploadResult.secure_url); // Die URL des hochgeladenen Bildes speichern
      }
    }

    const newNotiz = await Notiz.create({
      title: title,
      text: text,
      datum: datum,
      userId: user._id,
      images: uploadedImages,
      onlyText: onlyText,
    });
    user.notizenId.push(newNotiz._id);
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: "Neuer Eintrag gespeichert" });
  } catch (error) {
    next(error);
  }
};

// RESET PASSWORD
//1. Prüfen email schiken token als antwort
export const requestPasswordReset = async (req, res, next) => {
  const URL = process.env.URL;
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `User mit ${email} nicht gefunden` });
    }
    const token = createToken(user.toJSON(), "2m");
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
      
        <p>Sie erhalten diese E-Mail, weil Sie (oder jemand anderes) die Zurücksetzung des Passworts für Ihr Konto angefordert haben.</p>
       <p>Bitte klicken Sie auf den folgenden Link oder fügen Sie ihn in Ihren Browser ein, um den Vorgang abzuschließen</p>
        <a href="${URL}/reset/${token}">
               Link
           </a>
        <p>Wenn Sie diese Anfrage nicht gestellt haben, ignorieren Sie bitte diese E-Mail und Ihr Passwort bleibt unverändert.</p>
        <p>Mit freundlichen Grüßen,</p>
        <p> Ihres Team</p>
        `;
    async function main() {
      const info = await transporter.sendMail({
        from: " <teamsendemail@gmail.com>", // sender address
        to: email, // list of receivers
        subject: "Passwort zurücksetzen Anfrage", // Subject line

        html: htmlContent, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    await main().catch(console.error);

    return res
      .status(200)
      .json({
        success: true,
        message:
          "Passwort zurücksetzen Link gesendet. Bitte prüfen Sie Ihre Email!",
      });
  } catch (e) {
    next(e);
  }
};
//reset password
export const resetPassword = async (req, res, next) => {
  const newPassword = req.body.password;
  try {
    const token = req.params.token;
    const payload = verifyToken(token);
    console.log(payload);
    if (!payload) {
      return res
        .status(401)
        .json({ success: false, message: "Ungültiger Token" });
    }
    if (payload.expired) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Der Link ist abgelaufen. Bitte fordere einen neuen an.",
        });
    }

    const user = await User.findById(payload._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User nicht gefunden" });
    }
    user.password = newPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Passwort wurde geändert" });
  } catch (e) {
    next(e);
  }
};

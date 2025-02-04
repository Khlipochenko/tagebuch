import { Router } from "express";

import { upload } from "../utils/multer.js";
import {  getUserData, googleAuth, logout, notizSchreiben, userLogin, userRegistirieren, verifyUser } from "../controllers/userControllers.js";
import { authorizeJwt } from "../middlerware/auth.js";

export const userRouter=Router()


userRouter.post('/register', userRegistirieren)
userRouter.post('/login', userLogin)
userRouter.get('/verify/:ver', verifyUser)
userRouter.get('/',authorizeJwt, getUserData  )
userRouter.get('/logout', logout)
userRouter.post('/write' ,authorizeJwt, upload, notizSchreiben)
userRouter.post('/google-auth',googleAuth )
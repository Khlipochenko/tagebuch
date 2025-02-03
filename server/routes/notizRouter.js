import { Router } from "express";
import { notizDel, notizEdit, notizGet, notizListe } from "../controllers/notizController.js";
import { authorizeJwt } from "../middlerware/auth.js";
import { upload } from "../utils/multer.js";
export const notizRouter=Router()
notizRouter.get('/',authorizeJwt, notizListe)
notizRouter.get('/:id', authorizeJwt, notizGet)
notizRouter.delete('/:id', authorizeJwt, notizDel)
notizRouter.put('/edit/:id', authorizeJwt,upload, notizEdit)
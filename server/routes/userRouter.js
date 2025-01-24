import { Router } from "express";

import { upload } from "../utils/multer.js";
import { notizSchreiben } from "../controllers/userControllers.js";

export const userRouter=Router()
userRouter.post('/write',upload.array('images'), notizSchreiben)
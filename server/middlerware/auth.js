import { verifyToken } from "../utils/jwt.js";
export function authorizeJwt(req, res, next) {
  const token = req.cookies.tagebuch;
  console.log("tagebuch token", token);
  console.log(req.cookies);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token nicht gefunden" });
  }
  const isVerify = verifyToken(token);
  if (!isVerify) {
    return res.status(401).json({ success: false, message: "Unathorized" });
  }
  req.user = isVerify;
  console.log(isVerify);
  next();
}

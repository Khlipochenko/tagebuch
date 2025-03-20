import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./utils/connect.js";
import { userRouter } from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

import { connectCloudinary } from "./utils/cloudinary.js";

import { notizRouter } from "./routes/notizRouter.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["https://tagebuch-eta.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
await connectCloudinary();

app.use("/users", userRouter);
app.use("/notizen", notizRouter);
app.get("/", (req, res) => res.send("API Working"));
app.use(express.static(path.join(__dirname, 'build'))); // Убедитесь, что сервер отдает статические файлы из папки build

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html')); // Отдайте index.html для всех других маршрутов
});
app.use((err, req, res, next) => {
  console.log(err);
  return res.sendStatus(500);
});
const PORT = process.env.PORT || 5000;
console.log(PORT);
connect().then(() => {
  app.listen(PORT, () =>
    console.log(`Server läuft auf http://localhost:${PORT}`)
  );
});

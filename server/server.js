import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();
console.log("SERVER ENV:", process.env.MONGODB_URL);
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5175",
      "https://tagebuch-eta.vercel.app"
    ]
  })
);

app.use(cookieParser());

/* =========================
   🔥 INIT (Mongo + Cloudinary)
========================= */

let isConnected = false;

const init = async () => {
  if (isConnected) return;

  try {
    // MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET
    });

    console.log("Cloudinary connected");

    isConnected = true;
  } catch (err) {
    console.log("INIT ERROR:", err);
    throw err;
  }
};

app.use(async (req, res, next) => {
  try {
    await init();
    next();
  } catch (err) {
    console.log("INIT ERROR FULL:", err); // 🔥 ВАЖНО
    res.status(500).send(err.message);    // покажет ошибку
  }
});

/* =========================
   🔥 ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("API Working");
});

// Beispiel Route
app.get("/users", (req, res) => {
  res.json({ message: "Users route works" });
});

/* =========================
   🔥 ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server error");
});

/* =========================
   🔥 VERCEL FIX
========================= */

export default app;

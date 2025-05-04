// const express = require('express')
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

const app = express();
const MONGO_URL = process.env.MONGO_URI;

// =========== middleware ==============
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:3005", // your frontend URL
  credentials: true, // allow cookies
}));


// file upload using express file Upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);


// ========== DB CODE ================ 
try {
  mongoose.connect(MONGO_URL);
  console.log("Connected to Mongodb");
} catch (err) {
  console.log(err);
}


// =============  Definig Routes =======================
app.use('/api/users/',userRoute);
app.use('/api/blogs/',blogRoute);


// ================== Cloudinary Setup  ==================
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret:process.env.CLOUD_API_SECRET 
});








app.get("/", (req, res) => {
  res.send("guddu kumar");
});

// ================== Testing .env file ==============
// console.log(process.env.PORT)
// console.log(MONGO_URL)

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

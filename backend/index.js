// const express = require('express')
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

import userRoute from "./routes/user.route.js";

const app = express();
const MONGO_URL = process.env.MONGO_URI;

// middleware
app.use(express.json());

// ======== DB CODE ================ 
try {
  mongoose.connect(MONGO_URL);
  console.log("Connected to Mongodb");
} catch (err) {
  console.log(err);
}


// =============  Definig Routes =======================
app.use('/api/users/',userRoute);









app.get("/", (req, res) => {
  res.send("guddu kumar");
});

// ================== Testing .env file ==============
// console.log(process.env.PORT)
// console.log(MONGO_URL)

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

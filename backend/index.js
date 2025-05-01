// const express = require('express')
import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';

const app = express()
const port = 3000
const MONGO_URL = process.env.MONGO_URI;


try{
    mongoose.connect(MONGO_URL);
    console.log("Connected to Mongodb")
}
catch(err){
    console.log(err);
}




app.get('/', (req, res) => {
  res.send('guddu kumar')
})

// ================== Testing .env file ============== 
// console.log(process.env.PORT)
// console.log(MONGO_URL)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

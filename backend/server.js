import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import mongooseConnection from "./db/connectToMongoDb.js";



dotenv.config();
// console.log(process.env)
const app =  express () ;
const PORT = process.env.PORT ; 

app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res) => {
    res.send(`This is the Backend Running in ${PORT}`)
})

app.use("/api/auth",authRoutes)


app.listen(PORT , (req,res) => {
    mongooseConnection();
    console.log(`Connected to port ${PORT}`)
})

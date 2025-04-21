require("dotenv").config();

const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

const connectDB = require("./config/db");

connectDB();

const imageRoutes = require("./routes/imageRoutes")
app.use("/api", imageRoutes);
app.get('/heloo' , (req , res)=>{
    res.send('Hello World')
})

app.listen(8080 , ()=>{
    console.log('server is running on port 8080')
})
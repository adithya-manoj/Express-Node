import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './Schema/User.js';

mongoose.connect('mongodb://localhost:27017/Login')
.then (()=>console.log("Database Connection Established!"));

const db=mongoose.connection
const app=express()

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.json({})
})

app.post('/register',async (req,res)=>{
    console.log(req.body);
    let newdata=new User(req.body)
    console.log(newdata,'filtered data');
    let response = await newdata.save();
})

app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    let response = await User.findOne({username:username,password:password})
    console.log(response);
    if(response){
        res.json(response)
    }
    else{
        res.status(401).json("Invalid Credentials")
    }
})

app.listen(4000,()=>{
    console.log("Running on Port 4000.");
})
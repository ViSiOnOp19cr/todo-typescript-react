import express from 'express';
import { signup, login } from '../controllers/auth';
import env from 'dotenv';
env.config();

export const user = express.Router();

user.post('/signup', async (req, res)=>{
    signup(req,res);
});

user.post('/login',async (req,res)=>{
    login(req,res);
});




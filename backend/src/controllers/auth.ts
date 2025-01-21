import { Request, Response } from 'express';
import {UserModel} from '../models/user';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import argon2 from 'argon2';

env.config();
const JWT_SECRET = process.env.JWT_PASSWORD as string;

export const signup = async(req:Request,res:Response)=>{
    //take input from req.body
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({
            email
        });
        if(user){
            return res.status(400).send({
                message: 'User already exists'
            });
        }
        const hashedpassword = await argon2.hash(password);

        await UserModel.create({email,password:hashedpassword});

        res.status(200).send({
            message: 'User created successfully'
        })
    }
    catch(err){
        res.status(500).send({
            message: 'Internal server error'
        })
    }
};
export const login = async(req:Request,res:Response)=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({
            email
        });
        
        if(!user){
            return res.status(401).send({
                message:"Invalid creadentials"
            });
        }

        const passvalid = await argon2.verify(user.password,password);
        //jwt verify for futher verifications and all.
        const token = jwt.sign({
            id:user._id
        }, JWT_SECRET);
        res.status(200).send({
            token
        });
    }
    catch(err){
        res.status(500).send({
            message: 'Internal server error'
        })
    }
}
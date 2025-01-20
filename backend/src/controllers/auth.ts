import { Request, Response } from 'express';
import {UserModel} from '../models/user';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
const JWT_SECRET = process.env.JWT_PASSWORD as string;

export const signup = async(req:Request,res:Response)=>{
    //take input from req.body
    const {email,password} = req.body;
    try{
        //check if user already exists
        await UserModel.create({email,password});
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
            email,
            password
        });
        if(!user){
            return res.status(401).send({
                message:"Invalid creadentials"
            });
        }
        const token = jwt.sign({
            email,
            password
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
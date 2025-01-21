import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

interface CustomRequest extends Request {
    userId?: string;
}

const jwt_secret = process.env.JWT_PASSWORD as string;
export const usermiddlewares = (req:CustomRequest, res:Response, next:NextFunction)=>{
    const token = req.headers.authorization as string;
    const decoded = jwt.verify(token, jwt_secret);
    if(decoded){
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "You are not logged in"
            })
            return;    
        }
        req.userId = decoded.id;
        console.log('done with middlewares');
        next()
    }
    else{
        res.status(401).send({
            message:'unauthorized'
        });
    }
}
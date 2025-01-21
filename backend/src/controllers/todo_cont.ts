import {Request,Response} from 'express';
import {TodoModel} from '../models/todo';
import {TagModel} from '../models/tag';

interface CustomRequest extends Request {
    userId?:string;
}

export const getTodos = async (req:CustomRequest, res:Response)=>{
    
};
export const addTodo = async(req:CustomRequest,res:Response)=>{
    const {title,content,tags} = req.body;
    const userId = req.userId!;
    console.log(userId, title, content, tags);
    try{
        const tagIds = await TagModel.findOne({name:tags});
        if(tagIds){
            const todo = await TodoModel.create({
                title,
                content,
                tags: tagIds._id,   
                userId
            });
            if(todo){
                res.status(200).send({
                    message:'Todo created successfully'
                });
            }
            else{
                res.status(400).send({
                    message:'Bad request'
                });
            }
        }
        else{
            await TagModel.create({
                name:tags
            });
            const newtag = await TagModel.findOne({name:tags});
            if(newtag){
            const todo = await TodoModel.create({
                title,
                content,
                tags: newtag._id,   
                userId
            });
            if(todo){
                res.status(200).send({
                    message:'Todo created successfully'
                });
            }
            else{
                res.status(400).send({
                    message:'Bad request'
                });
            }
        }
        }
        
    }
    catch(e){
        res.status(500).send({
            message:'internal server error'
        });
    }
};
export const deleteTodo = async(req:CustomRequest, res:Response)=>{

};
export const updateTodo = async(req:CustomRequest, res:Response)=>{

};
export const getTodosbytags = async(req:CustomRequest, res:Response)=>{


};
export const addtags = async(req:CustomRequest, res:Response)=>{
    const {tags} = req.body;
    try{
        const tag = await TagModel.create({name:tags});
        if(tag){
            res.status(200).send({
                message:'Tag created successfully'
            });
        }
        else{
            res.status(400).send({
                message:'Bad request'
            });
        }
    }
    catch(e){
        res.status(500).send({
            message:'internal server error'
        });
    }
}
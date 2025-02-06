import {Request,Response} from 'express';
import {TodoModel} from '../models/todo';
import {TagModel} from '../models/tag';

interface CustomRequest extends Request {
    userId?:string;
}

export const getTodos = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId;

        const todos = await TodoModel.find({ userId })
            .populate({
                path: 'tags', // Assuming 'tags' is a reference field
                select: 'name', // Only fetch the 'name' field
            });

        if (!todos || todos.length === 0) {
            return res.status(400).send({
                message: "No todos available for this user",
            });
        }

        res.json({ todos });
    } catch (e) {
        res.status(500).send({
            message: 'Internal server error',
        });
    }
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
    try{
        const userId = req.userId;
        const {id}= req.params;
        console.log(id);
        // Check if the todo exists and belongs to the user
        const todo = await TodoModel.findOne({ _id: id, userId });
        if (!todo) {
            console.log('Todo not found or user not authorized to delete this todo');
            return res.status(404).send({
                message: 'Todo not found or user not authorized to delete this todo'
            });
        }
        const deletetodo = await TodoModel.findOneAndDelete({
            _id:id,
        });
        if(deletetodo){
            res.status(200).send({
                message:'Todo deleted successfully'
            });
        }
        else{
            res.status(400).send({
                message:'Bad request'
            });
        }
    }catch(e){
        res.status(500).send({
            message:'internal server error'
        });
    }

};
export const updateTodo = async(req:CustomRequest, res:Response)=>{
    try{
        const {title,content,tags,todoId} = req.body;
        const userId = req.userId!;
        console.log(userId, title, content, tags);
        const tagIds = await TagModel.findOneAndUpdate({
            _id:todoId,
            userId
        },{
            title,
            content,
            tags
        });
        if(tagIds){
            res.status(200).send({
                message:'Todo updated successfully'
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
};
export const getTodosbytags = async(req:CustomRequest, res:Response)=>{
    try{
        const userId = req.userId;
        const {tags} = req.body;

        const tagIds = await TagModel.find({ name: { $in: tags } }).select('_id');
        const tagObjectIds = tagIds.map(tag => tag._id);

        const todos = await TodoModel.find({
            userId,
            tags: { $in: tagObjectIds }
        });
        if(!todos){
            res.status(200).send({
                message:'Todos of tags notfound'
            });
        }
        else{
            res.json({
                todos
            });
        }
    }catch(e){
        res.status(500).send({
            message:'internal server error'
        });
    }

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
export const gettags = async(req:CustomRequest, res:Response)=>{
    try{
        const tags = await TagModel.find();
        if(tags){
            res.status(200).send({
                tags
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
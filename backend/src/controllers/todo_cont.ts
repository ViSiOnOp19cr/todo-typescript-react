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
export const updateTodo = async (req: CustomRequest, res: Response) => {
    try {
        const { title, content, tags: rawTags, todoId } = req.body;
        const userId = req.userId!;
        const tags = Array.isArray(rawTags) ? rawTags : (typeof rawTags === 'string' ? rawTags.split(',').map(tag => tag.trim()) : []);

        const existingTodo = await TodoModel.findOne({ _id: todoId, userId });

        if (!existingTodo) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }

        const tagIds = await Promise.all(
            tags.map(async (tagName: string) => {
                let tag = await TagModel.findOne({ name: tagName, userId });

                if (!tag) {
                    tag = await new TagModel({ name: tagName, userId }).save();
                }

                return tag._id;
            })
        );
        await TodoModel.findByIdAndUpdate(
            todoId,
            {
                title,
                content,
                tags: tagIds, 
            }
            
        );

        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Internal server error' });
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
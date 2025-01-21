import express,{Request} from 'express';
import { addTodo, deleteTodo, getTodos, updateTodo, getTodosbytags,addtags } from '../controllers/todo_cont';
import { usermiddlewares } from '../middlewares/usermiddlewares';

export const todo  = express.Router();
interface CustomRequest extends Request {
    userId?:string;
}

todo.get('/gettodos', usermiddlewares, async (req,res)=>{
    getTodos(req,res);
});

todo.post('/addtodo', usermiddlewares, async(req,res)=>{
    addTodo(req,res);
});
todo.delete('/delete/:id', usermiddlewares, async(req,res)=>{
    deleteTodo(req,res);
});
todo.put('/update/:id', usermiddlewares , async(req,res)=>{
    updateTodo(req,res);
});
todo.get('/gettodobytags', usermiddlewares , async(req,res)=>{
    getTodosbytags(req,res);
});
todo.post('/addtags', usermiddlewares, async(req,res)=>{
    addtags(req,res);
});

import express from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import {user} from './routes/user_routes';
import {todo} from './routes/todo_routes';
import cors from 'cors';

env.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', user);
app.use('/',todo);

app.listen(port, async ()=>{
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log('Connected to database');
    console.log(`Server is running on port ${port}`);
});
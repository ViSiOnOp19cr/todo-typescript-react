import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {type:String, required:true},
    content: {type:String, required:true},
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

export const TodoModel = mongoose.model('Todo', todoSchema);


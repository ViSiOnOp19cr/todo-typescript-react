"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gettags = exports.addtags = exports.getTodosbytags = exports.updateTodo = exports.deleteTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = require("../models/todo");
const tag_1 = require("../models/tag");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const todos = yield todo_1.TodoModel.find({ userId })
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
    }
    catch (e) {
        res.status(500).send({
            message: 'Internal server error',
        });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, tags } = req.body;
    const userId = req.userId;
    try {
        const tagIds = yield tag_1.TagModel.findOne({ name: tags });
        if (tagIds) {
            const todo = yield todo_1.TodoModel.create({
                title,
                content,
                tags: tagIds._id,
                userId
            });
            if (todo) {
                res.status(200).send({
                    message: 'Todo created successfully'
                });
            }
            else {
                res.status(400).send({
                    message: 'Bad request'
                });
            }
        }
        else {
            yield tag_1.TagModel.create({
                name: tags
            });
            const newtag = yield tag_1.TagModel.findOne({ name: tags });
            if (newtag) {
                const todo = yield todo_1.TodoModel.create({
                    title,
                    content,
                    tags: newtag._id,
                    userId
                });
                if (todo) {
                    res.status(200).send({
                        message: 'Todo created successfully'
                    });
                }
                else {
                    res.status(400).send({
                        message: 'Bad request'
                    });
                }
            }
        }
    }
    catch (e) {
        res.status(500).send({
            message: 'internal server error'
        });
    }
});
exports.addTodo = addTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const todo = yield todo_1.TodoModel.findOne({ _id: id, userId });
        if (!todo) {
            console.log('Todo not found or user not authorized to delete this todo');
            return res.status(404).send({
                message: 'Todo not found or user not authorized to delete this todo'
            });
        }
        const deletetodo = yield todo_1.TodoModel.findOneAndDelete({
            _id: id,
        });
        if (deletetodo) {
            res.status(200).send({
                message: 'Todo deleted successfully'
            });
        }
        else {
            res.status(400).send({
                message: 'Bad request'
            });
        }
    }
    catch (e) {
        res.status(500).send({
            message: 'internal server error'
        });
    }
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, tags: rawTags, todoId } = req.body;
        const userId = req.userId;
        const tags = Array.isArray(rawTags) ? rawTags : (typeof rawTags === 'string' ? rawTags.split(',').map(tag => tag.trim()) : []);
        const existingTodo = yield todo_1.TodoModel.findOne({ _id: todoId, userId });
        if (!existingTodo) {
            return res.status(404).json({ message: 'Todo not found or unauthorized' });
        }
        const tagIds = yield Promise.all(tags.map((tagName) => __awaiter(void 0, void 0, void 0, function* () {
            let tag = yield tag_1.TagModel.findOne({ name: tagName, userId });
            if (!tag) {
                tag = yield new tag_1.TagModel({ name: tagName, userId }).save();
            }
            return tag._id;
        })));
        yield todo_1.TodoModel.findByIdAndUpdate(todoId, {
            title,
            content,
            tags: tagIds,
        });
        res.status(200).json({ message: 'Todo updated successfully' });
    }
    catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateTodo = updateTodo;
const getTodosbytags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { tags } = req.body;
        const tagIds = yield tag_1.TagModel.find({ name: { $in: tags } }).select('_id');
        const tagObjectIds = tagIds.map(tag => tag._id);
        const todos = yield todo_1.TodoModel.find({
            userId,
            tags: { $in: tagObjectIds }
        });
        if (!todos) {
            res.status(200).send({
                message: 'Todos of tags notfound'
            });
        }
        else {
            res.json({
                todos
            });
        }
    }
    catch (e) {
        res.status(500).send({
            message: 'internal server error'
        });
    }
});
exports.getTodosbytags = getTodosbytags;
const addtags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags } = req.body;
    try {
        const tag = yield tag_1.TagModel.create({ name: tags });
        if (tag) {
            res.status(200).send({
                message: 'Tag created successfully'
            });
        }
        else {
            res.status(400).send({
                message: 'Bad request'
            });
        }
    }
    catch (e) {
        res.status(500).send({
            message: 'internal server error'
        });
    }
});
exports.addtags = addtags;
const gettags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield tag_1.TagModel.find();
        if (tags) {
            res.status(200).send({
                tags
            });
        }
        else {
            res.status(400).send({
                message: 'Bad request'
            });
        }
    }
    catch (e) {
        res.status(500).send({
            message: 'internal server error'
        });
    }
});
exports.gettags = gettags;

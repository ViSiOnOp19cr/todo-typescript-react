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
exports.addtags = exports.getTodosbytags = exports.updateTodo = exports.deleteTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = require("../models/todo");
const tag_1 = require("../models/tag");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const todos = yield todo_1.TodoModel.find({
            userId
        });
        if (!todos) {
            res.status(400).send({
                message: "no todos avaliable for this user"
            });
        }
        else {
            res.json({
                todos
            });
        }
        ;
    }
    catch (e) {
        res.status(500).send({
            message: 'internal server error'
        });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, tags } = req.body;
    const userId = req.userId;
    console.log(userId, title, content, tags);
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
        const { todoId } = req.body;
        // Check if the todo exists and belongs to the user
        const todo = yield todo_1.TodoModel.findOne({ _id: todoId, userId });
        if (!todo) {
            console.log('Todo not found or user not authorized to delete this todo');
            return res.status(404).send({
                message: 'Todo not found or user not authorized to delete this todo'
            });
        }
        const deletetodo = yield todo_1.TodoModel.findOneAndDelete({
            _id: todoId,
            userId: userId
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
        const { title, content, tags } = req.body;
        const userId = req.userId;
        const todoId = req.params;
        const tagIds = yield tag_1.TagModel.findOneAndUpdate({
            _id: todoId,
            userId
        }, {
            title,
            content,
            tags
        }, {
            new: true
        });
        if (tagIds) {
            res.status(200).send({
                message: 'Todo updated successfully'
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

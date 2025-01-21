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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todo = void 0;
const express_1 = __importDefault(require("express"));
const todo_cont_1 = require("../controllers/todo_cont");
const usermiddlewares_1 = require("../middlewares/usermiddlewares");
exports.todo = express_1.default.Router();
exports.todo.get('/gettodos', usermiddlewares_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, todo_cont_1.getTodos)(req, res);
}));
exports.todo.post('/addtodo', usermiddlewares_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, todo_cont_1.addTodo)(req, res);
}));
exports.todo.delete('/delete/:id', usermiddlewares_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, todo_cont_1.deleteTodo)(req, res);
}));
exports.todo.put('/update/:id', usermiddlewares_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, todo_cont_1.updateTodo)(req, res);
}));
exports.todo.get('/gettodobytags', usermiddlewares_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, todo_cont_1.getTodosbytags)(req, res);
}));
exports.todo.post('/addtags', usermiddlewares_1.usermiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, todo_cont_1.addtags)(req, res);
}));

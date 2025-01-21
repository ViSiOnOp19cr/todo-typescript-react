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
exports.login = exports.signup = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const argon2_1 = __importDefault(require("argon2"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_PASSWORD;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //take input from req.body
    const { email, password } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({
            email
        });
        if (user) {
            return res.status(400).send({
                message: 'User already exists'
            });
        }
        const hashedpassword = yield argon2_1.default.hash(password);
        yield user_1.UserModel.create({ email, password: hashedpassword });
        res.status(200).send({
            message: 'User created successfully'
        });
    }
    catch (err) {
        res.status(500).send({
            message: 'Internal server error'
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.UserModel.findOne({
            email
        });
        if (!user) {
            return res.status(401).send({
                message: "Invalid creadentials"
            });
        }
        const passvalid = yield argon2_1.default.verify(user.password, password);
        //jwt verify for futher verifications and all.
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, JWT_SECRET);
        res.status(200).send({
            token
        });
    }
    catch (err) {
        res.status(500).send({
            message: 'Internal server error'
        });
    }
});
exports.login = login;

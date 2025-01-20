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
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.user = express_1.default.Router();
exports.user.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_1.signup)(req, res);
}));
exports.user.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_1.login)(req, res);
}));
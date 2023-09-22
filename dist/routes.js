"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controller/UserController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const cors_1 = __importDefault(require("cors"));
const routes = (0, express_1.Router)();
routes.post('/user', (0, cors_1.default)(), new UserController_1.UserController().create);
routes.post('/login', (0, cors_1.default)(), new UserController_1.UserController().login);
routes.get('/profile', authMiddleware_1.authMiddleware, (0, cors_1.default)(), new UserController_1.UserController().getProfile);
exports.default = routes;

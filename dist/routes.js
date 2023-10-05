"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controller/UserController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const routes = (0, express_1.Router)();
routes.post('/register', new UserController_1.UserController().create);
routes.post('/login', new UserController_1.UserController().login);
routes.post('/validation', new UserController_1.UserController().validationMobile);
routes.get('/profile', authMiddleware_1.authMiddleware, new UserController_1.UserController().getProfile);
routes.get('/profile/:id', new UserController_1.UserController().getProfileById);
// routes.put('/update', new UserController())
exports.default = routes;

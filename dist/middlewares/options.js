"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.option = void 0;
const option = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
};
exports.option = option;

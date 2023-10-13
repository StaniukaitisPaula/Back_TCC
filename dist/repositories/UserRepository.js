"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizadorRepository = exports.userRepository = exports.jogadorRepository = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
exports.jogadorRepository = data_source_1.AppDataSource.getRepository(User_1.Jogador);
exports.userRepository = data_source_1.AppDataSource.getRepository(User_1.Perfil);
exports.organizadorRepository = data_source_1.AppDataSource.getRepository(User_1.Organizacao);
// export const timeRepository = AppDataSource.getRepository(Time)

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const api_erros_1 = require("../helpers/api-erros");
const UserRepository_1 = require("../repositories/UserRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    async create(req, res) {
        const { nome_usuario, nome_completo, email, senha, data_nascimento, foto_perfil, foto_capa, genero, tipo_de_usuario, } = req.body;
        console.log(req.body);
        if (nome_usuario == undefined ||
            nome_completo == undefined ||
            email == undefined ||
            senha == undefined ||
            data_nascimento == undefined ||
            foto_perfil == undefined ||
            foto_capa == undefined ||
            genero == undefined ||
            tipo_de_usuario == undefined)
            throw new api_erros_1.BadRequestError('JSON invalido');
        const userEmailExists = await UserRepository_1.userRepository.findOneBy({ email });
        const usernameExists = await UserRepository_1.userRepository.findOneBy({ nome_usuario });
        if (userEmailExists) {
            throw new api_erros_1.BadRequestError('Email já cadastrado!');
        }
        if (usernameExists) {
            throw new api_erros_1.BadRequestError('Nome de usuario já cadastrado!');
        }
        const hashSenha = await bcrypt_1.default.hash(senha, 10);
        const newUser = UserRepository_1.userRepository.create({
            nome_usuario,
            nome_completo,
            email,
            senha: hashSenha,
            data_nascimento,
            foto_perfil,
            foto_capa,
            genero
        });
        await UserRepository_1.userRepository.save(newUser);
        const idPerfil = await UserRepository_1.userRepository.getId(newUser);
        const { senha: _, ...user } = newUser;
        if (tipo_de_usuario == 0) {
            if (!req.body.jogador) {
                await UserRepository_1.userRepository.delete({ id: idPerfil });
                throw new api_erros_1.BadRequestError('Falta Informacoes do jogador');
            }
            const { nickname, biografia, jogo, funcao } = req.body.jogador;
            const newPlayer = UserRepository_1.jogadorRepository.create({
                perfil: idPerfil,
                nickname,
                biografia,
                jogo,
                funcao
            });
            await UserRepository_1.jogadorRepository.save(newPlayer);
            return res.status(201).json(user);
        }
        else if (tipo_de_usuario == 1) {
            if (!req.body.organizador) {
                await UserRepository_1.userRepository.delete({ id: idPerfil });
                throw new api_erros_1.BadRequestError('Falta Informacoes do organizador');
            }
            const { nome_organizacao, foto_organizacao, biografia } = req.body.organizador;
            const newOrganizador = UserRepository_1.organizadorRepository.create({
                perfil: idPerfil,
                nome_organizacao,
                foto_organizacao,
                biografia
            });
            await UserRepository_1.organizadorRepository.save(newOrganizador);
            return res.status(201).json(user);
        }
        else {
            await UserRepository_1.userRepository.delete({ id: idPerfil });
            throw new api_erros_1.BadRequestError('Tipo de Usuario invalido');
        }
    }
    async login(req, res) {
        var _a;
        const { login, senha } = req.body;
        const user = await UserRepository_1.userRepository.findOneBy([{ email: login }, { nome_usuario: login }]);
        if (!user) {
            throw new api_erros_1.BadRequestError('Login ou senha invalidos');
        }
        const verifyPass = await bcrypt_1.default.compare(senha, user.senha);
        if (!verifyPass) {
            throw new api_erros_1.BadRequestError('Login ou senha invalidos');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', { expiresIn: "1d", });
        const { senha: _, ...userLogin } = user;
        return res.json({
            user: userLogin,
            token: token
        });
    }
    async getProfile(req, res) {
        const user = req.user;
        //const player = await jogadorRepository.findBy({ perfil : user.id })
        const player = await UserRepository_1.jogadorRepository.find({ relations: { perfil: true }, where: { perfil: { id: user.id } } });
        const organizador = await UserRepository_1.organizadorRepository.find({ relations: { perfil: true }, where: { perfil: { id: user.id } } });
        if (player.length > 0) {
            player[0].perfil.senha = "";
            const result = player[0];
            const response = { type: 'jogador', result };
            return res.json(response);
        }
        else {
            console.log(organizador);
            organizador[0].perfil.senha = "";
            const result = organizador[0];
            const response = { type: 'organizador', result };
            return res.json(response);
        }
    }
}
exports.UserController = UserController;

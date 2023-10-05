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
    //CADASTRO
    async create(req, res) {
        const { nome_usuario, nome_completo, email, senha, data_nascimento, genero, nickname, biografia } = req.body;
        if (nome_usuario == undefined || nome_usuario == "" ||
            email == undefined || email == "" ||
            senha == undefined || senha == "" ||
            data_nascimento == undefined || data_nascimento == "" ||
            genero == undefined ||
            nickname == undefined || nickname == "")
            throw new api_erros_1.BadRequestError('JSON invalido, Faltam Informacoes!');
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
            genero,
            nickname,
            biografia
        });
        await UserRepository_1.userRepository.save(newUser);
        const { senha: _, ...user } = newUser;
        return res.status(201).json(user);
    }
    //LOGIN
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
    //PERFIL
    async getProfile(req, res) {
        const user = req.user;
        const playerProfile = await UserRepository_1.jogadorRepository.find({ relations: { perfil_id: true }, where: { perfil_id: { id: user.id } } });
        const orgProfile = await UserRepository_1.organizadorRepository.find({ relations: { dono_id: true }, where: { dono_id: { id: user.id } } });
        const response = { user: user, playerProfile: playerProfile[0] ? playerProfile[0].id : false, orgProfile: orgProfile[0] ? orgProfile[0].id : false };
        return res.json(response);
        // if(player.length > 0){
        //   player[0].perfil.senha = ""
        //   const result = player[0]
        //   const response =  { type: 'jogador', result}
        //   return res.json(response)
        // }else{
        //   console.log(organizador);
        //   organizador[0].perfil.senha = ""
        //   const result = organizador[0]
        //   const response =  { type: 'organizador', result}
        //   return res.json(response)
        // }
    }
    async getProfileById(req, res) {
        const user = req.params.id;
        const playerProfile = await UserRepository_1.jogadorRepository.find({ relations: { perfil_id: true }, where: { perfil_id: { id: parseInt(user) } } });
        const orgProfile = await UserRepository_1.organizadorRepository.find({ relations: { dono_id: true }, where: { dono_id: { id: parseInt(user) } } });
        if (playerProfile.length > 0) {
            playerProfile[0].perfil_id.senha = "";
            const result = playerProfile[0];
            const response = { type: 'jogador', result };
            return res.json(response);
        }
        else {
            console.log(orgProfile);
            orgProfile[0].dono_id.senha = "";
            const result = orgProfile[0];
            const response = { type: 'organizador', result };
            return res.json(response);
        }
    }
}
exports.UserController = UserController;

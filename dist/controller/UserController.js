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
        const nicknameExists = await UserRepository_1.userRepository.findOneBy({ nickname });
        if (userEmailExists) {
            throw new api_erros_1.BadRequestError('Email já cadastrado!');
        }
        if (usernameExists) {
            throw new api_erros_1.BadRequestError('Nome de usuario já cadastrado!');
        }
        if (nicknameExists) {
            throw new api_erros_1.BadRequestError('Nickname já cadastrado!');
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
        const playerProfile = await UserRepository_1.jogadorRepository.find({ relations: { perfil_id: true }, where: { perfil_id: { id: user.id } }, select: { perfil_id: { id: false } } });
        const orgProfile = await UserRepository_1.organizadorRepository.find({ relations: { dono_id: true }, where: { dono_id: { id: user.id } }, select: { biografia: true, nome_organizacao: true, times: true, dono_id: { id: false } } });
        const response = { user: user, playerProfile: playerProfile[0] ? playerProfile[0] : false, orgProfile: orgProfile[0] ? orgProfile[0] : false };
        return res.json(response);
    }
    // PUXAR PELO ID 
    async getProfileById(req, res) {
        const id = req.params.id;
        const user = await UserRepository_1.userRepository.findOneBy({ id: parseInt(id) });
        if (user == null) {
            throw new api_erros_1.BadRequestError('Usuario não existe!');
        }
        const { senha, ...userReturn } = user;
        const playerProfile = await UserRepository_1.jogadorRepository.find({ relations: { perfil_id: true }, where: { perfil_id: { id: user.id } }, select: { perfil_id: { id: false } } });
        const orgProfile = await UserRepository_1.organizadorRepository.find({ relations: { dono_id: true }, where: { dono_id: { id: user.id } }, select: { biografia: true, nome_organizacao: true, times: true, dono_id: { id: false } } });
        const response = { user: userReturn, playerProfile: playerProfile[0] ? playerProfile[0] : false, orgProfile: orgProfile[0] ? orgProfile[0] : false };
        return res.json(response);
    }
    // ATUALIZAR PERFIL
    async updateProfile(req, res) {
        const user = req.user;
        const { id, nome_usuario, nome_completo, email, senha, data_nascimento, genero, nickname, biografia } = req.body;
        let response = {
            id,
            nome_usuario,
            nome_completo,
            email,
            senha,
            data_nascimento,
            genero,
            nickname,
            biografia
        };
        if (nome_usuario) {
            if (await UserRepository_1.userRepository.findOneBy({ nome_usuario: nome_usuario })) {
                response.nome_usuario = 'Usuario já existe!';
            }
            else {
                response.nome_usuario = await UserRepository_1.userRepository.update({ id: user.id }, { nome_usuario: nome_usuario });
            }
        }
        if (email) {
            if (await UserRepository_1.userRepository.findOneBy({ email: email })) {
                response.email = 'Email de usuario já cadastrado!';
            }
            else {
                response.email = Boolean((await UserRepository_1.userRepository.update({ id: user.id }, { email: email })).affected);
            }
        }
        if (senha) {
            const hashSenha = await bcrypt_1.default.hash(senha, 10);
            response.senha = Boolean((await UserRepository_1.userRepository.update({ id: user.id }, { senha: hashSenha })).affected);
        }
        if (data_nascimento) {
            response.data_nascimento = Boolean((await UserRepository_1.userRepository.update({ id: user.id }, { data_nascimento: data_nascimento })).affected);
        }
        if (genero) {
            response.genero = Boolean((await UserRepository_1.userRepository.update({ id: user.id }, { genero: genero })).affected);
        }
        if (nickname) {
            if (await UserRepository_1.userRepository.findOneBy({ nickname: nickname })) {
                response.nickname = 'Nickname de usuario já ultilizado!';
            }
            else {
                response.nickname = Boolean(await UserRepository_1.userRepository.update({ id: user.id }, { nickname: nickname }));
            }
        }
        if (biografia) {
            if (await UserRepository_1.userRepository.findOneBy({ biografia: biografia })) {
            }
            else {
                response.biografia = Boolean((await UserRepository_1.userRepository.update({ id: user.id }, { biografia: biografia })).affected);
            }
        }
        return res.json({
            response: response
        });
    }
    //VALIDACAO PARA O MOBILE
    async validationMobile(req, res) {
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
    }
    //POST JOGADOR 
    async createPlayer(req, res) {
        const id = req.user;
        const { nickname, jogo, funcao, elo, } = req.body;
        // console.log(jogo);
        // console.log(funcao);
        // console.log(elo);
        if (nickname == undefined || nickname == "" ||
            jogo == undefined || jogo == "" ||
            funcao == undefined || funcao == "" ||
            elo == undefined || elo == "")
            throw new api_erros_1.BadRequestError('JSON invalido, Faltam Informacoes!');
        const jogadorExists = await UserRepository_1.jogadorRepository.findOneBy({ perfil_id: id });
        if (jogadorExists)
            throw new api_erros_1.BadRequestError('Perfil Jogador já cadastrado!');
        const newJogador = UserRepository_1.jogadorRepository.create({
            nickname,
            jogo,
            funcao,
            elo,
            perfil_id: id,
        });
        await UserRepository_1.jogadorRepository.save(newJogador);
        //const {senha: _, ...user} = newUser
        return res.status(201).json(newJogador);
    }
    //UPDATE JOGADOR
    async updatePlayer(req, res) {
        const user = req.user;
        const playerProfile = await UserRepository_1.jogadorRepository.find({ relations: { perfil_id: true }, where: { perfil_id: { id: user.id } }, select: { perfil_id: { id: false } } });
        const { nickname, jogo, funcao, elo, } = req.body;
        let response = {
            nickname,
            jogo,
            funcao,
            elo
        };
        if (nickname) {
            response.nickname = Boolean((await UserRepository_1.jogadorRepository.update({ id: playerProfile[0].id }, { nickname: nickname })).affected);
        }
        if (jogo) {
            response.jogo = Boolean((await UserRepository_1.jogadorRepository.update({ id: playerProfile[0].id }, { jogo: jogo })).affected);
        }
        if (funcao) {
            response.jogo = Boolean((await UserRepository_1.jogadorRepository.update({ id: playerProfile[0].id }, { funcao: funcao })).affected);
        }
        if (elo) {
            response.jogo = Boolean((await UserRepository_1.jogadorRepository.update({ id: playerProfile[0].id }, { elo: elo })).affected);
        }
        return res.json({
            response: response
        });
    }
    // POST ORGANIZADOR
    async createorganizer(req, res) {
        const id = req.user;
        const { times, nome_organizacao, biografia, } = req.body;
        if (times == undefined || times == "" ||
            nome_organizacao == undefined || nome_organizacao == "" ||
            biografia == undefined || biografia == "")
            throw new api_erros_1.BadRequestError('JSON invalido, Faltam Informacoes!');
        const organizadorExists = await UserRepository_1.organizadorRepository.findOneBy({ dono_id: id });
        if (organizadorExists)
            throw new api_erros_1.BadRequestError('Perfil Organizador já cadastrado!');
        const newOrganizador = UserRepository_1.organizadorRepository.create({
            times,
            nome_organizacao,
            biografia,
            dono_id: id,
        });
        await UserRepository_1.organizadorRepository.save(newOrganizador);
        return res.status(201).json(newOrganizador);
    }
}
exports.UserController = UserController;

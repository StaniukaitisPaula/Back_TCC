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
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
class UserController {
    //CADASTRO / LOGIN
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
            throw new api_erros_1.BadRequestError('Nome de usuário já cadastrado!');
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
            throw new api_erros_1.BadRequestError('Nome de usuário já cadastrado!');
        }
    }
    // GET 
    async getProfile(req, res) {
        const user = req.user;
        const playerProfile = await UserRepository_1.jogadorRepository.find({ relations: { perfil_id: true, time_atual: true }, where: { perfil_id: { id: user.id } }, select: { perfil_id: { id: false } } });
        const orgProfile = await UserRepository_1.organizadorRepository.find({ relations: { dono_id: true }, where: { dono_id: { id: user.id } }, select: { biografia: true, nome_organizacao: true, times: true, dono_id: { id: false } } });
        const response = { user: user, playerProfile: playerProfile[0] ? playerProfile[0] : null, orgProfile: orgProfile[0] ? orgProfile[0] : null };
        return res.json(response);
    }
    async getProfileById(req, res) {
        const id = req.params.id;
        const user = await UserRepository_1.userRepository.findOne({ where: { id: parseInt(id) } });
        if (user == null) {
            throw new api_erros_1.BadRequestError('Usuario não existe!');
        }
        const { senha, ...userReturn } = user;
        const playerProfile = await UserRepository_1.jogadorRepository.find({ relations: { perfil_id: true, time_atual: true }, where: { perfil_id: { id: user.id } }, select: { perfil_id: { id: false } } });
        const orgProfile = await UserRepository_1.organizadorRepository.find({ relations: { dono_id: true }, where: { dono_id: { id: user.id } }, select: { biografia: true, nome_organizacao: true, times: true, dono_id: { id: false } } });
        const response = { user: userReturn, playerProfile: playerProfile[0] ? playerProfile[0] : null, orgProfile: orgProfile[0] ? orgProfile[0] : null };
        return res.json(response);
    }
    async getPlayers(req, res) {
        let perPage = req.query.perPage;
        let page = req.query.page;
        const id = req.query.id;
        const perPageNumber = parseInt(perPage);
        const pagenumber = parseInt(page);
        const skip = (perPageNumber * pagenumber) - perPageNumber;
        let jogadorResponse = [new User_1.Jogador];
        let jogadorfilter = [new User_1.Jogador];
        let name = req.query.name;
        if (!isNaN(perPageNumber) && !isNaN(pagenumber)) {
            jogadorResponse = await UserRepository_1.jogadorRepository.find({ relations: { perfil_id: true, time_atual: true }, take: perPageNumber, skip: skip });
        }
        else {
            jogadorResponse = await UserRepository_1.jogadorRepository.find({ relations: { perfil_id: true, time_atual: true } });
        }
        if (name != undefined && name != "") {
            jogadorfilter = jogadorResponse.filter((x) => { if (x.nickname.toLowerCase().startsWith(name.toLowerCase()))
                return x; });
            jogadorResponse = jogadorfilter;
        }
        if (id) {
            jogadorfilter = jogadorResponse.filter((x) => { if (x.perfil_id.id == parseInt(id))
                return x; });
            // console.log(jogadorfilter);
            jogadorResponse = jogadorfilter;
        }
        let jogadorCount = await UserRepository_1.jogadorRepository.countBy({ nickname: (0, typeorm_1.Like)(`${name}%`) });
        const response = { players: jogadorResponse, limit: jogadorCount };
        return res.json(response);
    }
    //POST JOGADOR / ORGANIZADOR 
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
    async createorganizer(req, res) {
        const id = req.user;
        const { nome_organizacao, biografia, } = req.body;
        if (nome_organizacao == undefined || nome_organizacao == "" ||
            biografia == undefined || biografia == "")
            throw new api_erros_1.BadRequestError('JSON invalido, Faltam Informacoes!');
        const organizadorExists = await UserRepository_1.organizadorRepository.findOneBy({ dono_id: id });
        if (organizadorExists)
            throw new api_erros_1.BadRequestError('Perfil Organizador já cadastrado!');
        const newOrganizador = UserRepository_1.organizadorRepository.create({
            nome_organizacao,
            biografia,
            dono_id: id,
        });
        await UserRepository_1.organizadorRepository.save(newOrganizador);
        return res.status(201).json(newOrganizador);
    }
    // PUT
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
        if (nome_completo) {
            if (await UserRepository_1.userRepository.findOneBy({ nome_completo: nome_completo })) {
                response.nome_completo = 'Nome usuario já existe!';
            }
            else {
                response.nome_completo = await UserRepository_1.userRepository.update({ id: user.id }, { nome_completo: nome_completo });
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
    //UPDATE JOGADOR / ORGANIZADOR
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
            response.funcao = Boolean((await UserRepository_1.jogadorRepository.update({ id: playerProfile[0].id }, { funcao: funcao })).affected);
        }
        if (elo) {
            response.elo = Boolean((await UserRepository_1.jogadorRepository.update({ id: playerProfile[0].id }, { elo: elo })).affected);
        }
        return res.json({
            response: response
        });
    }
    async updatePlayerLeave(req, res) {
        var _a;
        const player = req.player;
        if (player != null) {
            const time = await UserRepository_1.timeRepository.findOneBy({ jogadores: { id: player.id } });
            if (time) {
                let jogadorFilter = (_a = time.jogadores) === null || _a === void 0 ? void 0 : _a.filter(x => x.id !== player.id);
                time.jogadores = jogadorFilter;
                await UserRepository_1.timeRepository.save(time);
            }
        }
        const noti = await UserRepository_1.notificacaoRepository.create({ de: player.perfil_id, menssagem: 'O jogador(a) ' + player.nickname + 'saiu do Time ' + player.time_atual, titulo: 'TIME' });
        await UserRepository_1.notificacaoRepository.save(noti);
        return res.json({
            up: true
        });
    }
    async updateOrganizer(req, res) {
        const user = req.user;
        const orgProfile = await UserRepository_1.organizadorRepository.find({ relations: { dono_id: true }, where: { dono_id: { id: user.id } }, select: { dono_id: { id: false } } });
        const { times, nome_organizacao, biografia, } = req.body;
        let response = {
            times,
            nome_organizacao,
            biografia,
        };
        if (times) {
            response.times = Boolean((await UserRepository_1.organizadorRepository.update({ id: orgProfile[0].id }, { times: times })).affected);
        }
        if (nome_organizacao) {
            response.nome_organizacao = Boolean((await UserRepository_1.organizadorRepository.update({ id: orgProfile[0].id }, { nome_organizacao: nome_organizacao })).affected);
        }
        if (biografia) {
            response.biografia = Boolean((await UserRepository_1.organizadorRepository.update({ id: orgProfile[0].id }, { biografia: biografia })).affected);
        }
        return res.json({
            response: response
        });
    }
    //DELETE
    async deleteOrganizer(req, res) {
        const org = req.org;
        if (org) {
            const orgProfile = await UserRepository_1.organizadorRepository.delete({ id: org.id });
        }
        else {
            throw new api_erros_1.BadRequestError('O usuário não possui Organização!');
        }
        return res.json({
            response: true
        });
    }
    async deletePlayer(req, res) {
        const player = req.player;
        if (req.player) {
            const playerProfile = await UserRepository_1.jogadorRepository.delete(player);
        }
        else {
            throw new api_erros_1.BadRequestError('O usuário não tem perfil de Jogador!');
        }
        const postUser = req.user;
        if (postUser) {
            const post = await UserRepository_1.postagemRepository.delete({ dono_id: postUser });
        }
        else {
            throw new api_erros_1.BadRequestError('!!!');
        }
        return res.json({
            response: true
        });
    }
}
exports.UserController = UserController;

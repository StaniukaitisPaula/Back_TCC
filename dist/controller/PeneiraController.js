"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeneiraController = void 0;
const api_erros_1 = require("../helpers/api-erros");
const UserRepository_1 = require("../repositories/UserRepository");
class PeneiraController {
    //POST
    async postPeneira(req, res) {
        const idTime = parseInt(req.params.time);
        const idJogador = parseInt(req.params.jogador);
        const menssagem = req.body.menssage;
        if (idTime == undefined ||
            idJogador == undefined ||
            isNaN(idTime) || isNaN(idJogador))
            throw new api_erros_1.BadRequestError('Faltam Informacoes!');
        const time = await UserRepository_1.timeRepository.findOne({ where: { id: idTime }, relations: { organizacao: true } });
        if (!time || time.organizacao.id != req.org.id)
            throw new api_erros_1.BadRequestError('Esse time não exite ou não pertece a essa organização!');
        const jogador = await UserRepository_1.jogadorRepository.findOne({ where: { perfil_id: { id: idJogador } }, relations: { perfil_id: true, time_atual: true } });
        if (!jogador)
            throw new api_erros_1.BadRequestError('Jogador não exite!');
        if (jogador.time_atual)
            throw new api_erros_1.BadRequestError('Jogador já tem time!');
        const verifique = await UserRepository_1.peneiraRepository.findOneBy({ jogadores: jogador.perfil_id, time: time });
        if (verifique)
            throw new api_erros_1.BadRequestError('Proposta ja enviada!');
        const peneira = await UserRepository_1.peneiraRepository.create({ jogadores: time.jogadores, menssagem: menssagem ? menssagem : "" });
        const pen = await UserRepository_1.peneiraRepository.save(peneira);
        const noti = await UserRepository_1.notificacaoRepository.create({ de: jogador.perfil_id, menssagem: 'Uma proposta foi enviada para o seu perfil!', titulo: 'Proposta recebida' });
        await UserRepository_1.notificacaoRepository.save(noti);
    }
    ///GET
    async getPeneira(req, res) {
    }
    //PUT
    async putPeneira(req, res) {
    }
    //DELETE
    async deletePeneira(req, res) {
    }
}
exports.PeneiraController = PeneiraController;

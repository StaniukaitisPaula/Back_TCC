"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropostaController = void 0;
const api_erros_1 = require("../helpers/api-erros");
const UserRepository_1 = require("../repositories/UserRepository");
class PropostaController {
    async enviarProposta(req, res) {
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
        console.log(jogador);
        if (!jogador)
            throw new api_erros_1.BadRequestError('Jogador não exite!');
        if (jogador.time_atual)
            throw new api_erros_1.BadRequestError('Jogador já tem time!');
        const verifique = await UserRepository_1.propostaRepository.findOneBy({ de: time, para: jogador.perfil_id });
        if (verifique)
            throw new api_erros_1.BadRequestError('Proposta ja enviada!');
        const proposta = await UserRepository_1.propostaRepository.create({ de: time, para: jogador.perfil_id, menssagem: menssagem ? menssagem : "" });
        const oila = await UserRepository_1.propostaRepository.save(proposta);
        console.log(oila);
        const noti = await UserRepository_1.notificacaoRepository.create({ de: jogador.perfil_id, menssagem: 'Uma proposta foi enviada para o seu perfil!', titulo: 'Proposta recebida' });
        await UserRepository_1.notificacaoRepository.save(noti);
        res.json({
            proposta: oila
        });
    }
    async verPropostas(req, res) {
        console.log(req.user);
        res.json({
            propostas: req.user.propostas
        });
    }
    async responderProposta(req, res) {
        const idTime = parseInt(req.params.time);
        const idJogador = req.user.id;
        const aceitar = req.params.aceitar;
        if (idTime == undefined ||
            idJogador == undefined ||
            isNaN(idTime) || isNaN(idJogador))
            throw new api_erros_1.BadRequestError('Faltam Informacoes!');
        const time = await UserRepository_1.timeRepository.findOne({ where: { id: idTime }, relations: { organizacao: { dono_id: true } } });
        if (!time)
            throw new api_erros_1.BadRequestError('Esse time não exite ou não pertece a essa organização!');
        const jogador = await UserRepository_1.jogadorRepository.findOne({ where: { perfil_id: { id: idJogador } }, relations: { perfil_id: true, time_atual: true } });
        console.log(jogador);
        if (!jogador)
            throw new api_erros_1.BadRequestError('Jogador não exite!');
        if (jogador.time_atual)
            throw new api_erros_1.BadRequestError('Jogador já tem time!');
        const proposta = await UserRepository_1.propostaRepository.findOne({ where: { de: time, para: jogador.perfil_id } });
        console.log(aceitar);
        if (aceitar == '1' && proposta) {
            console.log("oi");
            let jogadores = time.jogadores;
            jogadores ? jogadores.push(jogador) : jogadores = [jogador];
            if (jogadores.length > 10)
                throw new api_erros_1.BadRequestError('Time atigil o limite de jogadores');
            time.jogadores = jogadores;
            await UserRepository_1.timeRepository.save(time);
            await UserRepository_1.propostaRepository.delete(proposta);
            const noti = await UserRepository_1.notificacaoRepository.create({ de: time.organizacao.dono_id, menssagem: 'Aproposta para o ' + jogador.nickname + 'foi aceita!', titulo: 'Proposta aceita' });
            await UserRepository_1.notificacaoRepository.save(noti);
        }
        else if (proposta) {
            await UserRepository_1.propostaRepository.delete(proposta);
            const noti = await UserRepository_1.notificacaoRepository.create({ de: time.organizacao.dono_id, menssagem: 'Aproposta para o ' + jogador.nickname + 'foi recusada!', titulo: 'Proposta recusada' });
            await UserRepository_1.notificacaoRepository.save(noti);
        }
        res.json({
            acepted: true
        });
    }
}
exports.PropostaController = PropostaController;

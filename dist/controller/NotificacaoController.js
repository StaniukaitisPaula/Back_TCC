"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacaoController = void 0;
const api_erros_1 = require("../helpers/api-erros");
const UserRepository_1 = require("../repositories/UserRepository");
class NotificacaoController {
    //GET
    async getNotificacao(req, res) {
        const user = req.user;
        const notificacoes = await UserRepository_1.notificacaoRepository.find({ relations: { de: true }, where: { de: { id: user.id } }, select: { de: { id: false } } });
        const response = { notifications: notificacoes };
        return res.json(response);
    }
    //DELETE
    async deleteNotificacao(req, res) {
        const idPost = req.params.id;
        if (idPost) {
            const post = await UserRepository_1.notificacaoRepository.delete(idPost);
        }
        else {
            throw new api_erros_1.BadRequestError('!!!');
        }
        return res.json({
            response: true
        });
    }
}
exports.NotificacaoController = NotificacaoController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controller/UserController");
const TimeController_1 = require("./controller/TimeController");
const PostagemController_1 = require("./controller/PostagemController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const PropostaController_1 = require("./controller/PropostaController");
const NotificacaoController_1 = require("./controller/NotificacaoController");
const error_1 = require("./middlewares/error");
const PeneiraController_1 = require("./controller/PeneiraController");
const routes = (0, express_1.Router)();
//CADASTRO / LOGIN
routes.post('/register', new UserController_1.UserController().create, error_1.errorMiddleware);
routes.post('/login', new UserController_1.UserController().login, error_1.errorMiddleware);
routes.post('/validation', new UserController_1.UserController().validationMobile, error_1.errorMiddleware);
// PERFIL
routes.get('/profile', authMiddleware_1.authMiddleware, new UserController_1.UserController().getProfile, error_1.errorMiddleware);
routes.get('/profile/:id', new UserController_1.UserController().getProfileById, error_1.errorMiddleware);
routes.put('/profile', authMiddleware_1.authMiddleware, new UserController_1.UserController().updateProfile, error_1.errorMiddleware);
// JOGADOR
routes.get('/player', new UserController_1.UserController().getPlayers);
routes.post('/player', authMiddleware_1.authMiddleware, new UserController_1.UserController().createPlayer, error_1.errorMiddleware);
routes.put('/player', authMiddleware_1.authMiddleware, new UserController_1.UserController().updatePlayer, error_1.errorMiddleware);
routes.put('/player/leave', authMiddleware_1.authMiddleware, new UserController_1.UserController().updatePlayerLeave, error_1.errorMiddleware);
routes.delete('/player', authMiddleware_1.authMiddleware, new UserController_1.UserController().deletePlayer, error_1.errorMiddleware);
// ORGANIZADOR
routes.post('/organizer', authMiddleware_1.authMiddleware, new UserController_1.UserController().createorganizer, error_1.errorMiddleware);
routes.put('/organizer', authMiddleware_1.authMiddleware, new UserController_1.UserController().updateOrganizer, error_1.errorMiddleware);
routes.delete('/organizer', authMiddleware_1.authMiddleware, new UserController_1.UserController().deleteOrganizer);
// TIME
routes.get('/team', new TimeController_1.TimeController().getTimeFilter, error_1.errorMiddleware);
routes.get('/team/myteams', authMiddleware_1.authMiddleware, new TimeController_1.TimeController().getTime, error_1.errorMiddleware);
routes.get('/team/:id', new TimeController_1.TimeController().getTimeFilter, error_1.errorMiddleware);
routes.get('/team/org/:id', new TimeController_1.TimeController().getTimeFilterOrg, error_1.errorMiddleware);
routes.post('/team', authMiddleware_1.authMiddleware, new TimeController_1.TimeController().createTime, error_1.errorMiddleware);
routes.put('/team/:id', authMiddleware_1.authMiddleware, new TimeController_1.TimeController().updateTime, error_1.errorMiddleware);
routes.delete('/team/:id', authMiddleware_1.authMiddleware, new TimeController_1.TimeController().deleteTime, error_1.errorMiddleware);
routes.put('/team/:time/:jogador', authMiddleware_1.authMiddleware, new TimeController_1.TimeController().insertJogador, error_1.errorMiddleware);
routes.delete('/team/:time/:jogador', authMiddleware_1.authMiddleware, new TimeController_1.TimeController().deleteJogador, error_1.errorMiddleware);
// POSTAGEM 
routes.get('/post/mypost', authMiddleware_1.authMiddleware, new PostagemController_1.PostagemController().getPostToken, error_1.errorMiddleware);
routes.get('/post/:tipo', new PostagemController_1.PostagemController().getpostPlayer, error_1.errorMiddleware);
routes.post('/post', authMiddleware_1.authMiddleware, new PostagemController_1.PostagemController().createpost, error_1.errorMiddleware);
routes.put('/post', authMiddleware_1.authMiddleware, new PostagemController_1.PostagemController().updatepost, error_1.errorMiddleware);
routes.delete('/post', authMiddleware_1.authMiddleware, new PostagemController_1.PostagemController().deletePost);
// PROPOSTAS
routes.get('/offer', authMiddleware_1.authMiddleware, new PropostaController_1.PropostaController().verPropostas, error_1.errorMiddleware);
routes.post('/offer/:time/:jogador', authMiddleware_1.authMiddleware, new PropostaController_1.PropostaController().enviarProposta, error_1.errorMiddleware);
routes.delete('/offer/:time/:aceitar', authMiddleware_1.authMiddleware, new PropostaController_1.PropostaController().responderProposta, error_1.errorMiddleware);
// NOTIFICACAO
routes.get('/notification', authMiddleware_1.authMiddleware, new NotificacaoController_1.NotificacaoController().getNotificacao, error_1.errorMiddleware);
routes.delete('/notification/:id', authMiddleware_1.authMiddleware, new NotificacaoController_1.NotificacaoController().deleteNotificacao, error_1.errorMiddleware);
//PENEIRA
routes.post('/sieve/:jogador/:time', authMiddleware_1.authMiddleware, new PeneiraController_1.PeneiraController().postPeneira);
routes.get('/sieve', authMiddleware_1.authMiddleware, new PeneiraController_1.PeneiraController().getPeneira);
routes.put('/sieve', authMiddleware_1.authMiddleware, new PeneiraController_1.PeneiraController().putPeneira);
routes.delete('/sieve', authMiddleware_1.authMiddleware, new PeneiraController_1.PeneiraController().deletePeneira);
exports.default = routes;

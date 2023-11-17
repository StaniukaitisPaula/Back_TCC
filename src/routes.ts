import { Router } from 'express'
import { UserController } from './controller/UserController'
import { TimeController } from './controller/TimeController'
import { PostagemController } from './controller/PostagemController';
import { authMiddleware } from './middlewares/authMiddleware'
import { PropostaController } from './controller/PropostaController';
import { notificacaoRepository } from './repositories/UserRepository';
import { NotificacaoController } from './controller/NotificacaoController';
import { errorMiddleware } from './middlewares/error';
import { PeneiraController } from './controller/PeneiraController';

const routes = Router()

//CADASTRO / LOGIN
routes.post('/register', new UserController().create,errorMiddleware)
routes.post('/login', new UserController().login,errorMiddleware)
routes.post('/validation', new UserController().validationMobile,errorMiddleware)


// PERFIL
routes.get('/profile',authMiddleware, new UserController().getProfile,errorMiddleware)
routes.get('/profile/:id', new UserController().getProfileById,errorMiddleware)
routes.put('/profile',authMiddleware, new UserController().updateProfile,errorMiddleware)

// JOGADOR
routes.get('/player', new UserController().getPlayers,errorMiddleware)
routes.post('/player',authMiddleware, new UserController().createPlayer,errorMiddleware)
routes.put('/player',authMiddleware, new UserController().updatePlayer,errorMiddleware)
routes.put('/player/leave',authMiddleware, new UserController().updatePlayerLeave,errorMiddleware)
routes.delete('/player',authMiddleware, new UserController().deletePlayer,errorMiddleware)

// TIME
routes.get('/team', new TimeController().getTimeFilter,errorMiddleware)
routes.get('/team/myteams',authMiddleware, new TimeController().getTime,errorMiddleware)
routes.get('/team/:id', new TimeController().getTimeFilter,errorMiddleware)
routes.get('/team/user/:id', new TimeController().getTimeFilterUser,errorMiddleware)
routes.post('/team',authMiddleware, new TimeController().createTime)
routes.put('/team/:id',authMiddleware, new TimeController().updateTime,errorMiddleware)
routes.delete('/team/:id',authMiddleware, new TimeController().deleteTime,errorMiddleware)
routes.put('/team/:time/:jogador',authMiddleware, new TimeController().insertJogador,errorMiddleware)
routes.delete('/team/:time/:jogador',authMiddleware, new TimeController().deleteJogador,errorMiddleware)


// POSTAGEM 
routes.get('/post/mypost',authMiddleware, new PostagemController().getPostToken,errorMiddleware)
routes.get('/post/:tipo', new PostagemController().getpostPlayer,errorMiddleware)
routes.post('/post',authMiddleware, new PostagemController().createpost,errorMiddleware)
routes.put('/post',authMiddleware, new PostagemController().updatepost,errorMiddleware)
routes.delete('/post',authMiddleware, new PostagemController().deletePost)


// PROPOSTAS
routes.get('/offer', authMiddleware, new PropostaController().verPropostas)
routes.post('/offer/:time/:jogador',authMiddleware, new PropostaController().enviarProposta)
routes.delete('/offer/:time/:aceitar',authMiddleware, new PropostaController().responderProposta)


// NOTIFICACAO
routes.get('/notification', authMiddleware, new NotificacaoController().getNotificacao,errorMiddleware)
routes.delete('/notification/:id',authMiddleware, new NotificacaoController().deleteNotificacao,errorMiddleware)


//PENEIRA
routes.post('/sieve/:jogador/:time',authMiddleware, new PeneiraController().postPeneira)
routes.get('/sieve',authMiddleware, new PeneiraController().getPeneira)
routes.put('/sieve',authMiddleware, new PeneiraController().putPeneira)
routes.delete('/sieve',authMiddleware, new PeneiraController().deletePeneira)

export default routes

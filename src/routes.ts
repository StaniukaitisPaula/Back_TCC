import { Router } from 'express'
import { UserController } from './controller/UserController'
import { TimeController } from './controller/TimeController'
import { PostagemController } from './controller/PostagemController';
import { authMiddleware } from './middlewares/authMiddleware'
import { PropostaController } from './controller/PropostaController';
import { NotificacaoController } from './controller/NotificacaoController';
import { errorMiddleware } from './middlewares/error';
import { PeneiraController } from './controller/PeneiraController';
import { HighlightController } from './controller/HighlightController';
import { RedeSocialController } from './controller/RedeSocialController';

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
routes.post('/player',authMiddleware, new UserController().createPlayer)
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
routes.get('/post/:time', new PostagemController().getPostTime,errorMiddleware)
routes.get('/post/:tipo', new PostagemController().getpostPlayer,errorMiddleware)
routes.post('/post',authMiddleware, new PostagemController().createpost,errorMiddleware)
routes.put('/post',authMiddleware, new PostagemController().updatepost,errorMiddleware)
routes.delete('/post/:time',authMiddleware, new PostagemController().deletePost,errorMiddleware)


// PROPOSTAS
routes.get('/offer', authMiddleware, new PropostaController().verPropostas,errorMiddleware)
routes.post('/offer/:time/:jogador',authMiddleware, new PropostaController().enviarProposta,errorMiddleware)
routes.delete('/offer/:time/:aceitar',authMiddleware, new PropostaController().responderProposta,errorMiddleware)


// NOTIFICACAO
routes.get('/notification', authMiddleware, new NotificacaoController().getNotificacao,errorMiddleware)
routes.delete('/notification/:id',authMiddleware, new NotificacaoController().deleteNotificacao,errorMiddleware)


//PENEIRA
routes.get('/sieve/:time',authMiddleware, new PeneiraController().getPeneira,errorMiddleware)
routes.put('/sieve/:time',authMiddleware, new PeneiraController().putPeneira,errorMiddleware)
routes.delete('/sieve/:time/:jogador',authMiddleware, new PeneiraController().deletePeneira,errorMiddleware)


//HIGHLIGHT
routes.post('/highlight',authMiddleware, new HighlightController().postHighlight,errorMiddleware )
routes.get('/highlight',authMiddleware, new HighlightController().getHighlight,errorMiddleware  )
routes.put('/highlight',authMiddleware, new HighlightController().putHighlight,errorMiddleware )
routes.delete('/highlight/:id',authMiddleware,new HighlightController().deleteHighlight,errorMiddleware)

//REDESOCIAL
routes.post('/network',authMiddleware, new RedeSocialController().postRedeSocial,errorMiddleware )
routes.get('/network',authMiddleware, new RedeSocialController().getRedeSocial,errorMiddleware  )
routes.put('/network',authMiddleware, new RedeSocialController().putRedeSocial,errorMiddleware )
routes.delete('/network/:id',authMiddleware,new RedeSocialController().deleteRedeSocial,errorMiddleware)

export default routes

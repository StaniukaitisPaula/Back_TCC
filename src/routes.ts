import { Router } from 'express'
import { UserController } from './controller/UserController'
import { TimeController } from './controller/TimeController'
import { PostagemController } from './controller/PostagemController';
import { authMiddleware } from './middlewares/authMiddleware'
import { PropostaController } from './controller/PropostaController';

const routes = Router()

//CADASTRO / LOGIN
routes.post('/register', new UserController().create)
routes.post('/login', new UserController().login)
routes.post('/validation', new UserController().validationMobile)


// PERFIL
routes.get('/profile',authMiddleware, new UserController().getProfile)
routes.get('/profile/:id', new UserController().getProfileById)
routes.put('/profile',authMiddleware, new UserController().updateProfile)

// JOGADOR
routes.get('/player', new UserController().getPlayers)
routes.post('/player',authMiddleware, new UserController().createPlayer)
routes.put('/player',authMiddleware, new UserController().updatePlayer)

// ORGANIZADOR
routes.post('/organizer',authMiddleware, new UserController().createorganizer)
routes.put('/organizer',authMiddleware, new UserController().updateOrganizer)
routes.delete('/organizer',authMiddleware, new UserController().deleteOrganizer)

// TIME
routes.get('/team', new TimeController().getTimeFilter)
routes.get('/team/myteams',authMiddleware, new TimeController().getTime)
routes.get('/team/:id', new TimeController().getTimeFilter)
routes.get('/team/org/:id', new TimeController().getTimeFilterOrg)
routes.post('/team',authMiddleware, new TimeController().createTime)
routes.put('/team/:id',authMiddleware, new TimeController().updateTime)
routes.delete('/team/:id',authMiddleware, new TimeController().deleteTime)
routes.put('/team/:time/:jogador',authMiddleware, new TimeController().insertJogador)
routes.delete('/team/:time/:jogador',authMiddleware, new TimeController().deleteJogador)


// POSTAGEM 
routes.get('/post', new PostagemController().getpostPlayer)
routes.get('/post/mypost',authMiddleware, new PostagemController().getPostToken)
routes.post('/post',authMiddleware, new PostagemController().createpost)
routes.put('/post/:id',authMiddleware, new PostagemController().updatepost)
routes.delete('/post/:id',authMiddleware, new PostagemController().deletePpost)


// PROPOSTAS
routes.get('/offer', authMiddleware, new PropostaController().verPropostas)
routes.post('/offer/:time/:jogador',authMiddleware, new PropostaController().enviarProposta)
routes.delete('/offer/:time/:id',authMiddleware, new PropostaController().responderProposta)


// VAGAS




export default routes

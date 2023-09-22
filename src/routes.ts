import { Router } from 'express'
import { UserController } from './controller/UserController'
import { authMiddleware } from './middlewares/authMiddleware'
import cors from 'cors'

const routes = Router()


routes.post('/user',cors(), new UserController().create)
routes.post('/login',cors(), new UserController().login)

routes.get('/profile',authMiddleware,cors(), new UserController().getProfile)


export default routes

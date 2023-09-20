import { Router } from 'express'
import { UserController } from './controller/UserController'

const routes = Router()

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)


export default routes

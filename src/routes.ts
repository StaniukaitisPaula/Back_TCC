import { Router } from 'express'
import { UserController } from './controller/UserController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()


routes.post('/register', new UserController().create)
routes.post('/login', new UserController().login)
// routes.post('/validation', new UserController().validationMobile)
routes.get('/profile',authMiddleware, new UserController().getProfile)
// routes.get('/profile/:id', new UserController().getProfileById)
// routes.put('/update', new UserController())

export default routes

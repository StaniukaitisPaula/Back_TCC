import { Router } from 'express'
import { UserController } from './controller/UserController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

//POST
routes.post('/register', new UserController().create)
routes.post('/login', new UserController().login)
routes.post('/validation', new UserController().validationMobile)
routes.post('/createPlayer',authMiddleware, new UserController().createPlayer)

//GET
routes.get('/profile',authMiddleware, new UserController().getProfile)
routes.get('/profile/:id', new UserController().getProfileById)

//PUT
routes.put('/update',authMiddleware, new UserController().updateProfile)

export default routes

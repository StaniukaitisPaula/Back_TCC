import { Router } from 'express'
import { UserController } from './controller/UserController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

//POST
routes.post('/register', new UserController().create)
routes.post('/login', new UserController().login)
routes.post('/validation', new UserController().validationMobile)
routes.post('/createPlayer',authMiddleware, new UserController().createPlayer)
routes.post('/createOrganizer',authMiddleware, new UserController().createorganizer)

//GET
routes.get('/profile',authMiddleware, new UserController().getProfile)
routes.get('/profile/:id', new UserController().getProfileById)

//PUT
routes.put('/update',authMiddleware, new UserController().updateProfile)
routes.put('/updatePlayer',authMiddleware, new UserController().updatePlayer)

export default routes

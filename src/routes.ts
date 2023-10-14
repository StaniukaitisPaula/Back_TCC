import { Router } from 'express'
import { UserController } from './controller/UserController'
import { TimeController } from './controller/TimeController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

//POST
routes.post('/register', new UserController().create)
routes.post('/login', new UserController().login)
routes.post('/validation', new UserController().validationMobile)
routes.post('/createPlayer',authMiddleware, new UserController().createPlayer)
routes.post('/createOrganizer',authMiddleware, new UserController().createorganizer)
//POST TIME
routes.post('/createTime',authMiddleware, new TimeController().createTime)


//GET
routes.get('/profile',authMiddleware, new UserController().getProfile)
routes.get('/profile/:id', new UserController().getProfileById)
//GET TIME
routes.get('/time',authMiddleware, new TimeController().getTime)

//PUT
routes.put('/update',authMiddleware, new UserController().updateProfile)
routes.put('/updatePlayer',authMiddleware, new UserController().updatePlayer)
routes.put('/updateOrganizer',authMiddleware, new UserController().updateOrganizer)
//PUT TIME
routes.put('/updateTime',authMiddleware, new TimeController().updateTime)

export default routes

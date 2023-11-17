import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'
import cors from 'cors'

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())
	
	app.use(errorMiddleware)
	
	app.use((req : Request, res: Response, next: NextFunction) => {
		
		res.header('Access-Control-Allow-Origin','*')
		res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')

		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
		
		app.use(cors())
		
		next()
	})
	app.use(routes)
	
	return app.listen(3000, () => {
		console.log("online");
	})
})

import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'
import cors from 'cors'
import { option } from './middlewares/options'

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

	app.use(routes)

	app.use(errorMiddleware)

	app.use(option)

	app.use(cors())

	return app.listen(process.env.PORT, () => {
		console.log("online");
	})
})

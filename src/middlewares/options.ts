import { NextFunction, Request, Response } from "express"

export const option = (req : Request, res: Response, next: NextFunction) => {

    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')

    next()
}
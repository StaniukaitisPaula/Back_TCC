import { Request, Response, NextFunction } from "express"
import { UnauthorizedError } from "../helpers/api-erros"
import  jwt  from "jsonwebtoken"
import { userRepository, jogadorRepository } from '../repositories/UserRepository';

type JwtPayload ={
  id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if(!authorization){
    throw new UnauthorizedError('Não autorizado')
  }
  
  const token = authorization.split(' ')[1]

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload

  const user = await userRepository.findOne({ where: {id: id}, relations: { propostas: { de: true }} })
  if(!user){
    throw new UnauthorizedError('Não autorizado')
  }
  
  const player = await jogadorRepository.findOneBy({ perfil_id: user })

  if(player){
    req.player = player
  }

  const {senha:_, ...loggedUser} = user

  req.user = loggedUser


  next()
}

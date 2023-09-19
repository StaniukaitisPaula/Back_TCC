import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { jogadorRepository , organizadorRepository, userRepository } from "../repositories/UserRepository"
import bcrypt from 'bcrypt'

export class UserController {
  async create(req: Request, res: Response){
    const {nome_usuario, email, senha} = req.body

    const userEmailExists = await userRepository.findOneBy({email})
    const usernameExists = await userRepository.findOneBy({nome_usuario})

    if(userEmailExists){
      throw new BadRequestError('Email já cadastrado!')
    }
    if(usernameExists){
      throw new BadRequestError('Nome de usuario já cadastrado!')
    }

    const hashSenha = bcrypt.hash(senha, 10)

    


  }



}
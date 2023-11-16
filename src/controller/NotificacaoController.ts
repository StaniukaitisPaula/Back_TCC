import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, userRepository, postagemRepository, notificacaoRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil, Jogador, Postagem } from '../entities/User';

export class NotificacaoController{

//GET
async getNotificacao(req: Request, res: Response){

    const user = req.user

    const notificacoes = await notificacaoRepository.find({ relations: { de : true  }, where: { de: { id : user.id } } , select: { de: { id: false } }} )

    
    const response = { notifications: notificacoes }
    
    return res.json(response)

}

//DELETE
async deleteNotificacao(req: Request, res: Response){

    const idPost = req.params.id
  
    if(idPost){
      
      const post = await notificacaoRepository.delete(idPost)
  
    }else{
      throw new BadRequestError('!!!')
    }
  
  return res.json({
    response: true
  })
}


} 
import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository, postagemRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil, Jogador, Postagem } from '../entities/User';

export class NotificacaoController{

//GET
async getNotificacao(req: Request, res: Response){

    // const user = req.user

    // const notProfile = await postagemRepository.find({ relations: { dono_id : true  }, where: { dono_id: { id : user.id } } , select: { dono_id: { id: false } }} )

    
    // const response = { user: user, noyProfile: notProfile[0]? notProfile[0] : null  }
    
    // return res.json(response)

}

//POST
async createNotificacao(req: Request, res: Response){

    // const id = req.user
    // const {
    //     titulo,
    //     descricao,
    //     link,

     
    // } = req.body

    // if(
    //     titulo     == undefined || titulo     == "" ||
    //     descricao  == undefined || descricao  == "" ||
    //     link       == undefined 
 

    // ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')

    // const verifique = await postagemRepository.findOneBy({dono_id: id }) 

    // if(verifique)throw new BadRequestError('Postagem ja exsite!')
     

    // const newNotificacao = postagemRepository.create({

    //     titulo,
    //     descricao,
    //     link,
    //    dono_id: id,
    // })

    // // newPost.hora = (`${new Date().getHours()}:${new Date().getMinutes()}`)
    // // console.log(newPost);
    
    // await postagemRepository.save(newNotificacao)



    // return res.status(201).json(newNotificacao)
  
}


//DELETE
async deleteNotificacao(req: Request, res: Response){

//     const idPost = req.params.id
  
//     if(idPost){
      
//       const post = await postagemRepository.delete(idPost)
  
//     }else{
//       throw new BadRequestError('!!!')
//     }
  
//   return res.json({
//     response: true
//   })
}


} 
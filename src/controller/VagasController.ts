import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository, postagemRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil, Jogador } from '../entities/User';
import { Funcao } from '../entities/enum/Funcao';


export class VagasController {

// GET
async getpost(req: Request, res: Response) {
    const user = req.user

    const postProfile = await postagemRepository.find({ relations: { dono_id : true  }, where: { dono_id: { id : user.id } } , select: { dono_id: { id: false } }} )


    const response = { user: user, postProfile: postProfile[0]? postProfile[0] : null  }
    
    return res.json(response)

}

//POST
async createpost(req: Request, res: Response){

    const id = req.user
  
  
    const {
        descricao,
        jogo,
        funcao,
        elo,
        tipo
    } = req.body
  
    if(
        descricao  == undefined || descricao  == "" ||
        jogo       == undefined || jogo       == "" ||
        funcao     == undefined || funcao     == "" ||
        elo        == undefined || elo        == "" ||
        tipo       == undefined || tipo       == "" 

    ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')
  

    const newPost = postagemRepository.create({

        descricao,
        jogo,
        funcao,
        elo,
        tipo,
       dono_id: id,
    })
  
    await postagemRepository.save(newPost)
  

  
    return res.status(201).json(newPost)
  
  
  
}

//PUT
async updateProfile(req: Request, res: Response){

    const id = req.params.id
 
    const postagem = await postagemRepository.findOne({ relations: { dono_id: true  }, where: { dono_id: { id : req.org.id }, id: parseInt(id) } , select: { dono_id: { id: false } }})
    
    if(postagem){
 const {

      descricao,
        jogo,
        funcao,
        elo,
        tipo
    } = req.body

    

    let response = {
      id,
      descricao,
      jogo,
      funcao,
      elo,
      tipo
    }

    if(descricao){
      response.descricao = Boolean((await postagemRepository.update( { id: postagem.id }, { descricao: descricao})).affected)
    }
    
    if(jogo){
        response.jogo = Boolean((await postagemRepository.update( { id: postagem.id }, { jogo: jogo})).affected)
    }

    if(funcao){
        response.funcao = Boolean((await postagemRepository.update( { id: postagem.id }, { funcao: funcao})).affected)
    }

    if(elo){
        response.elo = Boolean((await postagemRepository.update( { id: postagem.id }, { elo: elo})).affected)
    }

    if(tipo){
        response.tipo = Boolean((await postagemRepository.update( { id: postagem.id }, { tipo: tipo})).affected)
    }


    }else{
        throw new BadRequestError('Id nao informado ou nao ha org!')
      }
   


    return res.json({
      response: response
    })
}
//DELETE





}

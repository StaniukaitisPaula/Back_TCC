import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, userRepository, peneiraRepository, notificacaoRepository, timeRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil, Jogador, Postagem } from '../entities/User';


export class PeneiraController{



    //POST
    async  postPeneira(req: Request, res: Response){
    
      const idTime = parseInt(req.params.time)
      const idJogador =  req.player
      const menssagem = req.body.menssage
          
    if(
        idTime     == undefined ||
        isNaN(idTime)           
    
    ) throw new BadRequestError('Faltam Informacoes!')
    
    const time = await timeRepository.findOne( {where: {id: idTime }, relations: { dono: true } })

    if(!time)throw new BadRequestError('Time não encontrado!')
  
    if(
      !idJogador
    ) throw new BadRequestError('Jogador não exite!')
    
    if(idJogador.time_atual)throw new BadRequestError('Jogador já tem time!')

    const timeVerifique = await peneiraRepository.findOneBy({time: { id: time.id } }) 
    if(timeVerifique)throw new BadRequestError('Esse Time não tem peneira ativa!')

    
    const peneira = await peneiraRepository.create({jogadores: time.jogadores , menssagem: menssagem ? menssagem : ""})
    
    const pen = await peneiraRepository.save(peneira)
    
    const noti = await notificacaoRepository.create({ de: idJogador.perfil_id, menssagem: 'Uma proposta foi enviada para o seu perfil!', titulo: 'Proposta recebida' })
    
    await notificacaoRepository.save(noti)

    
  
    res.json({
      acepted: true
    })
    

        
    }
    ///GET
    async  getPeneira(req: Request, res: Response){
    
    
    
    }
    
    //PUT
    async  putPeneira(req: Request, res: Response){
    
    
        
    }
    
    //DELETE
    async  deletePeneira(req: Request, res: Response){
    
    
        
    }
    
    
    
    
    
    }
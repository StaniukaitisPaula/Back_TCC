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
      const idJogador = parseInt(req.params.jogador)
      const menssagem = req.body.menssage
    
    if(
        idTime     == undefined ||
        idJogador  == undefined ||
        isNaN(idTime)           || isNaN(idJogador)
    
    ) throw new BadRequestError('Faltam Informacoes!')
    
    const time = await timeRepository.findOne( {where: {id: idTime }, relations: { dono: true } })
    
    if(
      !time || time.dono.id != req.user.id
    ) throw new BadRequestError('Esse time não exite ou não pertece a esse perfil!')
    
    const jogador = await jogadorRepository.findOne( {where: {perfil_id: { id: idJogador } }, relations: { perfil_id: true , time_atual: true } })
    
    
    if(
      !jogador
    ) throw new BadRequestError('Jogador não exite!')
    
    if(jogador.time_atual)throw new BadRequestError('Jogador já tem time!')
    
    const verifique = await peneiraRepository.findOneBy({jogadores: jogador.perfil_id, time: time}) 
    
    if(verifique)throw new BadRequestError('Proposta ja enviada!')
    
    const peneira = await peneiraRepository.create({jogadores: time.jogadores , menssagem: menssagem ? menssagem : ""})
    
    const pen = await peneiraRepository.save(peneira)
    
    const noti = await notificacaoRepository.create({ de: jogador.perfil_id, menssagem: 'Uma proposta foi enviada para o seu perfil!', titulo: 'Proposta recebida' })
    
    await notificacaoRepository.save(noti)
    
    
    

        
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
import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository,timeRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import crypto     from 'crypto';
import { resolve } from "path";
import { Organizacao, Perfil } from '../entities/User';
import { Blob } from "buffer";
import { DataSource } from 'typeorm';
import { Genero } from '../entities/enum/Genero';



export class TimeController {

    async createTime(req: Request, res: Response){
        const user = req.user
  
        const {
          nome_time,
          biografia,
          // jogadores,
          // jogadores_ativos
        } = req.body

   
  
  
  if(
    nome_time        == undefined || nome_time        == "" ||
    biografia        == undefined || biografia        == "" 
    // jogadores        == undefined || jogadores        == "" || 
    // jogadores_ativos == undefined || jogadores_ativos == "" 

  ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')


  const nametimeExists = await timeRepository.findOneBy({nome_time})
  const organizacao  = await organizadorRepository.findOneBy({dono_id: user})

  if(nametimeExists){
    throw new BadRequestError('Nome de Time ja cadastrado!')
  }
  if(!organizacao){
    throw new BadRequestError('Organização não cadastrada!')
  }

  

  const newTime = timeRepository.create({
    organizacao,
    nome_time,
    biografia,
  })

  await timeRepository.save(newTime)

  return res.status(201).json(newTime)



}
    }

  


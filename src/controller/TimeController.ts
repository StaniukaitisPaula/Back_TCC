import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository,timeRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil } from '../entities/User';
import { Blob } from "buffer";
import { DataSource } from 'typeorm';
import { Genero } from '../entities/enum/Genero';



export class TimeController {

    async createTime(req: Request, res: Response){
  
        const {
          organizacao,
          nome_time,
          biografia,
          // jogadores,
          // jogadores_ativos
        } = req.body

   
  
  
  if(
    organizacao      == undefined || organizacao      == "" ||
    nome_time        == undefined || nome_time        == "" ||
    biografia        == undefined || biografia        == "" 
    // jogadores        == undefined || jogadores        == "" || 
    // jogadores_ativos == undefined || jogadores_ativos == "" 

  ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')


  const nametimeExists = await timeRepository.findOneBy({nome_time})

  if(nametimeExists){
    throw new BadRequestError('Nome de Time ja cadastrado!')
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

  


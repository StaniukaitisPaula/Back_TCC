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


//GET
async getTime(req: Request, res: Response) {
  const user = req.user

  const team = await timeRepository.find({ relations: { organizacao : true  }, where: { organizacao: { id : user.id } } , select: { organizacao: { id: false } }} )
 
console.log(team);




  const response = { user: user, time: team[0]? team[0] : false }
  
  
  return res.json(response)


}  

//POST TIME  
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

//UPDATE TIME
async updateTime(req: Request, res: Response){

  const user = req.user

  const time = await organizadorRepository.find({ relations: { dono_id : true  }, where: { dono_id: { id : user.id } } , select: { dono_id: { id: false } }} )

  const {
    nome_time,
    biografia,
  } = req.body
  console.log(nome_time);
  

  let response = {
    nome_time,
    biografia,
  }

if(nome_time){
    response.nome_time = Boolean((await timeRepository.update( { id: time[0].id}, { nome_time: nome_time})).affected)  
}

if(biografia){
    response.biografia = Boolean((await timeRepository.update( { id: time[0].id }, { biografia: biografia})).affected)  
}



return res.json({
  response: response
})

  
}


    }

  


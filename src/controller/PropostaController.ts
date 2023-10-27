import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository, timeRepository, propostaRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import crypto     from 'crypto';
import { resolve } from "path";
import { Organizacao, Perfil, Time, Jogador, Proposta } from '../entities/User';
import { Blob } from "buffer";
import { DataSource } from 'typeorm';
import { Genero } from '../entities/enum/Genero';
import { isStringObject } from "util/types";
import { time } from 'console';




export class PropostaController{

async enviarProposta(req: Request, res: Response){
        const idTime = parseInt(req.params.time)
        const idJogador = parseInt(req.params.jogador)
        const menssagem = req.body.menssage
      
      if(
          idTime     == undefined ||
          idJogador  == undefined ||
          isNaN(idTime)           || isNaN(idJogador)
      
      ) throw new BadRequestError('Faltam Informacoes!')
      
      const time = await timeRepository.findOne( {where: {id: idTime }, relations: { organizacao: true } })
      
      if(
        !time || time.organizacao.id != req.org.id
      ) throw new BadRequestError('Esse time não exite ou não pertece a essa organização!')
      
      const jogador = await jogadorRepository.findOne( {where: {perfil_id: { id: idJogador } }, relations: { perfil_id: true , time_atual: true } })
      
      console.log(jogador);
      
      
      if(
        !jogador
      ) throw new BadRequestError('Jogador não exite!')
      
      if(jogador.time_atual)throw new BadRequestError('Jogador já tem time!')

     const verifique = await propostaRepository.findOneBy({de: time, para: jogador.perfil_id}) 

     if(verifique)throw new BadRequestError('Proposta ja enviada!')
      
      const proposta = await propostaRepository.create({ de: time, para: jogador.perfil_id , menssagem: menssagem ? menssagem : ""})

      const oila = await propostaRepository.save(proposta)
      console.log(oila);
      
      
      res.json({
        proposta: oila
      })
      
      
}



async verPropostas(req: Request, res: Response){


    console.log(req.user);
    
    res.json({
      propostas: req.user.propostas
    })
    
}
    
async responderProposta(req: Request, res: Response){
    const idTime = parseInt(req.params.time)
    const idJogador = req.user.id
    const aceitar = Boolean(req.params.aceitar)
  
  if(
      idTime     == undefined ||
      idJogador  == undefined ||
      isNaN(idTime)           || isNaN(idJogador)
  
  ) throw new BadRequestError('Faltam Informacoes!')
  
  const time = await timeRepository.findOne( {where: {id: idTime }, relations: { organizacao: true } })
  
  
  if(
    !time
  ) throw new BadRequestError('Esse time não exite ou não pertece a essa organização!')
  
  const jogador = await jogadorRepository.findOne( {where: {perfil_id: { id: idJogador } }, relations: { perfil_id: true , time_atual: true } })
  
  console.log(jogador);
  
  
  if(
    !jogador
  ) throw new BadRequestError('Jogador não exite!')
  
  if(jogador.time_atual)throw new BadRequestError('Jogador já tem time!')

  const proposta = await propostaRepository.findOne({where: { de: time, para: jogador.perfil_id }})

        console.log(aceitar);

  if(aceitar == true && proposta){
    console.log("oi");
    
    let jogadores = time.jogadores

    jogadores ? jogadores.push(jogador) : jogadores = [jogador]
    
    if(jogadores.length > 10) throw new BadRequestError('Time atigil o limite de jogadores')
    
    time.jogadores = jogadores
    
    await timeRepository.save(time)

    await propostaRepository.delete(proposta)

  }else if(proposta){
    await propostaRepository.delete(proposta)
  }
  
  res.json({
    acepted: true
  })
  
  
}    


}

import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, userRepository, peneiraRepository, notificacaoRepository, timeRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil, Jogador, Postagem, Peneira } from '../entities/User';
import { time } from "console";


export class PeneiraController{

///GET
async  getPeneira(req: Request, res: Response){

  const idTime = parseInt( req.params.time )

 
  let peneiraResponse = [new Peneira]


  peneiraResponse = await peneiraRepository.find({relations: { time: true, jogadores: { perfil_id: true } }, where: {time: {id: idTime}} })


  res.json({
    acepted: peneiraResponse
  })
    
}

    
//PUT
 async  putPeneira(req: Request, res: Response){
    
      const idTime = parseInt(req.params.time)
      const idJogador =  req.user
      
          
    if(
        idTime     == undefined ||
        isNaN(idTime)           
    
    ) throw new BadRequestError('Faltam Informacoes!')
    
    const time = await timeRepository.findOne( {where: {id: idTime }, relations: { dono: true } })

    if(!time)throw new BadRequestError('Time não encontrado!')

    const jogador = await jogadorRepository.findOne( {where: {perfil_id: { id: idJogador.id } }, relations: { perfil_id: true , time_atual: true } })
  
    if(
      !idJogador || !jogador
    ) throw new BadRequestError('Jogador não exite!')
    
    if(jogador.time_atual)throw new BadRequestError('Jogador já tem time!')

    const timeVerifique = await peneiraRepository.findOne({ where: {time: { id: time.id } }, relations: {jogadores: true}}) 
    if(!timeVerifique)throw new BadRequestError('Esse Time não tem peneira ativa!')

    let jogadores = timeVerifique.jogadores

    jogadores ? jogadores.push(jogador) : jogadores = [jogador]
      
    
    
    timeVerifique.jogadores = jogadores
    
   const a = await peneiraRepository.save(timeVerifique)

  
    res.json({
      acepted: a
    })
    

        
  }



//DELETE
async  deletePeneira(req: Request, res: Response){
  const idTime = parseInt(req.params.time)
  const idJogador = parseInt(req.params.jogador)
  let aceitar: string =  req.query.aceitar as string

if(
    idTime     == undefined ||
    idJogador  == undefined 
  
  ) throw new BadRequestError('Faltam Informacoes!')

const time = await timeRepository.findOne( {where: {id: idTime }, relations: { dono: true } })


if(
  !time
) throw new BadRequestError('Esse time não exite ou não pertece a essa organização!')

const jogador = await jogadorRepository.findOne( {where: { id: idJogador } , relations: { perfil_id: true , time_atual: true } })

console.log(jogador);


if(
  !jogador
) throw new BadRequestError('Jogador não exite!')

if(jogador.time_atual)throw new BadRequestError('Jogador já tem time!')

const peneira = await peneiraRepository.findOne({ where:{ time: {id: idTime}}, relations: { time: true , jogadores: true}  })

console.log(aceitar);

if(aceitar == '1' && peneira){
  console.log("oi");
  
  let jogadores = time.jogadores

  jogadores ? jogadores.push(jogador) : jogadores = [jogador]
  
  if(jogadores.length > 10) throw new BadRequestError('Time atigil o limite de jogadores') 
  
  time.jogadores = jogadores
  
  await timeRepository.save(time)

  const noti = await notificacaoRepository.create({ de: jogador.perfil_id, menssagem: ' Você foi aceito(a) no time' + time.nome_time, titulo: 'Proposta aceita' })

  await notificacaoRepository.save(noti)

}else if(peneira){
  const noti = await notificacaoRepository.create({ de: jogador.perfil_id , menssagem: ' Você não foi aceito(a) no time' + time.nome_time, titulo: 'Proposta recusada' })

  await notificacaoRepository.save(noti)
}

res.json({
  acepted: true
})

    
        
}
    
    
    
    
    
    }
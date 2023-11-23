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

  const idTime = req.params.time 

 
  let peneiraResponse = [new Peneira]


  peneiraResponse = await peneiraRepository.find({ where:{ time: {id: parseInt(idTime)}}, relations: { time: true , jogadores: true}   }) 


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

    const timeVerifique = await peneiraRepository.findOneBy({time: { id: time.id } }) 
    if(!timeVerifique)throw new BadRequestError('Esse Time não tem peneira ativa!')


    let jogadores = timeVerifique.jogadores
    

    jogadores ? jogadores.push(jogador) : jogadores = [jogador]

    timeVerifique.jogadores = jogadores
    console.log(timeVerifique);
    

   const a = await peneiraRepository.save(timeVerifique)

  
    res.json({
      acepted: true
    })
    

        
  }



//DELETE
async responderPeneira(req: Request, res: Response){
  const idTime = parseInt(req.params.time)
  const idJogador = req.user.id
  const aceitar = req.params.aceitar

if(
    idTime     == undefined ||
    idJogador  == undefined ||
    isNaN(idTime)           || isNaN(idJogador)

) throw new BadRequestError('Faltam Informacoes!')

const time = await timeRepository.findOne( {where: {id: idTime }, relations: { dono: true } })


if(
  !time
) throw new BadRequestError('Esse time não exite ou não pertece a esse usuario!')

const jogador = await jogadorRepository.findOne( {where: {perfil_id: { id: idJogador } }, relations: { perfil_id: true , time_atual: true } })


if(
  !jogador
) throw new BadRequestError('Jogador não exite!')

if(jogador.time_atual)throw new BadRequestError('Jogador já tem time!')

const peneira = await peneiraRepository.findOne({where: { time: time, jogadores: jogador.perfil_id }})

console.log(aceitar);

if(aceitar == '1' && peneira){
  console.log("oi");
  
  let jogadores = time.jogadores

  jogadores ? jogadores.push(jogador) : jogadores = [jogador]
  
  if(jogadores.length > 10) throw new BadRequestError('Time atigil o limite de jogadores')
  
  time.jogadores = jogadores
  
  await timeRepository.save(time)

  await peneiraRepository.delete(peneira)
  const noti = await notificacaoRepository.create({ de: time.dono, menssagem: 'teste da peneira ' + jogador.nickname +'foi aceita!', titulo: 'Proposta aceita' })

  await notificacaoRepository.save(noti)

}else if(peneira){
  await peneiraRepository.delete(peneira)
  const noti = await notificacaoRepository.create({ de: time.dono , menssagem: 'teste de peneira ' + jogador.nickname +'foi recusada!', titulo: 'Proposta recusada' })

  await notificacaoRepository.save(noti)
}

res.json({
  acepted: true
})


}    
  
    
    
    
    }
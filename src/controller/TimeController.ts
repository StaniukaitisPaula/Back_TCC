import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository,timeRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import crypto     from 'crypto';
import { resolve } from "path";
import { Organizacao, Perfil, Time } from '../entities/User';
import { Blob } from "buffer";
import { DataSource } from 'typeorm';
import { Genero } from '../entities/enum/Genero';



export class TimeController {


//GET
async getTime(req: Request, res: Response) {
  const user = req.user
  let team = [new Time]

  if(req.org){
    let teamResponse = await timeRepository.findBy({ organizacao: req.org }) 
    if(teamResponse){
      team = teamResponse
    }else{
      throw new BadRequestError('Usuario sem organização')
    }
  }else{
    throw new BadRequestError('Usuario sem organização')
  }
 
  console.log(team);




  const response = { user: user, time: team[0]? team : false }
  
  
  return res.json(response)


}

async getTimeFilter(req: Request, res: Response) {

  let teamResponse = await timeRepository.find({ relations: { organizacao: {  dono_id: true  } } }) 
  let teamfilter = [new Time]
  

  if(req.params.name && req.params.name != ""){
    teamfilter = teamResponse.filter( (x) => {  if (x.nome_time.startsWith(req.params.name)) return x  })
    teamResponse = teamfilter

  }
  if(req.params.id){
    teamfilter = teamResponse.filter( (x) => {  if (x.id == parseInt( req.params.id )) return x  })
    console.log(teamfilter);
    
    teamResponse = teamfilter
  }

  const response = { teams: teamResponse }
  
  return res.json(response)
}  

async getTimeFilterOrg(req: Request, res: Response) {

  let org = new Organizacao

  if(req.params.id){
    let orgResponse = await organizadorRepository.findOneBy({ id: parseInt(req.params.id) })
    if(orgResponse){
        org = orgResponse
    }
    
  }
  

  let teamResponse = await timeRepository.find( { where: { organizacao: org },  relations: { organizacao:  true  } } ) 

  const response = { teams: teamResponse }
  
  return res.json(response)
}  

//POST TIME  
async createTime(req: Request, res: Response){
        const user = req.user
  
        const {
          nome_time,
          biografia,
          jogo,
          // jogadores,
          // jogadores_ativos
        } = req.body

   
  
  
  if(
    nome_time        == undefined || nome_time        == "" ||
    biografia        == undefined || biografia        == "" ||
    jogo             == undefined || jogo             == "" 
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
    jogo
  })

  await timeRepository.save(newTime)

  return res.status(201).json(newTime)



}

//UPDATE TIME
// async updateTime(req: Request, res: Response){

//   const id = req.params.id

//   const time = await organizadorRepository.findOneBy({{id: parseInt(id)} } )
//   const time = await organizadorRepository.findOneBy({ relations: { dono_id : true  }, where: { dono_id: { id : id.id } } , select: { dono_id: { id: false } }}
//   const {
//     nome_time,
//     biografia,
//   } = req.body
//   console.log(nome_time);
  

//   let response = {
//     nome_time,
//     biografia,
//   }

// if(nome_time){
//     response.nome_time = Boolean((await timeRepository.update( { id: time[0].id}, { nome_time: nome_time})).affected)  
// }

// if(biografia){
//     response.biografia = Boolean((await timeRepository.update( { id: time[0].id }, { biografia: biografia})).affected)  
// }



// return res.json({
//   response: response
// })

  
// }

async deleteTime(req: Request, res: Response){
  const org = req.org
  const id = req.params.id

  // console.log(org);
  // console.log(id)
  

if(id == null || org == undefined)  throw new BadRequestError('Id nao informado ou nao ha org!')

const time = await timeRepository.findOneBy({ id: parseInt(id), organizacao: org })

if(time){
  timeRepository.delete(time)
}


return res.json({
  deleted: true
} )



}

}

  


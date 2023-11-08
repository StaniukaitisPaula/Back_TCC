import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository, timeRepository,peneiraRepository  } from '../repositories/UserRepository';



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
  
  const jogador = await jogadorRepository.findOne( {where: {perfil_id: { id: idJogador } }, relations: { perfil_id: true , time_atual: true } })
  
  //console.log(jogador);
  
  

    
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
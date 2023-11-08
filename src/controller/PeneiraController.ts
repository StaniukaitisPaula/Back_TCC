import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository, timeRepository,peneiraRepository, notificacaoRepository  } from '../repositories/UserRepository';



export class PeneiraController{



//POST
async  postPeneira(req: Request, res: Response){

//    const idTime = parseInt(req.params.time)
//   const idJogador = parseInt(req.params.jogador)
//   const menssagem = req.body.menssage

// if(
//     idTime     == undefined ||
//     idJogador  == undefined ||
//     isNaN(idTime)           || isNaN(idJogador)

// ) throw new BadRequestError('Faltam Informacoes!')

// const time = await timeRepository.findOne( {where: {id: idTime }, relations: { organizacao: true } })

// if(
//   !time || time.organizacao.id != req.org.id
// ) throw new BadRequestError('Esse time não exite ou não pertece a essa organização!')

// const jogador = await jogadorRepository.findOne( {where: {perfil_id: { id: idJogador } }, relations: { perfil_id: true , time_atual: true } })


// if(
//   !jogador
// ) throw new BadRequestError('Jogador não exite!')

// if(jogador.time_atual)throw new BadRequestError('Jogador já tem time!')

// const verifique = await peneiraRepository.findOneBy({jogadores: jogador.perfil_id, time: time}) 

// if(verifique)throw new BadRequestError('Proposta ja enviada!')

// const peneira = await peneiraRepository.create({jogadores: jogador., menssagem: menssagem ? menssagem : ""})

// const oila = await peneiraRepository.save(peneira)
// console.log(oila);

// const noti = await notificacaoRepository.create({ de: jogador.perfil_id, menssagem: 'Uma proposta foi enviada para o seu perfil!', titulo: 'Proposta recebida' })

// await notificacaoRepository.save(noti)

// res.json({
//   proposta: oila
// })

    
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
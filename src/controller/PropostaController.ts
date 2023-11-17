import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, userRepository, timeRepository, propostaRepository, notificacaoRepository } from '../repositories/UserRepository';





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
      
      const time = await timeRepository.findOne( {where: {id: idTime }, relations: { dono: true } })
      
      if(
        !time || time.dono.id != req.user.id
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

      const noti = await notificacaoRepository.create({ de: jogador.perfil_id, menssagem: 'Uma proposta foi enviada para o seu perfil!', titulo: 'Proposta recebida' })

      await notificacaoRepository.save(noti)
      
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
    const aceitar = req.params.aceitar
  
  if(
      idTime     == undefined ||
      idJogador  == undefined ||
      isNaN(idTime)           || isNaN(idJogador)
  
  ) throw new BadRequestError('Faltam Informacoes!')
  
  const time = await timeRepository.findOne( {where: {id: idTime }, relations: { dono: true } })
  
  
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

  if(aceitar == '1' && proposta){
    console.log("oi");
    
    let jogadores = time.jogadores

    jogadores ? jogadores.push(jogador) : jogadores = [jogador]
    
    if(jogadores.length > 10) throw new BadRequestError('Time atigil o limite de jogadores')
    
    time.jogadores = jogadores
    
    await timeRepository.save(time)

    await propostaRepository.delete(proposta)
    const noti = await notificacaoRepository.create({ de: time.dono, menssagem: 'Aproposta para o ' + jogador.nickname +'foi aceita!', titulo: 'Proposta aceita' })

    await notificacaoRepository.save(noti)

  }else if(proposta){
    await propostaRepository.delete(proposta)
    const noti = await notificacaoRepository.create({ de: time.dono , menssagem: 'Aproposta para o ' + jogador.nickname +'foi recusada!', titulo: 'Proposta recusada' })

    await notificacaoRepository.save(noti)
  }
  
  res.json({
    acepted: true
  })
  
  
}    


}

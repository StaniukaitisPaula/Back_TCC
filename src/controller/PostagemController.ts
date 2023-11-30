import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, userRepository, postagemRepository, peneiraRepository, notificacaoRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil, Jogador, Postagem, Peneira } from '../entities/User';
import { Funcao } from '../entities/enum/Funcao';
import { isDataView } from "util/types";
import { Elo } from "../entities/enum/Elo";
import { time } from "console";


export class PostagemController {

// GET
async getPostToken(req: Request, res: Response) {

    const user = req.user
 

    const postProfile = await postagemRepository.find({ relations: { dono_id : true  }, where: { dono_id: { id : user.id } } , select: { dono_id: { id: false } }} )

    
    const response = { user: user, postProfile: postProfile[0]? postProfile[0] : null  }
    
    return res.json(response)

}

async getPostTime(req: Request, res: Response) {


  const idTime = parseInt(req.params.time)
  const postProfile = await postagemRepository.find({ where: { time: {id: idTime} }} )
  

  
  const response = { postProfile: postProfile[0]? postProfile[0] : null  }
  
  return res.json(response)

}

async getpostPlayer(req: Request, res: Response) {

    let perPage: string =  req.query.perPage as string
    let page: string =  req.query.page as string
    let elo: string = req.query.elo as string
    let funcao: string = req.query.funcao as string
    let hora: string = req.query.hora as string
    
    const perPageNumber = parseInt(perPage)
    const pagenumber = parseInt(page)
    const tipo = Boolean(parseInt(req.params.tipo))
  
    const skip = (perPageNumber * pagenumber) - perPageNumber;
     
    let postagemResponse = [new Postagem]
    let posatgemFilter = [new Postagem]

  
    if( !isNaN(perPageNumber) && !isNaN(pagenumber)){
      postagemResponse = await postagemRepository.find({relations: { dono_id: true, time: true }, take: perPageNumber, skip: skip, where:{tipo: tipo} }) 
  
    
      
    }else{
      postagemResponse = await postagemRepository.find({relations: { dono_id: true, time: true }, where: {tipo: tipo}  })
    }

    let postCount = await postagemRepository.count({where: {tipo: tipo}})

    if(req.params.id){
      posatgemFilter = postagemResponse.filter( (x) => {  if (x.id == parseInt( req.params.id )) return x  })

      postagemResponse = posatgemFilter
      postCount = posatgemFilter.length
    }

    if(req.query.elo){
      posatgemFilter = postagemResponse.filter( (x) => {  if ( x.elo != undefined && x.elo  >= parseInt(elo)) return x  })

      postagemResponse = posatgemFilter
      postCount = posatgemFilter.length
    }
       
    if(req.query.funcao){
      posatgemFilter = postagemResponse.filter( (x) => {  if (x.funcao !=  undefined && x.funcao == parseInt(funcao) ) return x  })

      postagemResponse = posatgemFilter
      postCount = posatgemFilter.length
    }
       
    if(req.query.hora){
     
      posatgemFilter = postagemResponse.filter( (x) => {  if (x.hora !=  undefined &&  new Date (' 1/1/1999 ' + x.hora) <= new Date (' 1/1/1999 ' + hora )  ) return x  })

      postagemResponse = posatgemFilter
      postCount = posatgemFilter.length
    }

    
    const response = {post: postagemResponse, limit: postCount }

    
    return res.json(response)

}

//POST
async createpost(req: Request, res: Response){

    const id = req.user
    const menssagem = req.body.menssage
    const idTime = parseInt(req.params.time)

    const {
        descricao,
        jogo,
        funcao,
        elo,
        hora,
        tipo,
        pros,
        time
    } = req.body

    if(
        descricao  == undefined || descricao  == "" ||
        jogo       == undefined || jogo       == "" ||
        funcao     == undefined || funcao     == "" ||
        elo        == undefined || elo        == "" ||
        hora       == undefined || hora       == "" ||
        tipo       == undefined ||
        pros       == undefined

    ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')

    if(tipo == '0' ){
    const verifique = await postagemRepository.findOneBy({dono_id: id }) 

    if(verifique)throw new BadRequestError('Postagem ja exsite!')
     

    const newPost = postagemRepository.create({

        descricao,
        jogo,
        funcao,
        elo,
        hora,
        tipo,
        pros,
       dono_id: id
    })
    
    await postagemRepository.save(newPost)



    return res.status(201).json(newPost)
  
    }else if(tipo == '1'){

      const verifique = await postagemRepository.findOneBy({time: { id: time } }) 

      if(verifique)throw new BadRequestError('Postagem ja existe!')
       
      const newPost = postagemRepository.create({

          descricao,
          jogo,
          funcao,
          elo,
          hora,
          tipo,
          pros,
          time 
        })
      
      await postagemRepository.save(newPost)

      const peneira = await peneiraRepository.create({menssagem: menssagem ? menssagem : "", time: time })
    
      const pen = await peneiraRepository.save(peneira) 

  
  
  
      return res.status(201).json(newPost)

    }

}


//PUT
async updatepost(req: Request, res: Response){

  const  user  = req.user 

  const postagem = await postagemRepository.findOne({ where: { dono_id: user} })


    if(postagem){
 const {
  
      descricao,
        jogo,
        funcao,
        elo,
        hora,
        tipo,
        pros
    } = req.body
    
    let response = {
      descricao,
      jogo,
      funcao,
      elo,
      hora,
      tipo,
      pros
    }
    // response.hora = (`${new Date().getHours()}:${new Date().getMinutes()}`)

    if(descricao){
      response.descricao = Boolean((await postagemRepository.update( { id: postagem.id }, { descricao: descricao})).affected)
    }
    
    if(jogo){
        response.jogo = Boolean((await postagemRepository.update( { id: postagem.id }, { jogo: jogo})).affected)
    }

    if(funcao){
        response.funcao = Boolean((await postagemRepository.update( { id: postagem.id }, { funcao: funcao})).affected)
    }

    if(elo){
        response.elo = Boolean((await postagemRepository.update( { id: postagem.id }, { elo: elo})).affected)
    }

  if(hora){
      response.hora = Boolean((await postagemRepository.update( { id: postagem.id }, { hora: hora})).affected)
  }

    if(tipo){
        response.tipo = Boolean((await postagemRepository.update( { id: postagem.id }, { tipo: tipo})).affected)
    }

    if(pros){
      response.pros = Boolean((await postagemRepository.update( { id: postagem.id }, { pros: pros})).affected)
  }
    }
    
    return res.json({
      response: postagem
    })
}


 //DELETE
async deletePost(req: Request, res: Response){

  const  postUser  = req.user 
  const idTime = parseInt(req.params.time)

  if(req.params.time){
    if(idTime){
    
      const postime = await postagemRepository.delete({ time: {id: idTime} } )
      const poen = await peneiraRepository.delete({ time: {id: idTime} } )
  
    }else{
      throw new BadRequestError('opaaa')
    }
  }else{
    if(postUser){
    
      const post = await postagemRepository.delete({dono_id: postUser })
  
    }else{
      throw new BadRequestError('!!!')
    }
  }





return res.json({
  response: true
})


} 









}

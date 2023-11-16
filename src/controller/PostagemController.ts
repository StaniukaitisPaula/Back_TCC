import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, userRepository, postagemRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil, Jogador, Postagem } from '../entities/User';
import { Funcao } from '../entities/enum/Funcao';
import { isDataView } from "util/types";
import { Elo } from "../entities/enum/Elo";


export class PostagemController {

// GET
async getPostToken(req: Request, res: Response) {
    const user = req.user

    const postProfile = await postagemRepository.find({ relations: { dono_id : true  }, where: { dono_id: { id : user.id } } , select: { dono_id: { id: false } }} )

    
    const response = { user: user, postProfile: postProfile[0]? postProfile[0] : null  }
    
    return res.json(response)

}

async getpostPlayer(req: Request, res: Response) {

    let perPage: string =  req.query.perPage as string
    let page: string =  req.query.page as string
  

    const perPageNumber = parseInt(perPage)
    const pagenumber = parseInt(page)
    const tipo = Boolean(parseInt(req.params.tipo))
  
    const skip = (perPageNumber * pagenumber) - perPageNumber;
     
    let postagemResponse = [new Postagem]
    let posatgemFilter = [new Postagem]

  
    if( !isNaN(perPageNumber) && !isNaN(pagenumber)){
      postagemResponse = await postagemRepository.find({relations: { dono_id: true }, take: perPageNumber, skip: skip, where:{tipo: tipo} }) 
  
    
      
    }else{
      postagemResponse = await postagemRepository.find({relations: { dono_id: true }, where: {tipo: tipo}  })
    }

    // if(req.params.id){
    //   posatgemFilter = postagemResponse.filter( (x) => {  if (x.id == parseInt( req.params.id )) return x  })

    //   postagemResponse = posatgemFilter
    // }

    // if(req.query.elo){
    //   posatgemFilter = postagemResponse.filter( (x) => {  if ((x.elo)  == (req.query.elo)) return x  })

    //   postagemResponse = posatgemFilter
    // }
       
    // if(req.query.funcao){
    //   posatgemFilter = postagemResponse.filter( (x) => {  if (x.funcao >=  req.query.funcao ) return x  })

    //   postagemResponse = posatgemFilter
    // }
       
    // if(req.query.hora){
    //   posatgemFilter = postagemResponse.filter( (x) => {  if (x.hora) == (req.query.hora) ) return x  })

    //   postagemResponse = posatgemFilter
    // }

    let postCount = await postagemRepository.count()
  
    const response = {post: postagemResponse, limit: postCount }
  
    console.log(postagemResponse);
    
    return res.json(response)

}

//POST
async createpost(req: Request, res: Response){

    const id = req.user

   // const data = new Date().getTime()
    

    const {
        descricao,
        jogo,
        funcao,
        elo,
        hora,
        tipo,
        pros
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
       dono_id: id,
    })

    // newPost.hora = (`${new Date().getHours()}:${new Date().getMinutes()}`)
    // console.log(newPost);
    
    await postagemRepository.save(newPost)



    return res.status(201).json(newPost)
  
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

  if(postUser){
    
    const post = await postagemRepository.delete({dono_id: postUser} )

  }else{
    throw new BadRequestError('!!!')
  }

return res.json({
  response: true
})


} 









}

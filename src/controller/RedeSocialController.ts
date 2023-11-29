import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, redeSocialRepository} from '../repositories/UserRepository';

import { RedeSocial } from "../entities/User";


export class RedeSocialController{


//POST
async postRedeSocial(req: Request, res: Response){

    const id = req.user
    
    const {
       link,
       tipo
    } = req.body

    if(
        link  == undefined || link == "" ||
        tipo  == undefined 

    ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')

    const newPost = redeSocialRepository.create({

      link,
      tipo,
      dono: id
      
    })

    await redeSocialRepository.save(newPost)

    return res.status(201).json(newPost)
  

}


//GET
async getRedeSocial(req: Request, res: Response){

   
    const id = req.user

    const redeSocial = await redeSocialRepository.find({relations: { dono : true  }} )

    
    const response = { redeSocial: redeSocial}

    
    return res.json(response)

}

//PUT
async putRedeSocial(req: Request, res: Response){

    const id = req.user

    const redeSocial = await redeSocialRepository.findOne({ where: { dono: id} })


    if(redeSocial){

  const {

        link,
        tipo

    } = req.body

      
    let response = {
        link,
        tipo
      }
    

      if(link){
        response.link= Boolean((await redeSocialRepository.update( { id: redeSocial.id }, { link: link})).affected)
      }
      if(tipo){
        response.tipo= Boolean((await redeSocialRepository.update( { id: redeSocial.id }, { tipo: tipo})).affected)
      }


      return res.json({
        response: link
      })
    }
  
    
    
  

}

//DELETE
async deleteRedeSocial(req: Request, res: Response){

    const idPost = req.params.id
  
    if(idPost){
      
      const post = await redeSocialRepository.delete(idPost)
  
    }else{
      throw new BadRequestError('!!!')
    }
  
  return res.json({
    response: true
  })
 

}




} 
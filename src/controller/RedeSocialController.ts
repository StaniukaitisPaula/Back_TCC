import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, redeSocialRepository} from '../repositories/UserRepository';
import { log } from "console";
import { TIMEOUT } from "dns";
import { Highlight } from "../entities/User";


export class RedeSocialController{


//POST
async postRedeSocial(req: Request, res: Response){

    const id = req.user

    const {
       link
    } = req.body

    if(
        link  == undefined || link == "" 

    ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')

    const newPost = redeSocialRepository.create({

      link,
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

        link

    } = req.body

      
    let response = {
        link
      }
    
  
      if(link){
        response.link= Boolean((await redeSocialRepository.update( { id: redeSocial.id }, { link: link})).affected)
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
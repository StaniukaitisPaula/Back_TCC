import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, userRepository, postagemRepository, highlightRepository} from '../repositories/UserRepository';



export class HighlightController{


//POST
async postHighlight(req: Request, res: Response){

    const id = req.user

    const {
        titulo
    } = req.body

    if(
        titulo  == undefined || titulo == "" 

    ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')

    const newPost = highlightRepository.create({

      titulo,
      dono: id
      
    })

    await highlightRepository.save(newPost)

    return res.status(201).json(newPost)
  

}


//GET
async getHighlight(req: Request, res: Response){

   
    const id = req.user

    const highlight = await highlightRepository.find({relations: { dono : true  }, order: { id: "DESC" }} )

    
    const response = { highlight: highlight }
    console.log(highlight);
    
    return res.json(response)

}

//PUT
async putHighlight(req: Request, res: Response){

    const id = parseInt(req.params.id)

    const highlight = await highlightRepository.findOne({ where: { id: id} })


    if(highlight){

  const {

        titulo

    } = req.body

      
    let response = {
        titulo
      }
    
  
      if(titulo){
        response.titulo = Boolean((await highlightRepository.update( { id: highlight.id }, { titulo: titulo})).affected)
      }


      return res.json({
        response: highlight
      })
    }
  
    
    
  

}

//DELETE
async deleteHighlight(req: Request, res: Response){

    const idPost = parseInt(req.params.id)
  
    if(idPost){
      
      const post = await highlightRepository.delete({id: idPost})
  
    }else{
      throw new BadRequestError('!!!')
    }
  
  return res.json({
    response: true
  })
 

}




} 
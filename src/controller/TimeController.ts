import { Request, Response } from "express";
import { BadRequestError} from "../helpers/api-erros";
import { jogadorRepository, timeRepository, userRepository } from '../repositories/UserRepository';
import { Perfil, Time } from '../entities/User';



export class TimeController {


//GET
async getTime(req: Request, res: Response) {
  const user = req.user
  let team = [new Time]

  

  if(req.user){
    let teamResponse = await timeRepository.findBy({ dono: req.user }) 
    if(teamResponse){
      team = teamResponse
    }else{
      throw new BadRequestError('Usuario sem organização')
    }
  }else{
    throw new BadRequestError('Usuario sem organização')
  }
 

  const response = { user: user, time: team[0]? team : false }
  
  
  return res.json(response)


}

async getTimeFilter(req: Request, res: Response) {


  let perPage: string =  req.query.perPage as string
  let page: string =  req.query.page as string

  const perPageNumber = parseInt(perPage)
  const pagenumber = parseInt(page)

  
  const skip = (perPageNumber * pagenumber) - perPageNumber;

  let teamResponse = [new Time]
  let teamfilter = [new Time]
  let name: string =  req.query.name as string


  if( !isNaN(perPageNumber) && !isNaN(pagenumber)){
    teamResponse = await timeRepository.find({ relations: { dono: true }, take: perPageNumber, skip: skip }) 

  }else{
    teamResponse = await timeRepository.find({ relations: { dono: true, jogadores: { perfil_id: true } }}) 
  }
  
  //console.log(teamResponse);


  if(name != undefined && name != "" ){
    teamfilter = teamResponse.filter( (x) => {  if (x.nome_time.toLowerCase().startsWith(name.toLocaleLowerCase())) return x  })
    teamResponse = teamfilter

  }
  if(req.params.id){
    teamfilter = teamResponse.filter( (x) => {  if (x.id == parseInt( req.params.id )) return x  })
    // console.log(teamfilter);
    
    teamResponse = teamfilter
  }

  let timeCount = await timeRepository.count()

  const response = { teams: teamResponse, limit: timeCount }
  
  return res.json(response)
}  

async getTimeFilterUser(req: Request, res: Response) {

   let perfil = new Perfil
   let responsee = false

  if(req.params.id){
    let orgResponse = await userRepository.findOneBy( {id: parseInt(req.params.id) } ) 
    
    if(orgResponse){
        perfil = orgResponse
        let teamResponse = await timeRepository.find( { where: { dono: perfil } } ) 
        const response = { teams: teamResponse }
  
        return res.json(response)
    }

    
  }
  

  const response = { teams: responsee }
  
  return res.json(response)
}  

//POST 
async createTime(req: Request, res: Response){
        const user = req.user
  
        const {
          nome_time,
          biografia,
          jogo,
        } = req.body

   
  
  
  if(
    nome_time        == undefined || nome_time        == "" ||
    biografia        == undefined || biografia        == "" ||
    jogo             == undefined || jogo             == "" 

  ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')


  const nametimeExists = await timeRepository.findOneBy({nome_time})

  if(nametimeExists){
    throw new BadRequestError('Nome de Time ja cadastrado!')
  }

  

  const newTime = timeRepository.create({
    dono: user,
    nome_time,
    biografia,
    jogo
  })

  await timeRepository.save(newTime)

  return res.status(201).json(newTime)



}


async insertJogador(req: Request, res: Response){

  const idTime = parseInt(req.params.time)
  const idJogador = parseInt(req.params.jogador)

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

let jogadores = time.jogadores

jogadores ? jogadores.push(jogador) : jogadores = [jogador]

if(jogadores.length > 10) throw new BadRequestError('Time atigil o limite de jogadores')

time.jogadores = jogadores

const a = await timeRepository.save(time)

return res.json({
  added: a
} )


}


//UPDATE TIME
async updateTime(req: Request, res: Response){

  const id = req.params.id

 const times = await timeRepository.findOne({ relations: { dono: true  }, where: { dono: { id : req.user.id }, id: parseInt(id) } , select: { dono: { id: false } }})
  // console.log(times);

  if(times){
    const {
        nome_time,
        biografia,
      } = req.body
      // console.log(nome_time);
      

      let response = {
        nome_time,
        biografia,
      }

    if(nome_time){
        response.nome_time = Boolean((await timeRepository.update( { id: times.id}, { nome_time: nome_time})).affected)  
    }

    if(biografia){
        response.biografia = Boolean((await timeRepository.update( { id: times.id }, { biografia: biografia})).affected)  
    }
  }else{
    throw new BadRequestError('Id nao informado ou nao ha org!')
  }
  


return res.json({
  response: true
})

  
}


// DELETE
async deleteTime(req: Request, res: Response){
  const user = req.user
  const id = req.params.id

  // console.log(org);
  // console.log(id)
  

if(id == null || user == undefined)  throw new BadRequestError('Id nao informado!')

const time = await timeRepository.findOneBy({ id: parseInt(id), dono: user })

if(time){
  await timeRepository.delete({ id: time.id})
}

return res.json({
  deleted: true
} )



}



async deleteJogador(req: Request, res: Response){
  
  const idTime = parseInt(req.params.time)
  const idJogador = parseInt(req.params.jogador)

if(
    idTime     == undefined ||
    idJogador  == undefined ||
    isNaN(idTime)           || isNaN(idJogador)

) throw new BadRequestError('Faltam Informacoes!')

const time = await timeRepository.findOne( {where: {id: idTime }, relations: { dono: true } })


if(
  !time || time.dono.id != req.user.id
) throw new BadRequestError('Esse time não exite ou não pertece a esse perfil!')

const jogador = await jogadorRepository.findOne( {where: {perfil_id: { id: idJogador } }})
console.log(jogador);


if(
  !jogador
) throw new BadRequestError('Jogador não exite!')

let jogadores = time.jogadores;
let jogadorFilter;

if (jogadores) {
  jogadorFilter = jogadores.filter(x => x.id !== jogador.id);
} else {
  jogadores = [];
}


time.jogadores = jogadorFilter

const a = await timeRepository.save(time)

return res.json({
  removed: a
} )
}





}

  


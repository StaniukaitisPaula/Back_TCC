import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, userRepository, timeRepository, postagemRepository, notificacaoRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import { Jogador } from '../entities/User';
import {  Like } from 'typeorm';




export class UserController {

//CADASTRO / LOGIN
async create(req: Request, res: Response){
  
    const {
      nome_usuario,
      nome_completo,
      email,
      senha,
      data_nascimento,
      genero,
      nickname,
      biografia
    } = req.body

    if(
      nome_usuario    == undefined || nome_usuario    == "" ||
      email           == undefined || email           == "" ||
      senha           == undefined || senha           == "" ||
      data_nascimento == undefined || data_nascimento == "" ||
      genero          == undefined || 
      nickname        == undefined || nickname        == "" 
      ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')
    
    const userEmailExists = await userRepository.findOneBy({email})
    const usernameExists = await userRepository.findOneBy({nome_usuario})
    const nicknameExists = await userRepository.findOneBy({nickname})
    
    if(userEmailExists){
      throw new BadRequestError('Email já cadastrado!')
    }
    if(usernameExists){
      throw new BadRequestError('Nome de usuário já cadastrado!')
    }
    if(nicknameExists){
      throw new BadRequestError('Nickname já cadastrado!')
    }

    const hashSenha = await bcrypt.hash(senha, 10)

  
    const newUser = userRepository.create({
      nome_usuario,
      nome_completo,
      email,
      senha: hashSenha,
      data_nascimento,
      genero,
      nickname,
      biografia
    })

    await userRepository.save(newUser)

    const {senha: _, ...user} = newUser

    return res.status(201).json(user)
}

async login(req: Request, res: Response){

    const {
      login,
      senha
    } = req.body


    const user = await userRepository.findOneBy([{ email : login },{ nome_usuario : login }])
    if(!user){
      throw new BadRequestError('Login ou senha invalidos')
    }

    const verifyPass = await bcrypt.compare(senha, user.senha)

    if(!verifyPass){
      throw new BadRequestError('Login ou senha invalidos')
    }

     const token = jwt.sign({ id: user.id}, process.env.JWT_PASS ?? '', {expiresIn: "1d", })

     const {senha:_, ...userLogin} = user

    return res.json({
      user: userLogin,
      token: token
    })
}

async validationMobile(req: Request, res: Response){
 
    const {
      nome_usuario,
      nome_completo,
      email,
      senha,
      data_nascimento,
      genero,
      nickname,
      biografia
    } = req.body

    if(
      nome_usuario    == undefined || nome_usuario    == "" ||
      email           == undefined || email           == "" ||
      senha           == undefined || senha           == "" ||
      data_nascimento == undefined || data_nascimento == "" ||
      genero          == undefined || 
      nickname        == undefined || nickname        == "" 
      ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')
    
    const userEmailExists = await userRepository.findOneBy({email})
    const usernameExists = await userRepository.findOneBy({nome_usuario})
    
    if(userEmailExists){
      throw new BadRequestError('Email já cadastrado!')
    }
    if(usernameExists){
      throw new BadRequestError('Nome de usuário já cadastrado!')
    }

}

// GET 
async getProfile(req: Request, res: Response) {
    const user = req.user

    const playerProfile = await jogadorRepository.find({ relations: { perfil_id : true, time_atual: true  }, where: { perfil_id: { id : user.id } } , select: { perfil_id: { id: false } }} )


    const response = { user: user, playerProfile: playerProfile[0]? playerProfile[0] : null}
    
    return res.json(response)

}

async getProfileById(req: Request, res: Response) {

    const id = req.params.id

    const user = await userRepository.findOne({ where: {id: parseInt(id)}})

    if(user == null){
      throw new BadRequestError('Usuario não existe!')
    }

    const {
      senha,
      ...userReturn
     } = user
    
     const playerProfile = await jogadorRepository.find({ relations: { perfil_id : true, time_atual: true  }, where: { perfil_id: { id : user.id } } , select: { perfil_id: { id: false } }} )
     
  
    const response = { user: userReturn, playerProfile: playerProfile[0] ? playerProfile[0] : null }

    return res.json(response)

}

async getPlayers(req: Request, res: Response) {

  let perPage: string =  req.query.perPage as string
  let page: string =  req.query.page as string
 
  const id = req.query.id as string

  const perPageNumber = parseInt(perPage)
  const pagenumber = parseInt(page)

  const skip = (perPageNumber * pagenumber) - perPageNumber;
   
  let jogadorResponse = [new Jogador]
  let jogadorfilter = [new Jogador]
  let name: string =  req.query.name as string


  if( !isNaN(perPageNumber) && !isNaN(pagenumber)){
    jogadorResponse = await jogadorRepository.find({relations: { perfil_id: true, time_atual: true }, take: perPageNumber, skip: skip}) 

  }else{
    jogadorResponse = await jogadorRepository.find({relations: { perfil_id: true, time_atual: true }})
  }
  
  let jogadorCount = await jogadorRepository.count()
  if(name != undefined && name != "" ){
    jogadorfilter = jogadorResponse.filter( (x) => {  if (x.nickname.toLowerCase().startsWith(name.toLowerCase())) return x  })
    jogadorResponse = jogadorfilter
    jogadorCount = await jogadorRepository.countBy({nickname: Like(`${name}%`)})

  }
  if(id){
    jogadorfilter = jogadorResponse.filter( (x) => {  if (x.perfil_id.id == parseInt( id )) return x  })
    // console.log(jogadorfilter);
    
    jogadorResponse = jogadorfilter
  }
  

  const response = { players: jogadorResponse, limit: jogadorCount }
  
  return res.json(response)
}  

//POST JOGADOR / ORGANIZADOR 
async createPlayer(req: Request, res: Response){

  const id = req.user


  const {
    nickname,
    jogo,
    funcao,
    elo,
  } = req.body

  // console.log(jogo);
  // console.log(funcao);
  // console.log(elo);

  if(
    nickname  == undefined || nickname  == "" ||
    jogo      == undefined || jogo      == "" ||
    funcao    == undefined || funcao    == "" ||
    elo       == undefined || elo       == "" 
  ) throw new BadRequestError('JSON invalido, Faltam Informacoes!')


  const jogadorExists = await jogadorRepository.findOneBy({perfil_id: id})


  if(jogadorExists) throw new BadRequestError('Perfil Jogador já cadastrado!')

  const newJogador = jogadorRepository.create({
    nickname,
    jogo,
    funcao,
    elo,
    perfil_id: id,
  })

  await jogadorRepository.save(newJogador)

  //const {senha: _, ...user} = newUser

  return res.status(201).json(newJogador)



}


// PUT
async updateProfile(req: Request, res: Response){

    const user = req.user
    const {
      id,
      nome_usuario,
      nome_completo,
      email,
      senha,
      data_nascimento,
      genero,
      nickname,
      biografia
    } = req.body

    

    let response = {
      id,
      nome_usuario,
      nome_completo,
      email,
      senha,
      data_nascimento,
      genero,
      nickname,
      biografia
    }

    if(nome_usuario){
      if(await userRepository.findOneBy({nome_usuario: nome_usuario})){
        response.nome_usuario = 'Usuario já existe!'
      }else{
        response.nome_usuario = Boolean(await userRepository.update( { id: user.id }, { nome_usuario: nome_usuario}))
      }
    
    }
    if(nome_completo){
        response.nome_completo = Boolean(await userRepository.update( { id: user.id }, { nome_completo: nome_completo}))
    }
    if(email){
      if(await userRepository.findOneBy({email: email})){
        response.email = 'Email de usuario já cadastrado!'
      }else{
        response.email = Boolean((await userRepository.update( { id: user.id }, { email: email})).affected)
      }

    }
    if(senha){
      const hashSenha = await bcrypt.hash(senha, 10)

      response.senha = Boolean((await userRepository.update( { id: user.id }, { senha: hashSenha})).affected)
      
    }
    if(data_nascimento){
      response.data_nascimento = Boolean((await userRepository.update( { id: user.id }, { data_nascimento: data_nascimento})).affected)
  
    }
    if(genero){
        response.genero = Boolean((await userRepository.update( { id: user.id }, { genero: genero})).affected)  
    }

    if(nickname){
      if(await userRepository.findOneBy({nickname: nickname})){
        response.nickname = 'Nickname de usuario já ultilizado!'
      }else{
        response.nickname = Boolean(await userRepository.update( { id: user.id }, { nickname: nickname}))
      }
    
    }

    if(biografia){
      if(await userRepository.findOneBy({biografia: biografia})){

      }else{
        response.biografia = Boolean ((await userRepository.update( { id: user.id }, { biografia: biografia})).affected)
      }
    
    }


    return res.json({
      response: response
    })


}


//UPDATE JOGADOR / ORGANIZADOR
async updatePlayer(req: Request, res: Response){

  const user = req.user

  const playerProfile = await jogadorRepository.find({ relations: { perfil_id : true  }, where: { perfil_id: { id : user.id } } , select: { perfil_id: { id: false } }} )

  const {
    nickname,
    jogo,
    funcao,
    elo,
  } = req.body

  let response = {
    nickname,
    jogo,
    funcao,
    elo
  }

if(nickname){
    response.nickname = Boolean((await jogadorRepository.update( { id: playerProfile[0].id}, { nickname: nickname})).affected)  
}

if(jogo){
    response.jogo = Boolean((await jogadorRepository.update( { id: playerProfile[0].id }, { jogo: jogo})).affected)  
}

if(funcao){
  response.funcao = Boolean((await jogadorRepository.update( { id: playerProfile[0].id }, { funcao: funcao})).affected)  
}

if(elo){
  response.elo = Boolean((await jogadorRepository.update( { id: playerProfile[0].id }, { elo: elo})).affected)  
}

return res.json({
  response: response
})

  
}

async updatePlayerLeave(req: Request, res: Response){

 
  const player = req.player


  if(player != null){
    const time = await timeRepository.findOne({where: {jogadores: {id: player.id}}, relations: { dono: true }})
   
    if(time){
      let jogadorFilter = time.jogadores?.filter(x => x.id !== player.id);
      time.jogadores = jogadorFilter

      await timeRepository.save(time)
      const noti = await notificacaoRepository.create({ de: time.dono, menssagem: 'Jogador ' + player.nickname +' saiu do time: ' + time.nome_time, titulo: 'TIME' })
      console.log(noti);
      
      console.log(await notificacaoRepository.save(noti))

    }
  }



  

return res.json({
  up: true
} )


  
}




async deletePlayer(req: Request, res: Response){
 
    const player = req.player

    if(req.player){

      const playerProfile = await jogadorRepository.delete(player)
    }else{

      throw new BadRequestError('O usuário não tem perfil de Jogador!')
    }

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

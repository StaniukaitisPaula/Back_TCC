import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil } from '../entities/User';




export class UserController {

  //CADASTRO
  async create(req: Request, res: Response){
  
    const {
      nome_usuario,
      nome_completo,
      email,
      senha,
      data_nascimento,
      foto_perfil,
      foto_capa,
      genero,
      tipo_de_usuario,
    } = req.body
    
    console.log(req.body)

    if(
      nome_usuario    == undefined ||
      nome_completo   == undefined ||
      email           == undefined ||
      senha           == undefined ||
      data_nascimento == undefined ||
      genero          == undefined ||
      tipo_de_usuario == undefined 
      ) throw new BadRequestError('JSON invalido')
    

    const userEmailExists = await userRepository.findOneBy({email})
    const usernameExists = await userRepository.findOneBy({nome_usuario})
    

    if(userEmailExists){
      throw new BadRequestError('Email já cadastrado!')
    }
    if(usernameExists){
      throw new BadRequestError('Nome de usuario já cadastrado!')
    }

    const hashSenha = await bcrypt.hash(senha, 10)

  
    const newUser = userRepository.create({
      nome_usuario,
      nome_completo,
      email,
      senha: hashSenha,
      data_nascimento,
      genero
    })

    await userRepository.save(newUser)

    const idPerfil = await userRepository.getId(newUser)

    const {senha: _, ...user} = newUser

    if(tipo_de_usuario == 0){

      if(!req.body.jogador){
        await userRepository.delete({ id : idPerfil })
        throw new BadRequestError('Falta Informacoes do jogador')
      }
      const {
        nickname,
        biografia,
        jogo,
        funcao
      } = req.body.jogador



      const newPlayer = jogadorRepository.create({
        perfil: idPerfil,
        nickname,
        biografia,
        jogo,
        funcao
      })

      await jogadorRepository.save(newPlayer)

      return res.status(201).json(user)

    }else if(tipo_de_usuario == 1){
      if(!req.body.organizador){
        await userRepository.delete({ id : idPerfil })
        throw new BadRequestError('Falta Informacoes do organizador')
      }
      const {
        nome_organizacao,
        foto_organizacao,
        biografia
      } = req.body.organizador

      const newOrganizador = organizadorRepository.create({
        perfil: idPerfil,
        nome_organizacao,
        biografia
      })

      await organizadorRepository.save(newOrganizador)

      return res.status(201).json(user)
    }else{
      await userRepository.delete({ id : idPerfil })
      throw new BadRequestError('Tipo de Usuario invalido')
    }


    


  }

  //LOGIN
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
//PERFIL
  async getProfile(req: Request, res: Response) {

    const user = req.user
    
    //const player = await jogadorRepository.findBy({ perfil : user.id })
    const player = await jogadorRepository.find({ relations: { perfil : true  }, where: { perfil: { id : user.id } } })
    const organizador = await organizadorRepository.find({ relations: { perfil : true }, where: { perfil: { id : user.id } } })

    if(player.length > 0){
      player[0].perfil.senha = ""
      const result = player[0]
      const response =  { type: 'jogador', result}
      
      return res.json(response)
    }else{
      console.log(organizador);
      organizador[0].perfil.senha = ""
      const result = organizador[0]
      const response =  { type: 'organizador', result}
      
      return res.json(response)
    }

  }


  async getProfileById(req: Request, res: Response) {

    const user = req.params.id
    
    //const player = await jogadorRepository.findBy({ perfil : user.id })
    const player = await jogadorRepository.find({ relations: { perfil : true  }, where: { perfil: { id : parseInt(user) } } })
    const organizador = await organizadorRepository.find({ relations: { perfil : true }, where: { perfil: { id : parseInt(user) }  
       } })

    if(player.length > 0){
      player[0].perfil.senha = ""
      const result = player[0]
      const response =  { type: 'jogador', result}
      
      return res.json(response)
    }else{
      console.log(organizador);
      organizador[0].perfil.senha = ""
      const result = organizador[0]
      const response =  { type: 'organizador', result}
      
      return res.json(response)
    }

    }

// ATUALIZAR PERFIL
  async updateProfile(req: Request, res: Response){

    const user = req.user

    const player = await jogadorRepository.find({ relations: { perfil : true  }, where: { perfil: { id : user.id } } })
    const organizador = await organizadorRepository.find({ relations: { perfil : true }, where: { perfil: { id : user.id } } })




}


async validationMobile(req: Request, res: Response){
  
  const {
    nome_usuario,
    nome_completo,
    email,
    senha,
    data_nascimento,
    foto_perfil,
    foto_capa,
    genero,
    tipo_de_usuario,
  } = req.body
  
  console.log(req.body)

  if(
    nome_usuario    == undefined ||
    nome_completo   == undefined ||
    email           == undefined ||
    senha           == undefined ||
    data_nascimento == undefined ||
    genero          == undefined ||
    tipo_de_usuario == undefined 
    ) throw new BadRequestError('JSON invalido')
  

  const userEmailExists = await userRepository.findOneBy({email})
  const usernameExists = await userRepository.findOneBy({nome_usuario})
  

  if(userEmailExists){
    throw new BadRequestError('Email já cadastrado!')
  }
  if(usernameExists){
    throw new BadRequestError('Nome de usuario já cadastrado!')
  }
}


}






// export const forgotPassword = async (req: Request, res: Response) => {

//   const {
//      login
//    } = req.body

//   try{
//      const user = await userRepository.findOneBy([{ email : login }])

   
//     const transporter = nodemailer.createTransport({
//        host: "sandbox.smtp.mailtrap.io",
//        port: 2525,
//        auth: {
//       user: "91c03c9f7733ee",
//         pass: "****724d"
//      }
//     })

//   const newPassword = crypto.randomBytes(4).toString('hex')
    
//   transporter.sendMail({
//     from: 'Administrador <074b0757bf-31f276@inbox.mailtrap.io>',
//        to: login,
//        subject: 'Recuperação de Senha!',
//       html: `<p>Olá, sua nova senha para acessar o sistemas é: ${newPassword}</p><br/><a href="http://localhost:8080/login">Sistema</a>`
       
//      }).then(
//       () => {
//         userRepository(Perfil){

//           password: newPassword
//         })
//        }
//      )


//    } catch (error){
//      return res.status(404).json({
//       message: 'User not found'
//     })
//      }

//  }
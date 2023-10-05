import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil } from '../entities/User';
import { Blob } from "buffer";
import { DataSource } from 'typeorm';
import { Genero } from '../entities/enum/Genero';




export class UserController {

  //CADASTRO
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
      genero,
      nickname,
      biografia
    })

    await userRepository.save(newUser)

    const {senha: _, ...user} = newUser

    return res.status(201).json(user)
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

    const playerProfile = await jogadorRepository.find({ relations: { perfil_id : true  }, where: { perfil_id: { id : user.id } } })
    const orgProfile = await organizadorRepository.find({ relations: { dono_id : true }, where: { dono_id: { id : user.id } } })

    const response = { user: user, playerProfile: playerProfile[0] ? playerProfile[0].id : false, orgProfile: orgProfile[0] ? orgProfile[0].id : false }
    
    return res.json(response)

  }

  async getProfileById(req: Request, res: Response) {

    const id = req.params.id

    const user = await userRepository.findOneBy({id: parseInt(id)})

    if(user == null){
      throw new BadRequestError('Usuario não existe!')
    }

    const {
      nome_usuario,
      email,
      senha,
      ...userReturn
     } = user
    
    const playerProfile = await jogadorRepository.find({ relations: { perfil_id : true  }, where: { perfil_id: {id : parseInt(id) } } })
    const orgProfile = await organizadorRepository.find({ relations: { dono_id : true }, where: { dono_id: { id : parseInt(id) } } })
  
    const response = { user: userReturn, playerProfile: playerProfile[0] ? playerProfile[0].id : false, orgProfile: orgProfile[0] ? orgProfile[0].id : false }

    return res.json(response)

  }

// ATUALIZAR PERFIL
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

    const hashSenha = await bcrypt.hash(senha, 10)

    let response = {
      id,
      nome_usuario,
      nome_completo,
      email,
      senha: hashSenha ,
      data_nascimento,
      genero,
      nickname,
      biografia
    }

    if(nome_usuario){
      if(await userRepository.findOneBy({nome_usuario: nome_usuario})){
        response.nome_usuario = 'Usuario já existe!'
      }else{
        response.nome_usuario = await userRepository.update( { id: user.id }, { nome_usuario: nome_usuario})
      }
    
    }
    if(email){
      if(await userRepository.findOneBy({email: email})){
        response.email = 'Email de usuario já cadastrado!'
      }else{
        response.email = Boolean((await userRepository.update( { id: user.id }, { email: email})).affected)
      }

    }
    if(senha){
      if(await userRepository.findOneBy({senha: hashSenha})){
        response.senha = 'Senha fraca!'
      }else{
        response.senha = String ((await userRepository.update( { id: user.id }, { senha: hashSenha})).affected)
      }
    }
    if(data_nascimento){
      response.senha = String ((await userRepository.update( { id: user.id }, { data_nascimento: data_nascimento})).affected)
  
    }
    if(genero){
        response.genero =  String ((await userRepository.update( { id: user.id }, { genero: genero})).affected)  
    }

    if(nickname){
      if(await userRepository.findOneBy({nickname: nickname})){
        response.nickname = 'Nickname de usuario já ultilizado!'
      }else{
        response.nickname = await userRepository.update( { id: user.id }, { nickname: nickname})
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

//VALIDACAO PARA O MOBILE
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
      throw new BadRequestError('Nome de usuario já cadastrado!')
    }

}


}


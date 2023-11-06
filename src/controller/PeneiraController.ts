import { Request, response, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import { jogadorRepository, organizadorRepository, userRepository, postagemRepository, notificacaoRepository, peneiraRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";
import nodemailer from 'nodemailer';
import crypto     from 'crypto';
import { resolve } from "path";
import { Perfil, Jogador, Postagem } from '../entities/User';

export class PeneiraController{
      
//GET 
async getPeneira(req: Request, res: Response) {



}

async postPeneira(req: Request, res: Response) {



}

async putPeneira(req: Request, res: Response) {



}

async deletePeneira(req: Request, res: Response) {



}








    
}
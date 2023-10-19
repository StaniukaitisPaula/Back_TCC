import { AppDataSource } from "../data-source";
import { Jogador, Organizacao, Perfil, Time, Postagem } from '../entities/User';


export const jogadorRepository = AppDataSource.getRepository(Jogador)

export const userRepository = AppDataSource.getRepository(Perfil)

export const organizadorRepository = AppDataSource.getRepository(Organizacao)

export const timeRepository = AppDataSource.getRepository(Time)

export const postagemRepository = AppDataSource.getRepository(Postagem)
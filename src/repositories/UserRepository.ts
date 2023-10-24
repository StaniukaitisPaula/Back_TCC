import { AppDataSource } from "../data-source";
import { Jogador, Organizacao, Perfil, Time, Postagem, Proposta } from '../entities/User';


export const jogadorRepository = AppDataSource.getRepository(Jogador)

export const userRepository = AppDataSource.getRepository(Perfil)

export const organizadorRepository = AppDataSource.getRepository(Organizacao)

export const timeRepository = AppDataSource.getRepository(Time)

export const postagemRepository = AppDataSource.getRepository(Postagem)

export const propostaRepository = AppDataSource.getRepository(Proposta)
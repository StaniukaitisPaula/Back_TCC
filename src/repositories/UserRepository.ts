import { AppDataSource } from "../data-source";
import { Jogador, Perfil, Time, Postagem, Proposta, Notificacao, Peneira } from '../entities/User';


export const jogadorRepository = AppDataSource.getRepository(Jogador)

export const userRepository = AppDataSource.getRepository(Perfil)

export const timeRepository = AppDataSource.getRepository(Time)

export const postagemRepository = AppDataSource.getRepository(Postagem)

export const propostaRepository = AppDataSource.getRepository(Proposta)

export const notificacaoRepository = AppDataSource.getRepository(Notificacao)

export const peneiraRepository = AppDataSource.getRepository(Peneira)
import { AppDataSource } from "../data-source";
import { Jogador , Organizacao, Perfil } from "../entities/User";


export const jogadorRepository = AppDataSource.getRepository(Jogador)

export const userRepository = AppDataSource.getRepository(Perfil)

export const organizadorRepository = AppDataSource.getRepository(Organizacao)
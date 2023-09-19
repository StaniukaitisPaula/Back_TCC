import { AppDataSource } from "../data-source";
import { Jogador , Organizador, Perfil } from "../entities/User";


export const jogadorRepository = AppDataSource.getRepository(Jogador)

export const userRepository = AppDataSource.getRepository(Perfil)

export const organizadorRepository = AppDataSource.getRepository(Organizador)
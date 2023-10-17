import { Jogador, Organizacao, Perfil } from "../entities/User"

declare global {
  namespace Express{
    export interface Request{
      user : Partial<Perfil>
      player : Partial<Jogador>
      org : Partial<Organizacao>
    }
  }
}

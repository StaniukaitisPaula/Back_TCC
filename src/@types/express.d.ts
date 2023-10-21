import { Jogador, Organizacao, Perfil, Postagem } from "../entities/User"

declare global {
  namespace Express{
    export interface Request{
      user : Partial<Perfil>
      player : Partial<Jogador>
      org : Partial<Organizacao>
      post : Partial<Postagem> 
      
    }
  }
}

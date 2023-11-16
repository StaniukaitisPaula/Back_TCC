import { Jogador, Perfil, Postagem } from "../entities/User"

declare global {
  namespace Express{
    export interface Request{
      user : Partial<Perfil>
      player : Partial<Jogador>
      post : Partial<Postagem> 
    }
  }
}

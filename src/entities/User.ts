import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

enum Genero {
  Masculino,
  Feminino,
  Outro 
}

enum Funcao {
  TOP,
  JG,
  MID,
  ADC,
  SUP
}

enum Jogo{
  League_of_legends,
  CSGO,
  Valorant
}






@Entity('tbl_perfil')
export class Perfil {
  @PrimaryGeneratedColumn()
  id: number
  @Column({length: 100, unique: true})
  nome_usuario: String
  @Column({length: 100})
  nome_completo: String
  @Column({length: 255, unique: true})
  email: String
  @Column({type : 'text'})
  senha: String
  @Column({type : 'date'})
  data_nascimento: Date
  @Column({type : 'text'})
  foto_perfil: String
  @Column({type : 'text'})
  foto_capa: String
  @Column({type : 'int'})
  genero: Genero
}




@Entity('tbl_jogador')
export class Jogador {
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne(() => Perfil)
  @JoinColumn()
  perfil: Perfil
  @Column({length: 100})
  nickname: String
  @Column({length: 255})
  biografia: String
  @Column({type: 'int'})
  jogo: Jogo
  @Column({type: 'int'})
  funcao: Funcao
}

@Entity('tbl_organizador')
export class Organizador{
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne(() => Perfil)
  @JoinColumn()
  perfil: Perfil
  @Column({length: 100})
  nome_organizacao: String
  @Column({type: 'text'})
  foto_organizacao: String
}
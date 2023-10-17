import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Genero } from "./enum/Genero";
import { Jogo } from "./enum/Jogo";
import { Funcao } from "./enum/Funcao";
import { Elo } from "./enum/Elo";


@Entity('tbl_perfil')
export class Perfil {
  @PrimaryGeneratedColumn()
  id: number
  @Column({length: 100, unique: true})
  nome_usuario: string
  @Column({length: 100})
  nome_completo?: string
  @Column({length: 255, unique: true})
  email: string
  @Column({type : 'text'})
  senha: string
  @Column({type : 'date'})
  data_nascimento: Date
  @Column({type : 'int'})
  genero: Genero
  @Column({length: 100})
  nickname: string
  @Column({length: 255})
  biografia?: string
}

@Entity('tbl_organizacao')
export class Organizacao{
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne(() => Perfil)
  @JoinColumn()
  dono_id: Perfil
  @OneToMany(() => Time, (time) => time.organizacao, { onDelete: 'CASCADE' })
  @JoinColumn()
  times?: Time[]
  @Column({length: 100})
  nome_organizacao: string
  @Column({type: 'text'})
  biografia?: string
}

@Entity('tbl_time')
export class Time{
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Organizacao, (organizacao) => organizacao.times, { onDelete: 'CASCADE' })
  @JoinColumn()
  organizacao: Organizacao
  @Column({length: 100})
  nome_time: string
  @Column({type : 'int'})
  jogo: Jogo
  @Column({type: 'text'})
  biografia?: string
  @OneToMany(() => Jogador, (jogador) => jogador.time_atual, { onDelete: 'CASCADE' })
  @JoinColumn()
  jogadores?: Jogador[]
  @OneToMany(() => Jogador, (jogador) => jogador.time_atual, { onDelete: 'CASCADE' })
  @JoinColumn()
  jogadores_ativos?: Jogador[]
}

@Entity('tbl_jogador')
export class Jogador {
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne(() => Perfil)
  @JoinColumn()
  perfil_id: Perfil
  @Column({length: 100})
  nickname: string
  @Column({type : 'int'})
  jogo: Jogo
  @Column({type : 'int'})
  funcao: Funcao
  @Column({type : 'int'})
  elo: Elo
  @ManyToOne(() => Time, (time) => time.jogadores, { onDelete: 'CASCADE' })
  @JoinColumn()
  time_atual?: Time
}


@Entity('tbl_Postagem')
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne(() => Perfil)
  @JoinColumn()
  dono_id: Perfil
  @Column({type : 'text'})
  descricao: String
  @Column({type : 'int'})
  jogo: Jogo
  @Column({type : 'int'})
  funcao: Funcao[]
  @Column({type : 'int'})
  elo?: Elo
  @Column({type : "boolean"})
  tipo: boolean
}

@Entity('tbl_Proposta')
export class Proposta {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToMany(() => Perfil)
  @JoinColumn()
  de: Perfil
  @ManyToMany(() => Perfil)
  @JoinColumn()
  para: Perfil
  @Column({type : 'text'})
  menssagem: String
}

@Entity('tbl_Peneira')
export class Peneira {
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne(() => Perfil)
  @JoinColumn()
  time: Time
  @ManyToMany(() => Perfil)
  @JoinColumn()
  jogadores?: Perfil[]
  @Column({type : 'text'})
  menssagem: String
}


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
  @OneToMany(() => Proposta, (proposta) => proposta.para )
  @JoinColumn()
  propostas?: Proposta[]
  @OneToMany(() => Notificacao, (notificacao) => notificacao.de)
  @JoinColumn()
  notificacoes?: Notificacao[]
  @OneToMany(() => Time, (time) => time.dono, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  @JoinColumn()
  times?: Time[]
}

@Entity('tbl_time')
export class Time{
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Perfil, (perfil) => perfil.times, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  @JoinColumn()
  dono: Perfil
  @Column({length: 100})
  nome_time: string
  @Column({type : 'int'})
  jogo: Jogo
  @Column({type: 'text'})
  biografia?: string
  @OneToMany(() => Jogador, (jogador) => jogador.time_atual, {eager:true})
  @JoinColumn()
  jogadores?: Jogador[]
  @OneToMany(() => Proposta, (proposta) => proposta.de , {eager:true})
  @JoinColumn()
  propostas?: Proposta[]
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
  @ManyToOne(() => Time, (time) => time.jogadores,{ onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  time_atual?: Time 
}


@Entity('tbl_Postagem')
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Perfil , {nullable: true })
  @JoinColumn()
  dono_id?: Perfil 
  @ManyToOne(() => Time,  {nullable: true })
  @JoinColumn()
  time?: Time
  @Column({type : 'text'})
  descricao: string
  @Column({type : 'int'})
  jogo: Jogo
  @Column({type : 'int'})
  funcao?: Funcao
  @Column({type : 'int'})
  elo?: Elo  
  @Column()
  hora: string  
  @Column({type : "boolean"})
  tipo: boolean
  @Column({type: 'text'})
  pros?: string
}

@Entity('tbl_Proposta')
export class Proposta {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Time, (time) => time.propostas)
  @JoinColumn()
  de: Time
  @ManyToOne(() => Perfil, (perfil) => perfil.propostas)
  @JoinColumn()
  para: Perfil
  @Column({type : 'text'})
  menssagem: string
}

@Entity('tbl_Peneira')
export class Peneira {
  @PrimaryGeneratedColumn()
  id: number
  @OneToOne(() => Time)
  @JoinColumn()
  time: Time
  @ManyToMany(() => Perfil)
  @JoinColumn()
  jogadores?: Perfil[]
  @Column({type : 'text'})
  menssagem: string
}

@Entity('tbl_Notificacao')
export class Notificacao {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Perfil, (perfil) => perfil.notificacoes)
  @JoinColumn()
  de: Perfil
  @Column({type : 'text'})
  menssagem: string
  @Column({type : 'text'})
  titulo: string
}


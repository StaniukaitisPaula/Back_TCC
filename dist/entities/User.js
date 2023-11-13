"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notificacao = exports.Peneira = exports.Proposta = exports.Postagem = exports.Jogador = exports.Time = exports.Organizacao = exports.Perfil = void 0;
const typeorm_1 = require("typeorm");
const Genero_1 = require("./enum/Genero");
const Jogo_1 = require("./enum/Jogo");
const Funcao_1 = require("./enum/Funcao");
const Elo_1 = require("./enum/Elo");
let Perfil = class Perfil {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Perfil.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Perfil.prototype, "nome_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Perfil.prototype, "nome_completo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, unique: true }),
    __metadata("design:type", String)
], Perfil.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Perfil.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Perfil.prototype, "data_nascimento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Perfil.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Perfil.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Perfil.prototype, "biografia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Proposta, (proposta) => proposta.para),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Perfil.prototype, "propostas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notificacao, (notificacao) => notificacao.de),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Perfil.prototype, "notificacoes", void 0);
Perfil = __decorate([
    (0, typeorm_1.Entity)('tbl_perfil')
], Perfil);
exports.Perfil = Perfil;
let Organizacao = class Organizacao {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Organizacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Perfil),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Perfil)
], Organizacao.prototype, "dono_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Time, (time) => time.organizacao),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Organizacao.prototype, "times", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Organizacao.prototype, "nome_organizacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Organizacao.prototype, "biografia", void 0);
Organizacao = __decorate([
    (0, typeorm_1.Entity)('tbl_organizacao')
], Organizacao);
exports.Organizacao = Organizacao;
let Time = class Time {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Time.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organizacao, (organizacao) => organizacao.times, { orphanedRowAction: 'delete', onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Organizacao)
], Time.prototype, "organizacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Time.prototype, "nome_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Time.prototype, "jogo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Time.prototype, "biografia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Jogador, (jogador) => jogador.time_atual, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Time.prototype, "jogadores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Proposta, (proposta) => proposta.de, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Time.prototype, "propostas", void 0);
Time = __decorate([
    (0, typeorm_1.Entity)('tbl_time')
], Time);
exports.Time = Time;
let Jogador = class Jogador {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Jogador.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Perfil),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Perfil)
], Jogador.prototype, "perfil_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Jogador.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Jogador.prototype, "jogo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Jogador.prototype, "funcao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Jogador.prototype, "elo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Time, (time) => time.jogadores, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Time)
], Jogador.prototype, "time_atual", void 0);
Jogador = __decorate([
    (0, typeorm_1.Entity)('tbl_jogador')
], Jogador);
exports.Jogador = Jogador;
let Postagem = class Postagem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Postagem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Perfil),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Perfil)
], Postagem.prototype, "dono_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Postagem.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Postagem.prototype, "jogo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Postagem.prototype, "funcao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Postagem.prototype, "elo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Postagem.prototype, "hora", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean" }),
    __metadata("design:type", Boolean)
], Postagem.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Postagem.prototype, "pros", void 0);
Postagem = __decorate([
    (0, typeorm_1.Entity)('tbl_Postagem')
], Postagem);
exports.Postagem = Postagem;
let Proposta = class Proposta {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Proposta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Time, (time) => time.propostas),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Time)
], Proposta.prototype, "de", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Perfil, (perfil) => perfil.propostas),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Perfil)
], Proposta.prototype, "para", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Proposta.prototype, "menssagem", void 0);
Proposta = __decorate([
    (0, typeorm_1.Entity)('tbl_Proposta')
], Proposta);
exports.Proposta = Proposta;
let Peneira = class Peneira {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Peneira.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Perfil),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Time)
], Peneira.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Perfil),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Peneira.prototype, "jogadores", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Peneira.prototype, "menssagem", void 0);
Peneira = __decorate([
    (0, typeorm_1.Entity)('tbl_Peneira')
], Peneira);
exports.Peneira = Peneira;
let Notificacao = class Notificacao {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notificacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Perfil, (perfil) => perfil.notificacoes),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Perfil)
], Notificacao.prototype, "de", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Notificacao.prototype, "menssagem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Notificacao.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Notificacao.prototype, "link", void 0);
Notificacao = __decorate([
    (0, typeorm_1.Entity)('tbl_Notificacao')
], Notificacao);
exports.Notificacao = Notificacao;

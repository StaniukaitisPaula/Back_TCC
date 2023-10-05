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
exports.Organizacao = exports.Jogador = exports.Perfil = void 0;
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
Perfil = __decorate([
    (0, typeorm_1.Entity)('tbl_perfil')
], Perfil);
exports.Perfil = Perfil;
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
Jogador = __decorate([
    (0, typeorm_1.Entity)('tbl_jogador')
], Jogador);
exports.Jogador = Jogador;
let Organizacao = class Organizacao {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Organizacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Perfil),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Perfil
    // @OneToMany(() => Time, (time) => time.organizacao)
    // @JoinColumn()
    // times: Time[]
    )
], Organizacao.prototype, "dono_id", void 0);
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
// @Entity('tbl_time')
// export class Time{
//   @PrimaryGeneratedColumn()
//   id: number
//   @ManyToOne(() => Organizacao, (organizacao) => organizacao.times)
//   @JoinColumn()
//   organizacao: Organizacao
//   @Column({length: 100})
//   nome_time: string
//   @Column({type: 'text'})
//   biografia: string
//   @OneToMany(() => Organizacao, (organizacao) => organizacao.times)
//   @JoinColumn()
//   jogadores: Organizacao
// }

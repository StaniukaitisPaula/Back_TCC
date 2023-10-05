"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1696420851693 = void 0;
class Default1696420851693 {
    constructor() {
        this.name = 'Default1696420851693';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tbl_perfil\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_usuario\` varchar(100) NOT NULL, \`nome_completo\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` text NOT NULL, \`data_nascimento\` date NOT NULL, \`genero\` int NOT NULL, \`nickname\` varchar(100) NOT NULL, \`biografia\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_bb0384a7728c6ba7f54fffbdde\` (\`nome_usuario\`), UNIQUE INDEX \`IDX_f7e13d8188cfefb0d2017393f6\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_jogador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`jogo\` int NOT NULL, \`funcao\` int NOT NULL, \`elo\` int NOT NULL, \`perfilIdId\` int NULL, UNIQUE INDEX \`REL_500cb4dfcbcb05ad24951f8b8b\` (\`perfilIdId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_organizacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_organizacao\` varchar(100) NOT NULL, \`biografia\` text NOT NULL, \`donoIdId\` int NULL, UNIQUE INDEX \`REL_65c69c703cd0e751a6d8f55297\` (\`donoIdId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_500cb4dfcbcb05ad24951f8b8b8\` FOREIGN KEY (\`perfilIdId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_organizacao\` ADD CONSTRAINT \`FK_65c69c703cd0e751a6d8f55297d\` FOREIGN KEY (\`donoIdId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_organizacao\` DROP FOREIGN KEY \`FK_65c69c703cd0e751a6d8f55297d\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_500cb4dfcbcb05ad24951f8b8b8\``);
        await queryRunner.query(`DROP INDEX \`REL_65c69c703cd0e751a6d8f55297\` ON \`tbl_organizacao\``);
        await queryRunner.query(`DROP TABLE \`tbl_organizacao\``);
        await queryRunner.query(`DROP INDEX \`REL_500cb4dfcbcb05ad24951f8b8b\` ON \`tbl_jogador\``);
        await queryRunner.query(`DROP TABLE \`tbl_jogador\``);
        await queryRunner.query(`DROP INDEX \`IDX_f7e13d8188cfefb0d2017393f6\` ON \`tbl_perfil\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb0384a7728c6ba7f54fffbdde\` ON \`tbl_perfil\``);
        await queryRunner.query(`DROP TABLE \`tbl_perfil\``);
    }
}
exports.Default1696420851693 = Default1696420851693;

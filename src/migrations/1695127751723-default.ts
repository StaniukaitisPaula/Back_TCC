import { MigrationInterface, QueryRunner } from "typeorm";

export class default1695127751723 implements MigrationInterface {
    name = 'default1695127751723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_perfil\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_usuario\` varchar(100) NOT NULL, \`nome_completo\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` text NOT NULL, \`data_nascimento\` date NOT NULL, \`foto_perfil\` text NOT NULL, \`foto_capa\` text NOT NULL, \`genero\` int NOT NULL, UNIQUE INDEX \`IDX_bb0384a7728c6ba7f54fffbdde\` (\`nome_usuario\`), UNIQUE INDEX \`IDX_f7e13d8188cfefb0d2017393f6\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_jogador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(100) NOT NULL, \`biografia\` varchar(255) NOT NULL, \`jogo\` int NOT NULL, \`funcao\` int NOT NULL, \`perfilId\` int NULL, UNIQUE INDEX \`REL_5b6812c9452989f57501d8bf69\` (\`perfilId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_organizador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_organizacao\` varchar(100) NOT NULL, \`foto_organizacao\` text NOT NULL, \`perfilId\` int NULL, UNIQUE INDEX \`REL_109c3fa2a73276aef279dd4a96\` (\`perfilId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_5b6812c9452989f57501d8bf691\` FOREIGN KEY (\`perfilId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_organizador\` ADD CONSTRAINT \`FK_109c3fa2a73276aef279dd4a964\` FOREIGN KEY (\`perfilId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_organizador\` DROP FOREIGN KEY \`FK_109c3fa2a73276aef279dd4a964\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_5b6812c9452989f57501d8bf691\``);
        await queryRunner.query(`DROP INDEX \`REL_109c3fa2a73276aef279dd4a96\` ON \`tbl_organizador\``);
        await queryRunner.query(`DROP TABLE \`tbl_organizador\``);
        await queryRunner.query(`DROP INDEX \`REL_5b6812c9452989f57501d8bf69\` ON \`tbl_jogador\``);
        await queryRunner.query(`DROP TABLE \`tbl_jogador\``);
        await queryRunner.query(`DROP INDEX \`IDX_f7e13d8188cfefb0d2017393f6\` ON \`tbl_perfil\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb0384a7728c6ba7f54fffbdde\` ON \`tbl_perfil\``);
        await queryRunner.query(`DROP TABLE \`tbl_perfil\``);
    }

}

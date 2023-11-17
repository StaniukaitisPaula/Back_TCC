import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700220902168 implements MigrationInterface {
    name = 'Default1700220902168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_perfil\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_usuario\` varchar(100) NOT NULL, \`nome_completo\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` text NOT NULL, \`data_nascimento\` date NOT NULL, \`genero\` int NOT NULL, \`nickname\` varchar(100) NOT NULL, \`biografia\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_bb0384a7728c6ba7f54fffbdde\` (\`nome_usuario\`), UNIQUE INDEX \`IDX_f7e13d8188cfefb0d2017393f6\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_time\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_time\` varchar(100) NOT NULL, \`jogo\` int NOT NULL, \`biografia\` text NOT NULL, \`donoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_jogador\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(100) NOT NULL, \`jogo\` int NOT NULL, \`funcao\` int NOT NULL, \`elo\` int NOT NULL, \`perfilIdId\` int NULL, \`timeAtualId\` int NULL, UNIQUE INDEX \`REL_500cb4dfcbcb05ad24951f8b8b\` (\`perfilIdId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Postagem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` text NOT NULL, \`jogo\` int NOT NULL, \`funcao\` int NOT NULL, \`elo\` int NOT NULL, \`hora\` varchar(255) NOT NULL, \`tipo\` tinyint NOT NULL, \`pros\` text NOT NULL, \`donoIdId\` int NULL, \`timeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Proposta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, \`deId\` int NULL, \`paraId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Peneira\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, \`timeId\` int NULL, UNIQUE INDEX \`REL_dff06076b770683a07b9ae3510\` (\`timeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Notificacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, \`titulo\` text NOT NULL, \`deId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` ADD CONSTRAINT \`FK_5e017612564bea75825be7a1b0c\` FOREIGN KEY (\`donoId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_500cb4dfcbcb05ad24951f8b8b8\` FOREIGN KEY (\`perfilIdId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_a050d70c0ec7710025b5ee26e15\` FOREIGN KEY (\`timeAtualId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD CONSTRAINT \`FK_936000fd9e1ea024d8058a7e7fe\` FOREIGN KEY (\`donoIdId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD CONSTRAINT \`FK_4bbeb53cfc39062fa3ab899745f\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` ADD CONSTRAINT \`FK_2467df85cfb5dd0cdc38ba926e4\` FOREIGN KEY (\`deId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` ADD CONSTRAINT \`FK_393d06ec0144f113c41b91cc03e\` FOREIGN KEY (\`paraId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Peneira\` ADD CONSTRAINT \`FK_dff06076b770683a07b9ae35101\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Notificacao\` ADD CONSTRAINT \`FK_9567505054864039e26899f0153\` FOREIGN KEY (\`deId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_Notificacao\` DROP FOREIGN KEY \`FK_9567505054864039e26899f0153\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Peneira\` DROP FOREIGN KEY \`FK_dff06076b770683a07b9ae35101\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP FOREIGN KEY \`FK_393d06ec0144f113c41b91cc03e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP FOREIGN KEY \`FK_2467df85cfb5dd0cdc38ba926e4\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP FOREIGN KEY \`FK_4bbeb53cfc39062fa3ab899745f\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP FOREIGN KEY \`FK_936000fd9e1ea024d8058a7e7fe\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_a050d70c0ec7710025b5ee26e15\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_500cb4dfcbcb05ad24951f8b8b8\``);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` DROP FOREIGN KEY \`FK_5e017612564bea75825be7a1b0c\``);
        await queryRunner.query(`DROP TABLE \`tbl_Notificacao\``);
        await queryRunner.query(`DROP INDEX \`REL_dff06076b770683a07b9ae3510\` ON \`tbl_Peneira\``);
        await queryRunner.query(`DROP TABLE \`tbl_Peneira\``);
        await queryRunner.query(`DROP TABLE \`tbl_Proposta\``);
        await queryRunner.query(`DROP TABLE \`tbl_Postagem\``);
        await queryRunner.query(`DROP INDEX \`REL_500cb4dfcbcb05ad24951f8b8b\` ON \`tbl_jogador\``);
        await queryRunner.query(`DROP TABLE \`tbl_jogador\``);
        await queryRunner.query(`DROP TABLE \`tbl_time\``);
        await queryRunner.query(`DROP INDEX \`IDX_f7e13d8188cfefb0d2017393f6\` ON \`tbl_perfil\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb0384a7728c6ba7f54fffbdde\` ON \`tbl_perfil\``);
        await queryRunner.query(`DROP TABLE \`tbl_perfil\``);
    }

}

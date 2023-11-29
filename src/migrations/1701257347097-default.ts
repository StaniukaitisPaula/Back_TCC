import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701257347097 implements MigrationInterface {
    name = 'Default1701257347097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_Postagem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` text NOT NULL, \`jogo\` int NOT NULL, \`funcao\` int NOT NULL, \`elo\` int NOT NULL, \`hora\` varchar(255) NOT NULL, \`tipo\` tinyint NOT NULL, \`pros\` text NOT NULL, \`donoIdId\` int NULL, \`timeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Proposta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, \`deId\` int NULL, \`paraId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Peneira\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, \`timeId\` int NULL, UNIQUE INDEX \`REL_dff06076b770683a07b9ae3510\` (\`timeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Notificacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, \`titulo\` text NOT NULL, \`deId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_highlight\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(100) NOT NULL, \`donoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_redeSocial\` (\`id\` int NOT NULL AUTO_INCREMENT, \`link\` varchar(100) NOT NULL, \`tipo\` int NOT NULL, \`donoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD CONSTRAINT \`FK_936000fd9e1ea024d8058a7e7fe\` FOREIGN KEY (\`donoIdId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD CONSTRAINT \`FK_4bbeb53cfc39062fa3ab899745f\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` ADD CONSTRAINT \`FK_2467df85cfb5dd0cdc38ba926e4\` FOREIGN KEY (\`deId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` ADD CONSTRAINT \`FK_393d06ec0144f113c41b91cc03e\` FOREIGN KEY (\`paraId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Peneira\` ADD CONSTRAINT \`FK_dff06076b770683a07b9ae35101\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Notificacao\` ADD CONSTRAINT \`FK_9567505054864039e26899f0153\` FOREIGN KEY (\`deId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_highlight\` ADD CONSTRAINT \`FK_4bb0ea92981f296095b873e3767\` FOREIGN KEY (\`donoId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_redeSocial\` ADD CONSTRAINT \`FK_237b15577650769edff861c18f3\` FOREIGN KEY (\`donoId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_redeSocial\` DROP FOREIGN KEY \`FK_237b15577650769edff861c18f3\``);
        await queryRunner.query(`ALTER TABLE \`tbl_highlight\` DROP FOREIGN KEY \`FK_4bb0ea92981f296095b873e3767\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Notificacao\` DROP FOREIGN KEY \`FK_9567505054864039e26899f0153\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Peneira\` DROP FOREIGN KEY \`FK_dff06076b770683a07b9ae35101\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP FOREIGN KEY \`FK_393d06ec0144f113c41b91cc03e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP FOREIGN KEY \`FK_2467df85cfb5dd0cdc38ba926e4\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP FOREIGN KEY \`FK_4bbeb53cfc39062fa3ab899745f\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP FOREIGN KEY \`FK_936000fd9e1ea024d8058a7e7fe\``);
        await queryRunner.query(`DROP TABLE \`tbl_redeSocial\``);
        await queryRunner.query(`DROP TABLE \`tbl_highlight\``);
        await queryRunner.query(`DROP TABLE \`tbl_Notificacao\``);
        await queryRunner.query(`DROP INDEX \`REL_dff06076b770683a07b9ae3510\` ON \`tbl_Peneira\``);
        await queryRunner.query(`DROP TABLE \`tbl_Peneira\``);
        await queryRunner.query(`DROP TABLE \`tbl_Proposta\``);
        await queryRunner.query(`DROP TABLE \`tbl_Postagem\``);
    }

}

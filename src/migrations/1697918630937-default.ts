import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697918630937 implements MigrationInterface {
    name = 'Default1697918630937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_Postagem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` text NOT NULL, \`jogo\` int NOT NULL, \`funcao\` int NOT NULL, \`elo\` int NOT NULL, \`hora\` varchar(255) NOT NULL, \`tipo\` tinyint NOT NULL, \`donoIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Proposta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD CONSTRAINT \`FK_936000fd9e1ea024d8058a7e7fe\` FOREIGN KEY (\`donoIdId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP FOREIGN KEY \`FK_936000fd9e1ea024d8058a7e7fe\``);
        await queryRunner.query(`DROP TABLE \`tbl_Proposta\``);
        await queryRunner.query(`DROP TABLE \`tbl_Postagem\``);
    }

}

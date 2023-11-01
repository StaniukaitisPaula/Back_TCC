import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1698836262637 implements MigrationInterface {
    name = 'Default1698836262637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_Notificacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, \`titulo\` text NOT NULL, \`link\` text NOT NULL, \`deId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_Notificacao\` ADD CONSTRAINT \`FK_9567505054864039e26899f0153\` FOREIGN KEY (\`deId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_Notificacao\` DROP FOREIGN KEY \`FK_9567505054864039e26899f0153\``);
        await queryRunner.query(`DROP TABLE \`tbl_Notificacao\``);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701094049303 implements MigrationInterface {
    name = 'Default1701094049303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_redeSocial\` (\`id\` int NOT NULL AUTO_INCREMENT, \`link\` varchar(100) NOT NULL, \`donoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_redeSocial\` ADD CONSTRAINT \`FK_237b15577650769edff861c18f3\` FOREIGN KEY (\`donoId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_redeSocial\` DROP FOREIGN KEY \`FK_237b15577650769edff861c18f3\``);
        await queryRunner.query(`DROP TABLE \`tbl_redeSocial\``);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701044125468 implements MigrationInterface {
    name = 'Default1701044125468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_highlight\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(100) NOT NULL, \`donoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_highlight\` ADD CONSTRAINT \`FK_4bb0ea92981f296095b873e3767\` FOREIGN KEY (\`donoId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_highlight\` DROP FOREIGN KEY \`FK_4bb0ea92981f296095b873e3767\``);
        await queryRunner.query(`DROP TABLE \`tbl_highlight\``);
    }

}

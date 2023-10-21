import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697913313393 implements MigrationInterface {
    name = 'Default1697913313393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD \`hora\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP COLUMN \`hora\``);
    }

}

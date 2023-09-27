import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695773251826 implements MigrationInterface {
    name = 'Default1695773251826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_perfil\` DROP COLUMN \`foto_capa\``);
        await queryRunner.query(`ALTER TABLE \`tbl_perfil\` DROP COLUMN \`foto_perfil\``);
        await queryRunner.query(`ALTER TABLE \`tbl_organizador\` DROP COLUMN \`foto_organizacao\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_organizador\` ADD \`foto_organizacao\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_perfil\` ADD \`foto_perfil\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_perfil\` ADD \`foto_capa\` text NOT NULL`);
    }

}

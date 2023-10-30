import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1698672166708 implements MigrationInterface {
    name = 'Default1698672166708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD \`pros\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP COLUMN \`pros\``);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701256365018 implements MigrationInterface {
    name = 'Default1701256365018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_redeSocial\` ADD \`tipo\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_redeSocial\` DROP COLUMN \`tipo\``);
    }

}

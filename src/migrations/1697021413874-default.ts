import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697021413874 implements MigrationInterface {
    name = 'Default1697021413874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD \`nickname\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP COLUMN \`nickname\``);
    }

}

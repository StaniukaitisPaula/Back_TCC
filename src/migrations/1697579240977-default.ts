import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697579240977 implements MigrationInterface {
    name = 'Default1697579240977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_time\` ADD \`jogo\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_time\` DROP COLUMN \`jogo\``);
    }

}

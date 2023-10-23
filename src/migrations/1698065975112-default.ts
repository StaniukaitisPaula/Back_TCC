import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1698065975112 implements MigrationInterface {
    name = 'Default1698065975112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD \`ativoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_8710108e9a0c7fface41d343ca2\` FOREIGN KEY (\`ativoId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_8710108e9a0c7fface41d343ca2\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP COLUMN \`ativoId\``);
    }

}

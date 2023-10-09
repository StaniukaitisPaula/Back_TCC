import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1696850489136 implements MigrationInterface {
    name = 'Default1696850489136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_time\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_time\` varchar(100) NOT NULL, \`biografia\` text NOT NULL, \`organizacaoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD \`timeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` ADD CONSTRAINT \`FK_5effd4dcfaca6b36904ad0d748e\` FOREIGN KEY (\`organizacaoId\`) REFERENCES \`tbl_organizacao\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_994e301d7fcec2e5acd83ade9a7\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_994e301d7fcec2e5acd83ade9a7\``);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` DROP FOREIGN KEY \`FK_5effd4dcfaca6b36904ad0d748e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP COLUMN \`timeId\``);
        await queryRunner.query(`DROP TABLE \`tbl_time\``);
    }

}

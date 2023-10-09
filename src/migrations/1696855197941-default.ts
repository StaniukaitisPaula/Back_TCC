import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1696855197941 implements MigrationInterface {
    name = 'Default1696855197941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_994e301d7fcec2e5acd83ade9a7\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` CHANGE \`timeId\` \`timeAtualId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_a050d70c0ec7710025b5ee26e15\` FOREIGN KEY (\`timeAtualId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_a050d70c0ec7710025b5ee26e15\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` CHANGE \`timeAtualId\` \`timeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_994e301d7fcec2e5acd83ade9a7\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701263348967 implements MigrationInterface {
    name = 'Default1701263348967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_peneira_jogadores_tbl_jogador\` (\`tblPeneiraId\` int NOT NULL, \`tblJogadorId\` int NOT NULL, INDEX \`IDX_e665c1ea302a47482c49e1da91\` (\`tblPeneiraId\`), INDEX \`IDX_bb5c5875bfe3772d9ea4fd0073\` (\`tblJogadorId\`), PRIMARY KEY (\`tblPeneiraId\`, \`tblJogadorId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_peneira_jogadores_tbl_jogador\` ADD CONSTRAINT \`FK_e665c1ea302a47482c49e1da917\` FOREIGN KEY (\`tblPeneiraId\`) REFERENCES \`tbl_Peneira\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tbl_peneira_jogadores_tbl_jogador\` ADD CONSTRAINT \`FK_bb5c5875bfe3772d9ea4fd0073b\` FOREIGN KEY (\`tblJogadorId\`) REFERENCES \`tbl_jogador\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_peneira_jogadores_tbl_jogador\` DROP FOREIGN KEY \`FK_bb5c5875bfe3772d9ea4fd0073b\``);
        await queryRunner.query(`ALTER TABLE \`tbl_peneira_jogadores_tbl_jogador\` DROP FOREIGN KEY \`FK_e665c1ea302a47482c49e1da917\``);
        await queryRunner.query(`ALTER TABLE \`tbl_redeSocial\` DROP FOREIGN KEY \`FK_237b15577650769edff861c18f3\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Notificacao\` DROP FOREIGN KEY \`FK_9567505054864039e26899f0153\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Peneira\` DROP FOREIGN KEY \`FK_dff06076b770683a07b9ae35101\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP FOREIGN KEY \`FK_393d06ec0144f113c41b91cc03e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP FOREIGN KEY \`FK_2467df85cfb5dd0cdc38ba926e4\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP FOREIGN KEY \`FK_4bbeb53cfc39062fa3ab899745f\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP FOREIGN KEY \`FK_936000fd9e1ea024d8058a7e7fe\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb5c5875bfe3772d9ea4fd0073\` ON \`tbl_peneira_jogadores_tbl_jogador\``);
        await queryRunner.query(`DROP INDEX \`IDX_e665c1ea302a47482c49e1da91\` ON \`tbl_peneira_jogadores_tbl_jogador\``);
        await queryRunner.query(`DROP TABLE \`tbl_peneira_jogadores_tbl_jogador\``);
        await queryRunner.query(`DROP TABLE \`tbl_redeSocial\``);
        await queryRunner.query(`DROP TABLE \`tbl_Notificacao\``);
        await queryRunner.query(`DROP INDEX \`REL_dff06076b770683a07b9ae3510\` ON \`tbl_Peneira\``);
        await queryRunner.query(`DROP TABLE \`tbl_Peneira\``);
        await queryRunner.query(`DROP TABLE \`tbl_Proposta\``);
        await queryRunner.query(`DROP TABLE \`tbl_Postagem\``);
    }

}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1696850489136 = void 0;
class Default1696850489136 {
    constructor() {
        this.name = 'Default1696850489136';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tbl_time\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_time\` varchar(100) NOT NULL, \`biografia\` text NOT NULL, \`organizacaoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD \`timeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` ADD CONSTRAINT \`FK_5effd4dcfaca6b36904ad0d748e\` FOREIGN KEY (\`organizacaoId\`) REFERENCES \`tbl_organizacao\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_994e301d7fcec2e5acd83ade9a7\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_994e301d7fcec2e5acd83ade9a7\``);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` DROP FOREIGN KEY \`FK_5effd4dcfaca6b36904ad0d748e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP COLUMN \`timeId\``);
        await queryRunner.query(`DROP TABLE \`tbl_time\``);
    }
}
exports.Default1696850489136 = Default1696850489136;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1698062874974 = void 0;
class Default1698062874974 {
    constructor() {
        this.name = 'Default1698062874974';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_time\` DROP FOREIGN KEY \`FK_5effd4dcfaca6b36904ad0d748e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_a050d70c0ec7710025b5ee26e15\``);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` ADD CONSTRAINT \`FK_5effd4dcfaca6b36904ad0d748e\` FOREIGN KEY (\`organizacaoId\`) REFERENCES \`tbl_organizacao\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_a050d70c0ec7710025b5ee26e15\` FOREIGN KEY (\`timeAtualId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_a050d70c0ec7710025b5ee26e15\``);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` DROP FOREIGN KEY \`FK_5effd4dcfaca6b36904ad0d748e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_a050d70c0ec7710025b5ee26e15\` FOREIGN KEY (\`timeAtualId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` ADD CONSTRAINT \`FK_5effd4dcfaca6b36904ad0d748e\` FOREIGN KEY (\`organizacaoId\`) REFERENCES \`tbl_organizacao\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
exports.Default1698062874974 = Default1698062874974;

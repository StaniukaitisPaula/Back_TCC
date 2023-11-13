"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1699280269686 = void 0;
class Default1699280269686 {
    constructor() {
        this.name = 'Default1699280269686';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_8710108e9a0c7fface41d343ca2\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_a050d70c0ec7710025b5ee26e15\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP COLUMN \`ativoId\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_a050d70c0ec7710025b5ee26e15\` FOREIGN KEY (\`timeAtualId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_a050d70c0ec7710025b5ee26e15\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD \`ativoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_a050d70c0ec7710025b5ee26e15\` FOREIGN KEY (\`timeAtualId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_8710108e9a0c7fface41d343ca2\` FOREIGN KEY (\`ativoId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.Default1699280269686 = Default1699280269686;

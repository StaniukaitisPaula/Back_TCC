"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1698065975112 = void 0;
class Default1698065975112 {
    constructor() {
        this.name = 'Default1698065975112';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD \`ativoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` ADD CONSTRAINT \`FK_8710108e9a0c7fface41d343ca2\` FOREIGN KEY (\`ativoId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP FOREIGN KEY \`FK_8710108e9a0c7fface41d343ca2\``);
        await queryRunner.query(`ALTER TABLE \`tbl_jogador\` DROP COLUMN \`ativoId\``);
    }
}
exports.Default1698065975112 = Default1698065975112;

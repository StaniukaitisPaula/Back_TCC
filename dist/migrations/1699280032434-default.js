"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1699280032434 = void 0;
class Default1699280032434 {
    constructor() {
        this.name = 'Default1699280032434';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_time\` DROP FOREIGN KEY \`FK_5effd4dcfaca6b36904ad0d748e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` ADD CONSTRAINT \`FK_5effd4dcfaca6b36904ad0d748e\` FOREIGN KEY (\`organizacaoId\`) REFERENCES \`tbl_organizacao\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_time\` DROP FOREIGN KEY \`FK_5effd4dcfaca6b36904ad0d748e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_time\` ADD CONSTRAINT \`FK_5effd4dcfaca6b36904ad0d748e\` FOREIGN KEY (\`organizacaoId\`) REFERENCES \`tbl_organizacao\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.Default1699280032434 = Default1699280032434;

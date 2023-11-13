"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1698148142313 = void 0;
class Default1698148142313 {
    constructor() {
        this.name = 'Default1698148142313';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` ADD \`deId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` ADD \`paraId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` ADD CONSTRAINT \`FK_2467df85cfb5dd0cdc38ba926e4\` FOREIGN KEY (\`deId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` ADD CONSTRAINT \`FK_393d06ec0144f113c41b91cc03e\` FOREIGN KEY (\`paraId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP FOREIGN KEY \`FK_393d06ec0144f113c41b91cc03e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP FOREIGN KEY \`FK_2467df85cfb5dd0cdc38ba926e4\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP COLUMN \`paraId\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Proposta\` DROP COLUMN \`deId\``);
    }
}
exports.Default1698148142313 = Default1698148142313;

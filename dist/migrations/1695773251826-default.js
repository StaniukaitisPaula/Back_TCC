"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1695773251826 = void 0;
class Default1695773251826 {
    constructor() {
        this.name = 'Default1695773251826';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_perfil\` DROP COLUMN \`foto_capa\``);
        await queryRunner.query(`ALTER TABLE \`tbl_perfil\` DROP COLUMN \`foto_perfil\``);
        await queryRunner.query(`ALTER TABLE \`tbl_organizador\` DROP COLUMN \`foto_organizacao\``);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_organizador\` ADD \`foto_organizacao\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_perfil\` ADD \`foto_perfil\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tbl_perfil\` ADD \`foto_capa\` text NOT NULL`);
    }
}
exports.Default1695773251826 = Default1695773251826;

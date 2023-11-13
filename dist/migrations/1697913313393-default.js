"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1697913313393 = void 0;
class Default1697913313393 {
    constructor() {
        this.name = 'Default1697913313393';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD \`hora\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP COLUMN \`hora\``);
    }
}
exports.Default1697913313393 = Default1697913313393;

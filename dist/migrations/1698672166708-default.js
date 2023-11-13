"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1698672166708 = void 0;
class Default1698672166708 {
    constructor() {
        this.name = 'Default1698672166708';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD \`pros\` text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP COLUMN \`pros\``);
    }
}
exports.Default1698672166708 = Default1698672166708;

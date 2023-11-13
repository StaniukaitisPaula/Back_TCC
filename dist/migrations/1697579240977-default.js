"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1697579240977 = void 0;
class Default1697579240977 {
    constructor() {
        this.name = 'Default1697579240977';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_time\` ADD \`jogo\` int NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_time\` DROP COLUMN \`jogo\``);
    }
}
exports.Default1697579240977 = Default1697579240977;

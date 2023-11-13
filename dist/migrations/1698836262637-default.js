"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1698836262637 = void 0;
class Default1698836262637 {
    constructor() {
        this.name = 'Default1698836262637';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tbl_Notificacao\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, \`titulo\` text NOT NULL, \`link\` text NOT NULL, \`deId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_Notificacao\` ADD CONSTRAINT \`FK_9567505054864039e26899f0153\` FOREIGN KEY (\`deId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_Notificacao\` DROP FOREIGN KEY \`FK_9567505054864039e26899f0153\``);
        await queryRunner.query(`DROP TABLE \`tbl_Notificacao\``);
    }
}
exports.Default1698836262637 = Default1698836262637;

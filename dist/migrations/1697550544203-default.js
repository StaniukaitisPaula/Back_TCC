"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1697550544203 = void 0;
class Default1697550544203 {
    constructor() {
        this.name = 'Default1697550544203';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`tbl_Postagem\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` text NOT NULL, \`jogo\` int NOT NULL, \`funcao\` int NOT NULL, \`elo\` int NOT NULL, \`tipo\` tinyint NOT NULL, \`donoIdId\` int NULL, UNIQUE INDEX \`REL_936000fd9e1ea024d8058a7e7f\` (\`donoIdId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Proposta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_Peneira\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menssagem\` text NOT NULL, \`timeId\` int NULL, UNIQUE INDEX \`REL_dff06076b770683a07b9ae3510\` (\`timeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` ADD CONSTRAINT \`FK_936000fd9e1ea024d8058a7e7fe\` FOREIGN KEY (\`donoIdId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_Peneira\` ADD CONSTRAINT \`FK_dff06076b770683a07b9ae35101\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`tbl_Peneira\` DROP FOREIGN KEY \`FK_dff06076b770683a07b9ae35101\``);
        await queryRunner.query(`ALTER TABLE \`tbl_Postagem\` DROP FOREIGN KEY \`FK_936000fd9e1ea024d8058a7e7fe\``);
        await queryRunner.query(`DROP INDEX \`REL_dff06076b770683a07b9ae3510\` ON \`tbl_Peneira\``);
        await queryRunner.query(`DROP TABLE \`tbl_Peneira\``);
        await queryRunner.query(`DROP TABLE \`tbl_Proposta\``);
        await queryRunner.query(`DROP INDEX \`REL_936000fd9e1ea024d8058a7e7f\` ON \`tbl_Postagem\``);
        await queryRunner.query(`DROP TABLE \`tbl_Postagem\``);
    }
}
exports.Default1697550544203 = Default1697550544203;

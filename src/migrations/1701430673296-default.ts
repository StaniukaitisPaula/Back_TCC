import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701430673296 implements MigrationInterface {
    name = 'Default1701430673296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_proposta\` DROP FOREIGN KEY \`FK_9364a1e9d3f6261d885bfda1bc5\``);
        await queryRunner.query(`ALTER TABLE \`tbl_peneira\` DROP FOREIGN KEY \`FK_98e9fb32aa41ac9d26fc165ec28\``);
        await queryRunner.query(`ALTER TABLE \`tbl_peneira\` ADD UNIQUE INDEX \`IDX_98e9fb32aa41ac9d26fc165ec2\` (\`timeId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_98e9fb32aa41ac9d26fc165ec2\` ON \`tbl_peneira\` (\`timeId\`)`);
        await queryRunner.query(`ALTER TABLE \`tbl_proposta\` ADD CONSTRAINT \`FK_9364a1e9d3f6261d885bfda1bc5\` FOREIGN KEY (\`deId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_peneira\` ADD CONSTRAINT \`FK_98e9fb32aa41ac9d26fc165ec28\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_redeSocial\` ADD CONSTRAINT \`FK_237b15577650769edff861c18f3\` FOREIGN KEY (\`donoId\`) REFERENCES \`tbl_perfil\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_redeSocial\` DROP FOREIGN KEY \`FK_237b15577650769edff861c18f3\``);
        await queryRunner.query(`ALTER TABLE \`tbl_peneira\` DROP FOREIGN KEY \`FK_98e9fb32aa41ac9d26fc165ec28\``);
        await queryRunner.query(`ALTER TABLE \`tbl_proposta\` DROP FOREIGN KEY \`FK_9364a1e9d3f6261d885bfda1bc5\``);
        await queryRunner.query(`DROP INDEX \`REL_98e9fb32aa41ac9d26fc165ec2\` ON \`tbl_peneira\``);
        await queryRunner.query(`ALTER TABLE \`tbl_peneira\` DROP INDEX \`IDX_98e9fb32aa41ac9d26fc165ec2\``);
        await queryRunner.query(`DROP TABLE \`tbl_redeSocial\``);
        await queryRunner.query(`ALTER TABLE \`tbl_peneira\` ADD CONSTRAINT \`FK_98e9fb32aa41ac9d26fc165ec28\` FOREIGN KEY (\`timeId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_proposta\` ADD CONSTRAINT \`FK_9364a1e9d3f6261d885bfda1bc5\` FOREIGN KEY (\`deId\`) REFERENCES \`tbl_time\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOptionJoin1730202701836 implements MigrationInterface {
    name = 'AddOptionJoin1730202701836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`question_options\` DROP FOREIGN KEY \`FK_c654af7759a681f1b1addbe35bf\``);
        await queryRunner.query(`ALTER TABLE \`question_options\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`selected_question\` DROP FOREIGN KEY \`FK_c380870f70d580fbf32f9b341ab\``);
        await queryRunner.query(`ALTER TABLE \`selected_question\` DROP FOREIGN KEY \`FK_84092ad544ddd2fe6a68b7defe9\``);
        await queryRunner.query(`ALTER TABLE \`selected_question\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`selected_question\` CHANGE \`userRegionId\` \`userRegionId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`question_options\` ADD CONSTRAINT \`FK_c654af7759a681f1b1addbe35bf\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`selected_question\` ADD CONSTRAINT \`FK_c380870f70d580fbf32f9b341ab\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`selected_question\` ADD CONSTRAINT \`FK_84092ad544ddd2fe6a68b7defe9\` FOREIGN KEY (\`userRegionId\`) REFERENCES \`app_user_region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`selected_question\` DROP FOREIGN KEY \`FK_84092ad544ddd2fe6a68b7defe9\``);
        await queryRunner.query(`ALTER TABLE \`selected_question\` DROP FOREIGN KEY \`FK_c380870f70d580fbf32f9b341ab\``);
        await queryRunner.query(`ALTER TABLE \`question_options\` DROP FOREIGN KEY \`FK_c654af7759a681f1b1addbe35bf\``);
        await queryRunner.query(`ALTER TABLE \`selected_question\` CHANGE \`userRegionId\` \`userRegionId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`selected_question\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`selected_question\` ADD CONSTRAINT \`FK_84092ad544ddd2fe6a68b7defe9\` FOREIGN KEY (\`userRegionId\`) REFERENCES \`app_user_region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`selected_question\` ADD CONSTRAINT \`FK_c380870f70d580fbf32f9b341ab\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_options\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question_options\` ADD CONSTRAINT \`FK_c654af7759a681f1b1addbe35bf\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

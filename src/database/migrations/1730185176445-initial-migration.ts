import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1730185176445 implements MigrationInterface {
    name = 'InitialMigration1730185176445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`app_user_region\` (\`id\` varchar(36) NOT NULL, \`userRegion\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question_options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`optionBody\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`questionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question\` (\`id\` varchar(36) NOT NULL, \`questionBody\` varchar(255) NOT NULL, \`allowVoiceReply\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`selected_question\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`questionId\` varchar(36) NULL, \`userRegionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`question_options\` ADD CONSTRAINT \`FK_c654af7759a681f1b1addbe35bf\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`selected_question\` ADD CONSTRAINT \`FK_c380870f70d580fbf32f9b341ab\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`selected_question\` ADD CONSTRAINT \`FK_84092ad544ddd2fe6a68b7defe9\` FOREIGN KEY (\`userRegionId\`) REFERENCES \`app_user_region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`selected_question\` DROP FOREIGN KEY \`FK_84092ad544ddd2fe6a68b7defe9\``);
        await queryRunner.query(`ALTER TABLE \`selected_question\` DROP FOREIGN KEY \`FK_c380870f70d580fbf32f9b341ab\``);
        await queryRunner.query(`ALTER TABLE \`question_options\` DROP FOREIGN KEY \`FK_c654af7759a681f1b1addbe35bf\``);
        await queryRunner.query(`DROP TABLE \`selected_question\``);
        await queryRunner.query(`DROP TABLE \`question\``);
        await queryRunner.query(`DROP TABLE \`question_options\``);
        await queryRunner.query(`DROP TABLE \`app_user_region\``);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateModules1658252630113 implements MigrationInterface {
    name = 'CreateModules1658252630113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "owner" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "service_desk" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "details" varchar NOT NULL, "initialDate" datetime NOT NULL, "finalDate" datetime NOT NULL, "status" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "position" varchar NOT NULL, "accountNumber" integer NOT NULL, "cpf" varchar NOT NULL, "avatar" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "paychecks" ("id" varchar PRIMARY KEY NOT NULL, "companyName" varchar NOT NULL, "socialReason" varchar NOT NULL, "cnpj" varchar NOT NULL, "money" integer NOT NULL, "extraTime" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_service_desk" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "details" varchar NOT NULL, "initialDate" datetime NOT NULL, "finalDate" datetime NOT NULL, "status" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar, CONSTRAINT "FK_d9f3454d6f009f5f00dcef2b621" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_service_desk"("id", "title", "details", "initialDate", "finalDate", "status", "createdAt", "userId") SELECT "id", "title", "details", "initialDate", "finalDate", "status", "createdAt", "userId" FROM "service_desk"`);
        await queryRunner.query(`DROP TABLE "service_desk"`);
        await queryRunner.query(`ALTER TABLE "temporary_service_desk" RENAME TO "service_desk"`);
        await queryRunner.query(`CREATE TABLE "temporary_paychecks" ("id" varchar PRIMARY KEY NOT NULL, "companyName" varchar NOT NULL, "socialReason" varchar NOT NULL, "cnpj" varchar NOT NULL, "money" integer NOT NULL, "extraTime" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar, CONSTRAINT "FK_b8fd11e3c0619392710ed673958" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_paychecks"("id", "companyName", "socialReason", "cnpj", "money", "extraTime", "createdAt", "userId") SELECT "id", "companyName", "socialReason", "cnpj", "money", "extraTime", "createdAt", "userId" FROM "paychecks"`);
        await queryRunner.query(`DROP TABLE "paychecks"`);
        await queryRunner.query(`ALTER TABLE "temporary_paychecks" RENAME TO "paychecks"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paychecks" RENAME TO "temporary_paychecks"`);
        await queryRunner.query(`CREATE TABLE "paychecks" ("id" varchar PRIMARY KEY NOT NULL, "companyName" varchar NOT NULL, "socialReason" varchar NOT NULL, "cnpj" varchar NOT NULL, "money" integer NOT NULL, "extraTime" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "paychecks"("id", "companyName", "socialReason", "cnpj", "money", "extraTime", "createdAt", "userId") SELECT "id", "companyName", "socialReason", "cnpj", "money", "extraTime", "createdAt", "userId" FROM "temporary_paychecks"`);
        await queryRunner.query(`DROP TABLE "temporary_paychecks"`);
        await queryRunner.query(`ALTER TABLE "service_desk" RENAME TO "temporary_service_desk"`);
        await queryRunner.query(`CREATE TABLE "service_desk" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "details" varchar NOT NULL, "initialDate" datetime NOT NULL, "finalDate" datetime NOT NULL, "status" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "service_desk"("id", "title", "details", "initialDate", "finalDate", "status", "createdAt", "userId") SELECT "id", "title", "details", "initialDate", "finalDate", "status", "createdAt", "userId" FROM "temporary_service_desk"`);
        await queryRunner.query(`DROP TABLE "temporary_service_desk"`);
        await queryRunner.query(`DROP TABLE "paychecks"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "service_desk"`);
        await queryRunner.query(`DROP TABLE "owner"`);
    }

}

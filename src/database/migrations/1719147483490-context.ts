import { MigrationInterface, QueryRunner } from "typeorm";

export class Context1719147483490 implements MigrationInterface {
    name = 'Context1719147483490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_context_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "messages" jsonb NOT NULL, CONSTRAINT "PK_85b1fda86b064e2190baa3706f1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "chat_context_entity"`);
    }

}

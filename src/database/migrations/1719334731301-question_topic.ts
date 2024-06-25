import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestionTopic1719334731301 implements MigrationInterface {
  name = 'QuestionTopic1719334731301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageUrl" text NOT NULL, "answer" character varying(1) NOT NULL, "topicId" uuid, CONSTRAINT "UQ_2fbeff25cbb896303e11f781801" UNIQUE ("imageUrl"), CONSTRAINT "PK_14a0a509f33d8cd3a96a448dcd7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "topic_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "index" smallint NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5ab4b8c0ec16ccc36c29bc22c92" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_entity" ADD CONSTRAINT "FK_e1e1a38552735d3d0b028e83e43" FOREIGN KEY ("topicId") REFERENCES "topic_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_entity" DROP CONSTRAINT "FK_e1e1a38552735d3d0b028e83e43"`,
    );
    await queryRunner.query(`DROP TABLE "topic_entity"`);
    await queryRunner.query(`DROP TABLE "question_entity"`);
  }
}

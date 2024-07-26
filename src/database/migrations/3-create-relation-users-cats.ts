import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationUsersCats1737308852000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE cats
      ADD COLUMN userId int NULL;
    `);

    // Adicionar a chave estrangeira
    await queryRunner.query(`
      ALTER TABLE cats
      ADD CONSTRAINT FK_cats_users
      FOREIGN KEY (userId)
      REFERENCES users(id)
      ON DELETE SET NULL
      ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE cats
      DROP CONSTRAINT IF EXISTS FK_cats_users;
    `);

    await queryRunner.query(`
      ALTER TABLE cats
      DROP COLUMN IF EXISTS userId;
    `);
  }
}

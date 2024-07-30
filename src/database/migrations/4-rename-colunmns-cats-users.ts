import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnsInCatsAndUserTable1747308852000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'id', 'userId');

    await queryRunner.renameColumn('cats', 'id', 'catId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'userId', 'id');

    await queryRunner.renameColumn('cats', 'catId', 'id');
  }
}

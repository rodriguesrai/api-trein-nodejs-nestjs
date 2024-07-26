import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AdicionarUserIdNaCats1627308852000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cats',
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: true,
      }),
    );

    // Adicionar a chave estrangeira
    await queryRunner.createForeignKey(
      'cats',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a chave estrangeira
    const foreignKey = await queryRunner
      .getTable('cats')
      .then((table) =>
        table.foreignKeys.find((fk) => fk.columnNames.includes('userId')),
      );
    if (foreignKey) {
      await queryRunner.dropForeignKey('cats', foreignKey);
    }

    // Remover a coluna userId
    await queryRunner.dropColumn('cats', 'userId');
  }
}

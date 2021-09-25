import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEmployeeAddUpdatedAt1632585984504
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'employee',
      new TableColumn({
        name: 'updated_at',
        type: 'varchar',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('employee', 'updated_at');
  }
}

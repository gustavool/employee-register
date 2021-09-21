import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEmployeeAddPositionAndDepartment1631926146358
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('employee', [
      new TableColumn({
        name: 'position',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'department',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user', ['position', 'department']);
  }
}

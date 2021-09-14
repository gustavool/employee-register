import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1631579294788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'location',
              type: 'varchar',
            },
            {
              name: 'hiring_date',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        },
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}

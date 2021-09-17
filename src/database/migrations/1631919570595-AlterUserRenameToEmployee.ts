import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserRenameToEmployee1631919570595
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user', 'employee');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('employee', 'user');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrders1652651140918 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'receitas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'sintomas',
                        type: 'varchar',
                    },
                    {
                        name: 'durationDays',
                        type: 'int',
                    },
                    {
                        name: 'hoursInterval',
                        type: 'int',
                    },
                    {
                        name: 'idPaciente',
                        type: 'uuid',
                    },
                    {
                        name: 'idMedicine',
                        type: 'uuid',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'idPaciente',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['idPaciente'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'idMedicine',
                        referencedTableName: 'medicines',
                        referencedColumnNames: ['id'],
                        columnNames: ['idMedicine'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('receitas');
    }
}

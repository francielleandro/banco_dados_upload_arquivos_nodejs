import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class addForigenkeyToCategoryToTransactions1594889422212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'transactions',
            new TableColumn({
                name:'category_id',
                type:'uuid',
                isNullable:true
            })
        );

        await queryRunner.createForeignKey(
            'transactions',
            new TableForeignKey({
                columnNames:['category_id'],
                referencedColumnNames:['id'],
                referencedTableName:'category',
                name:'transactionCategory',
                onUpdate:'CASCADE',
                onDelete:'SET NULL'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions','transactionCategory');

        await queryRunner.dropColumn('transactions','category_id');
    }

}

import { DataImportsRecord } from 'common/interfaces/DataImports';
import { ColumnInstance } from 'react-table';

type ColumnHeaderProps = {
    column: ColumnInstance<DataImportsRecord>;
};

export const DataImportHeader = ({ column }: ColumnHeaderProps) => (
    <>
        {column.Header && typeof column.Header === 'string' ? (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        ) : (
            column.render('Header')
        )}
    </>
);

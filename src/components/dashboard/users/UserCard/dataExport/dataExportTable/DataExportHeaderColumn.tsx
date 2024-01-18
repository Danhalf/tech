// import { DataExportRecord } from 'common/interfaces/UserDataExports';
import { ColumnInstance } from 'react-table';

type ColumnHeaderProps = {
    column: ColumnInstance<any>;
    // column: ColumnInstance<DataExportRecord>;
};

export const DataExportsHeaderColumn = ({ column }: ColumnHeaderProps) => (
    <>
        {column.Header && typeof column.Header === 'string' ? (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        ) : (
            column.render('Header')
        )}
    </>
);

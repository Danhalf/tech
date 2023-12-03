import { TemplatesReportsRecord } from 'common/interfaces/TemplatesReportsData';
import { ColumnInstance } from 'react-table';

type ColumnHeaderProps = {
    column: ColumnInstance<TemplatesReportsRecord>;
};

export const ReportsHeaderColumn = ({ column }: ColumnHeaderProps) => (
    <>
        {column.Header && typeof column.Header === 'string' ? (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        ) : (
            column.render('Header')
        )}
    </>
);

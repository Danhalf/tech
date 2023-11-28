import { TemplatesPrintedRecord } from 'common/interfaces/TemplatesPrintedData';
import { ColumnInstance } from 'react-table';

type ColumnHeaderProps = {
    column: ColumnInstance<TemplatesPrintedRecord>;
};

export const PrintedHeaderColumn = ({ column }: ColumnHeaderProps) => (
    <>
        {column.Header && typeof column.Header === 'string' ? (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        ) : (
            column.render('Header')
        )}
    </>
);

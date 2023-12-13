import { ApiKeyRecord } from 'common/interfaces/UserApiKeys';
import { ColumnInstance } from 'react-table';

type ColumnHeaderProps = {
    column: ColumnInstance<ApiKeyRecord>;
};

export const ApiKeysHeaderColumn = ({ column }: ColumnHeaderProps) => (
    <>
        {column.Header && typeof column.Header === 'string' ? (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        ) : (
            column.render('Header')
        )}
    </>
);

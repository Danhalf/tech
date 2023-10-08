import { User } from 'common/interfaces/UserData';
import { FC } from 'react';
import { ColumnInstance } from 'react-table';

type Props = {
    column: ColumnInstance<User>;
};

export const CustomHeaderColumn: FC<Props> = ({ column }) => (
    <>
        {column.Header && typeof column.Header === 'string' ? (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        ) : (
            column.render('Header')
        )}
    </>
);

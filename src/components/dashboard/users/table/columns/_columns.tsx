// @ts-nocheck
import { Column } from 'react-table';
import { UserCustomHeader } from './UserCustomHeader';
const usersColumns: ReadonlyArray<Column<User>> = [
    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />
        ),
        accessor: 'role',
    },
];

export { usersColumns };

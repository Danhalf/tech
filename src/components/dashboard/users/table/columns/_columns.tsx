// @ts-nocheck
import { Column } from 'react-table';
import { UserCustomHeader } from './UserCustomHeader';
import { User } from '../../user.service';
import { UserActionsCell } from './UserActionsCell';
const usersColumns: ReadonlyArray<Column<User>> = [
    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Index' className='min-w-125px' />
        ),
        accessor: 'index',
    },
    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='User name' className='min-w-125px' />
        ),
        accessor: 'username',
    },
    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Created by user' className='min-w-125px' />
        ),
        accessor: 'parentusername',
    },
    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Is admin' className='min-w-125px' />
        ),
        accessor: 'isadmin',
        Cell: ({ ...props }) => (props.isAdmin ? 'yes' : 'no'),
    },
    {
        Header: (props) => (
            <UserCustomHeader tableProps={props} title='Actions' className='min-w-125px' />
        ),
        id: 'actions',

        Cell: ({ ...props }) => {
            const { useruid, username }: User = props.data[props.row.index];
            return <UserActionsCell useruid={useruid} username={username} />;
        },
    },
];

export { usersColumns };

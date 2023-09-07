// @ts-nocheck
import { Column } from 'react-table';
import { UserCustomHeader } from './UserCustomHeader';
import { User } from '../../api/user.service';
import { UserLinkCell } from './UserLinkCell';
import { UserActionsCell } from './UserActionsCell';
import { DeletedUsersActionsCell } from './DeletedUsersActionsCell';

type userColumnsArguments = 'users' | 'deletedUsers';

const usersColumns = (list: userColumnsArguments = 'users'): ReadonlyArray<Column<User>> => {
    return [
        {
            Header: (props) => <UserCustomHeader tableProps={props} title='Index' />,
            accessor: 'index',
        },
        {
            Header: (props) => (
                <UserCustomHeader tableProps={props} title='User name' className='min-w-125px' />
            ),
            id: 'username',
            Cell: ({ ...props }) => {
                const { useruid, username }: User = props.data[props.row.index];
                return <UserLinkCell useruid={useruid} username={username} />;
            },
        },
        {
            Header: (props) => (
                <UserCustomHeader
                    tableProps={props}
                    title='Created by user'
                    className='min-w-125px'
                />
            ),
            accessor: 'parentusername',
        },
        {
            Header: (props) => <UserCustomHeader tableProps={props} title='Is admin' />,
            accessor: 'isadmin',
            Cell: ({ ...props }) => (props.data[props.row.index].isadmin ? 'yes' : 'no'),
        },
        {
            Header: (props) => (
                <UserCustomHeader
                    tableProps={props}
                    title='Actions'
                    className='text-end px-3 min-w-125px'
                />
            ),
            id: 'actions',

            Cell: ({ ...props }) => {
                const { useruid, username }: User = props.data[props.row.index];
                switch (list) {
                    case 'users':
                        return <UserActionsCell useruid={useruid} username={username} />;
                    case 'deletedUsers':
                        return <DeletedUsersActionsCell useruid={useruid} username={username} />;
                }
            },
        },
    ];
};
export { usersColumns };

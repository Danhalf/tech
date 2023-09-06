import { QueryRequestProvider } from 'common/core/QueryRequestProvider';
import { QueryResponseProvider } from 'common/core/QueryResponseProvider';
import { UsersTable } from './table/UsersTable';
// const UsersList = () => {
//     return (
//         <>
//             <UsersTable />
//         </>
//     );
// };

const UsersListWrapper = () => (
    <QueryRequestProvider>
        <QueryResponseProvider>
            <UsersTable />
        </QueryResponseProvider>
    </QueryRequestProvider>
);

export { UsersListWrapper };

import { useQueryResponseData } from 'common/core/QueryResponseProvider';
import { UsersListPagination } from 'components/dashboard/helpers/pagination/renderPagination';
import { useMemo } from 'react';
import { useTable, ColumnInstance, Row } from 'react-table';
import { User } from '../user.service';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';

const UsersTable = () => {
    let users = useQueryResponseData();

    const data = useMemo(() => users, [users]);
    const columns = useMemo(() => usersColumns, []);
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data,
    });

    // eslint-disable-next-line no-console
    // console.log(rows);
    return (
        <>
            <div className='table-responsive'>
                <table
                    id='kt_table_users'
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                        <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                            {headers.map((column: ColumnInstance<User>) => (
                                <CustomHeaderColumn key={column.id} column={column} />
                            ))}
                        </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                        {rows.length > 0 ? (
                            rows.map((row: Row<User>, i) => {
                                prepareRow(row);
                                return <CustomRow row={row} key={`row-${i}-${row.id}`} />;
                            })
                        ) : (
                            <tr>
                                <td colSpan={7}>
                                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                        No matching records found
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <UsersListPagination />
        </>
    );
};

export { UsersTable };

import { useQueryResponseData } from 'common/core/QueryResponseProvider';
import { useEffect, useMemo, useState } from 'react';
import { useTable, ColumnInstance, Row } from 'react-table';
import { CustomHeaderColumn } from './columns/CustomHeaderColumn';
import { CustomRow } from './columns/CustomRow';
import { usersColumns } from './columns/_columns';
import { UsersListPagination } from 'components/dashboard/helpers/pagination/renderPagination';
import { UsersListType, User, UsersType } from 'common/interfaces/UserData';
import { getTotalUsersRecords } from '../user.service';

interface UsersTableProps {
    list: UsersListType
}

export const UsersTable = ({ list }: UsersTableProps) => {
    const [totalRecords, setTotalRecords] = useState<number>(0);

    const users = useQueryResponseData(list);

    const totalList = list === UsersType.ACTIVE ? 'list' : 'listdeleted';

    useEffect(() => {
        getTotalUsersRecords(totalList).then(({ total }) => {
            setTotalRecords(total);
        });
    }, []);

    const usersData = useMemo(() => users, [users]);
    const columns = useMemo(() => usersColumns(list), [list]);
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data: usersData,
    });

    return (
        <>
            <div className='table-responsive'>
                <table
                    id='kt_table_users'
                    className='table align-middle table-row-dashed fs-6 gy-3 dataTable no-footer'
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
                                return <CustomRow row={row} key={`${row.id}`} />;
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
                <UsersListPagination list={list} totalRecords={totalRecords} />
            </div>
        </>
    );
};
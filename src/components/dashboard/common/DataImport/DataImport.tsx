import { useState, useEffect, useMemo } from 'react';
import { getImportList } from 'components/dashboard/common/common.service';
import { DataImportsRecord } from 'common/interfaces/DataImports';
import { Status } from 'common/interfaces/ActionStatus';
import { DataImportsColumns } from './DataImportTable/DataImportColumns';
import { ColumnInstance, Row, useFlexLayout, useResizeColumns, useTable } from 'react-table';
import { DataImportHeader } from './DataImportTable/DataImportHeader';
import { DataImportRow } from './DataImportTable/DataImportRow';

const initialDataImportsState = [
    {
        datapath: '',
        id: 0,
        mode: '',
        size: 0,
        timestamp: '',
        username: '',
        useruid: '',
    },
];

export const DataImport = (): JSX.Element => {
    const [dataImports, setDataImports] = useState<DataImportsRecord[]>(initialDataImportsState);

    const updateDataImports = (): void => {
        getImportList().then((response) => {
            if (response.status === Status.OK) {
                setDataImports(response.records);
            }
        });
    };

    useEffect(() => {
        updateDataImports();
    }, []);

    const columns = useMemo(() => DataImportsColumns(), []);
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data: dataImports,
    });

    return (
        <div className='card'>
            <div className='card-body'>
                <div className='table-responsive'>
                    <table
                        id='kt_table_users'
                        className='table align-middle table-row-dashed fs-6 gy-3 no-footer'
                        {...getTableProps()}
                    >
                        <thead>
                            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                {headers.map((column: ColumnInstance<DataImportsRecord>) => (
                                    <DataImportHeader key={column.id} column={column} />
                                ))}
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                            {rows.map((row: Row<any>) => {
                                prepareRow(row);
                                return <DataImportRow row={row} key={`${row.id}`} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import { ColumnInstance, Row, useTable } from 'react-table';
import { DataExportsHeaderColumn } from './dataExportTable/DataExportHeaderColumn';
import { DataExportsColumns } from './dataExportTable/DataExportColumns';
import { DataExportsRow } from './dataExportTable/DataExportRow';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { DataExportRecord } from 'common/interfaces/DataExport';
import { exportUserDataExport, getDataExports } from './DataExport.service';

const initialDataExportsState: DataExportRecord[] = [
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

export const DataExports = ({ useruid }: { useruid: string }): JSX.Element => {
    const [DataExports, setDataExports] = useState<DataExportRecord[]>(initialDataExportsState);
    const updateDataExports = (): void => {
        getDataExports(useruid).then((response: any) => {
            setDataExports(response);
        });
    };

    useEffect(() => {
        updateDataExports();
    }, []);

    const handleExportData = () => {
        exportUserDataExport(useruid)
            .then((response: any) => {})
            .catch((error: any) => {});
    };

    const columns = useMemo(() => DataExportsColumns(updateDataExports), []);
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data: DataExports,
    });

    return (
        <div className='card'>
            <div className='me-4 mt-4 ms-auto'>
                <PrimaryButton icon='plus' buttonClickAction={handleExportData}>
                    Export
                </PrimaryButton>
            </div>
            <div className='card-body'>
                <div className='table-responsive position-relative '>
                    <table
                        id='kt_table_api_keys'
                        className='table align-middle table-row-dashed fs-6 gy-3 no-footer'
                        {...getTableProps()}
                    >
                        <thead>
                            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                {headers.map((column: ColumnInstance<DataExportRecord>) => (
                                    <DataExportsHeaderColumn key={column.id} column={column} />
                                ))}
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                            {rows.map((row: Row<DataExportRecord>) => {
                                prepareRow(row);
                                return <DataExportsRow row={row} key={`${row.id}`} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

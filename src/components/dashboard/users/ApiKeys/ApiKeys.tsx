import { useState, useEffect, useMemo } from 'react';
import { ColumnInstance, Row, useTable } from 'react-table';
import { PrintedHeaderColumn } from './TemplatesPrintedTable/PrintedHeaderColumn';
import { TemplatesPrintedRecord } from 'common/interfaces/TemplatesPrintedData';
import { PrintedColumns } from './TemplatesPrintedTable/PrintedColumns';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { PrintedRow } from './TemplatesPrintedTable/PrintedRow';

const initialPrintedState = [
    {
        created: '',
        deleted: '',
        updated: '',
        issuedate: '',
        expirationdate: '',
        lastused: '',
        flags: '',
        enabled: '',
        apitype: '',
        useruid: '',
        itemuid: '',
        apikey: '',
        notes: '',
    },
];

export const ApiKeys = (): JSX.Element => {
    const [templatesPrinted, setTemplatesPrinted] = useState<any[]>(initialPrintedState);

    const { handleShowToast } = useToast();

    const updateTemplatesPrinted = (): void => {};

    useEffect(() => {
        updateTemplatesPrinted();
    }, []);

    const columns = useMemo(() => PrintedColumns(updateTemplatesPrinted), []);
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data: templatesPrinted,
    });

    return (
        <div className='card'>
            <div className='card-body'>
                <div className='table-responsive position-relative '>
                    <table
                        id='kt_table_users'
                        className='table align-middle table-row-dashed fs-6 gy-3 no-footer'
                        {...getTableProps()}
                    >
                        <thead>
                            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                {headers.map((column: ColumnInstance<TemplatesPrintedRecord>) => (
                                    <PrintedHeaderColumn key={column.id} column={column} />
                                ))}
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                            {rows.map((row: Row<any>) => {
                                prepareRow(row);
                                return <PrintedRow row={row} key={`${row.id}`} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

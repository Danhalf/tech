import { useState, useEffect, useMemo } from 'react';
import { getTemplatePrints, uploadPrintFile } from '../common.service';
import { AxiosError } from 'axios';
import { Status } from 'common/interfaces/ActionStatus';
import { ColumnInstance, Row, useTable } from 'react-table';
import { PrintedHeaderColumn } from './TemplatesPrintedTable/PrintedHeaderColumn';
import { TemplatesPrintedRecord } from 'common/interfaces/TemplatesPrintedData';
import { PrintedColumns } from './TemplatesPrintedTable/PrintedColumns';
import { CustomUploadInput } from 'components/dashboard/helpers/renderInputsHelper';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { PrintedRow } from './TemplatesPrintedTable/PrintedRow';

const initialPrintedState = [
    {
        description: '',
        index: 0,
        itemuid: '',
        name: '',
        state: '',
        type: '',
        version: '',
    },
];

export const TemplatesPrinted = ({ useruid }: { useruid?: string }): JSX.Element => {
    const [templatesPrinted, setTemplatesPrinted] =
        useState<TemplatesPrintedRecord[]>(initialPrintedState);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const { handleShowToast } = useToast();

    const updateTemplatesPrinted = (): void => {
        getTemplatePrints(useruid).then((response) => {
            if (response.status === Status.OK) {
                setTemplatesPrinted(response.documents);
            }
        });
    };

    useEffect(() => {
        updateTemplatesPrinted();
    }, []);

    const handleFileUpload = (file: File) => {
        setIsDisabled(true);
        uploadPrintFile(file)
            .then((response) => {
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${file.name}</strong> successfully uploaded`,
                        type: 'success',
                    });
                    updateTemplatesPrinted();
                }
            })
            .catch((err) => {
                const { message } = err as Error | AxiosError;
                handleShowToast({ message, type: 'danger' });
            })
            .finally(() => {
                setIsDisabled(false);
            });
    };

    const columns = useMemo(() => PrintedColumns(updateTemplatesPrinted), []);
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
        columns,
        data: templatesPrinted,
    });

    return (
        <div className='card'>
            <div className='me-4 mt-4 ms-auto'>
                <CustomUploadInput
                    id='reports-upload'
                    name='reports-pdf'
                    filetype='pdf'
                    disabled={isDisabled}
                    action={handleFileUpload}
                />
            </div>
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

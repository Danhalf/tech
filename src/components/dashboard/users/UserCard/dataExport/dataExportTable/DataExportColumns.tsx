import { Column } from 'react-table';
import { DataExportsActions } from './DataExportActions';
// import { DataExportRecord } from 'common/interfaces/UserDataExports';

export const DataExportsColumns = (
    updateAction: () => void
    // ): ReadonlyArray<Column<DataExportRecord>> => [
): ReadonlyArray<Column<any>> => [
    {
        Header: 'Index',
        accessor: 'itemuid',
    },
    {
        Header: 'API type',
        accessor: 'apitype',
    },
    {
        Header: 'Created',
        accessor: 'created',
    },
    {
        Header: 'Updated',
        accessor: 'updated',
    },
    {
        Header: 'Expiration time',
        accessor: 'expirationdate',
    },
    {
        Header: 'Actions',
        id: 'api-key-actions',
        Cell: ({ ...props }) => {
            // const DataExport: DataExportRecord = props.data[props.row.index];
            const dataExport: any = props.data[props.row.index];
            return <DataExportsActions updateAction={updateAction} dataExport={dataExport} />;
        },
    },
];

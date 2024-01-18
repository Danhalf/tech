import { Column } from 'react-table';
import { DataExportsActions } from './DataExportActions';
// import { DataExportRecord } from 'common/interfaces/UserDataExports';

export const DataExportsColumns = (
    updateAction: () => void
    // ): ReadonlyArray<Column<DataExportRecord>> => [
): ReadonlyArray<Column<any>> => [
    {
        Header: 'Taskuid',
        accessor: 'taskuid',
    },
    {
        Header: 'Type',
        accessor: 'type',
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
        Header: 'Objects count',
        accessor: 'objects_count',
    },
    {
        Header: 'Size',
        accessor: 'size',
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

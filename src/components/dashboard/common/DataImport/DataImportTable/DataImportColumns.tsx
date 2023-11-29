import { Column } from 'react-table';
import { DataImportActions } from './DataImportActions';
import { DataImportsRecord } from 'common/interfaces/DataImports';

export const DataImportsColumns = (): ReadonlyArray<Column<DataImportsRecord>> => [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Data path',
        accessor: 'datapath',
        width: 200,
    },
    {
        Header: 'Mode',
        accessor: 'mode',
    },
    {
        Header: 'Size',
        accessor: 'size',
    },
    {
        Header: 'Time stamp',
        accessor: 'timestamp',
    },
    {
        Header: 'User name',
        accessor: 'username',
    },
    {
        Header: 'User uid',
        accessor: 'useruid',
    },
    {
        Header: 'Actions',
        id: 'data-imports-actions',
        Cell: ({ ...props }) => {
            const { useruid }: DataImportsRecord = props.data[props.row.index];
            return <DataImportActions id={useruid} />;
        },
    },
];

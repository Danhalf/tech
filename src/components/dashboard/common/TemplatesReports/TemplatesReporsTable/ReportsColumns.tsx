import { Column } from 'react-table';
import { TemplatesReportsRecord } from 'common/interfaces/TemplatesReportsData';
import { ReportsActions } from './ReportsActions';

export const ReportsColumns = (
    updateAction: () => void
): ReadonlyArray<Column<TemplatesReportsRecord>> => [
    {
        Header: 'Index',
        accessor: 'index',
    },
    {
        Header: 'Item uid',
        accessor: 'itemuid',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'State',
        accessor: 'state',
    },
    {
        Header: 'Description',
        accessor: 'description',
    },
    {
        Header: 'Type',
        accessor: 'type',
    },
    {
        Header: 'Version',
        accessor: 'version',
    },
    {
        Header: 'Actions',
        id: 'reports-actions',
        Cell: ({ ...props }) => {
            const { itemuid, description, name, version }: TemplatesReportsRecord =
                props.data[props.row.index];
            return (
                <ReportsActions
                    updateAction={updateAction}
                    item={{ itemuid, description, name, version }}
                />
            );
        },
    },
];

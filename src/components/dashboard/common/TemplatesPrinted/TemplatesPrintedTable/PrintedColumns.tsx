import { Column } from 'react-table';
import { TemplatesPrintedRecord } from 'common/interfaces/TemplatesPrintedData';
import { PrintedActions } from './PrintedActions';

export const PrintedColumns = (
    updateAction: () => void
): ReadonlyArray<Column<TemplatesPrintedRecord>> => [
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
        id: 'printed-actions',
        Cell: ({ ...props }) => {
            const { itemuid, description, name, version }: TemplatesPrintedRecord =
                props.data[props.row.index];
            return (
                <PrintedActions
                    updateAction={updateAction}
                    item={{ itemuid, description, name, version }}
                />
            );
        },
    },
];

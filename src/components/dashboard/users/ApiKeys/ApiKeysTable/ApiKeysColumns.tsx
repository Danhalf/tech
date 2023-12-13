import { Column } from 'react-table';
import { ApiKeysActions } from './ApiKeysActions';
import { ApiKeyRecord } from 'common/interfaces/UserApiKeys';

export const ApiKeysColumns = (updateAction: () => void): ReadonlyArray<Column<ApiKeyRecord>> => [
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
            const { itemuid, enabled, apitype, apikey, notes }: ApiKeyRecord =
                props.data[props.row.index];
            return (
                <ApiKeysActions
                    updateAction={updateAction}
                    item={{ itemuid, enabled, apitype, apikey, notes }}
                />
            );
        },
    },
];

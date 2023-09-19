import clsx from 'clsx';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { PropsWithChildren, useMemo } from 'react';
import { HeaderProps } from 'react-table';
import { SortState } from '_metronic/helpers';
import { User } from '../../types/Users.types';

type Props = {
    className?: string;
    title?: string;
    tableProps: PropsWithChildren<HeaderProps<User>>;
};

export const UserCustomHeader = ({ className, title, tableProps }: Props) => {
    const id = tableProps.column.id;
    const { state, updateState } = useQueryRequest();

    const order: SortState['order'] | undefined = useMemo(() => state.order, [state]);

    const sortColumn = () => {
        if (id === 'actions') {
            return;
        }

        let newOrder: SortState['order'] = 'desc';
        if (state.sort === id && state.order === 'desc') {
            newOrder = 'asc';
        }

        updateState({
            sort: id,
            order: newOrder,
            currentpage: 1,
        });
    };

    return (
        <th
            {...tableProps.column.getHeaderProps()}
            className={clsx(
                `${className} cursor-pointer`,
                order !== undefined && `table-sort-${order}`
            )}
            onClick={sortColumn}
        >
            {title}
        </th>
    );
};

import clsx from 'clsx';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { PropsWithChildren, useMemo } from 'react';
import { HeaderProps } from 'react-table';
import { User } from 'common/interfaces/UserData';
import { SortType, UserSortParams } from 'common/interfaces/QueriesParams';

type Props = {
    className?: string;
    title?: string;
    tableProps: PropsWithChildren<HeaderProps<User>>;
};

export const UserCustomHeader = ({ className, title, tableProps }: Props) => {
    const id = tableProps.column.id as UserSortParams['column'];
    const { state, updateState } = useQueryRequest();

    const order: SortType | undefined = useMemo(() => state.order, [state]);

    const sortColumn = () => {
        if (!id) {
            return;
        }

        let newOrder: SortType = 'desc';
        if (state.sort === id && state.order === 'desc') {
            newOrder = 'asc';
        }

        updateState({
            sort: id,
            order: newOrder,
            currentpage: 0,
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

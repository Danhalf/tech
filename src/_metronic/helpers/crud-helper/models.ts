import { SortType } from 'common/interfaces/QueriesParams';
import { DefaultRecordsPerPage, RecordsPerPage } from 'common/settings/settings';
import { ReactNode } from 'react';

export type WithChildren = {
    children?: ReactNode;
};

export type ID = undefined | null | number;

export type PaginationState = {
    currentpage: number;
    count: RecordsPerPage;
};

export type SortState = {
    sort?: string;
    order?: SortType;
};

export type SearchState = {
    search?: string;
};

export type Response<T> = {
    data?: T;
    payload?: {
        message?: string;
        errors?: {
            [key: string]: Array<string>;
        };
        pagination?: PaginationState;
    };
};

export type QueryState = PaginationState & SortState & SearchState;

export type QueryRequestContextProps = {
    state: QueryState;
    updateState: (updates: Partial<QueryState>) => void;
};

export const initialQueryState: QueryState = {
    currentpage: 0,
    count: DefaultRecordsPerPage,
    sort: 'username',
    order: 'asc',
    search: '',
};

export const initialQueryRequest: QueryRequestContextProps = {
    state: initialQueryState,
    updateState: () => {},
};

export type QueryResponseContextProps<T> = {
    response?: Response<Array<T>> | undefined;
    refetch: () => void;
    isLoading: boolean;
    query: string;
};

export const initialQueryResponse = { refetch: () => {}, isLoading: false, query: '' };

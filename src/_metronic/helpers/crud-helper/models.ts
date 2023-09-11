import { ReactNode } from 'react';

export type WithChildren = {
    children?: ReactNode;
};

export type ID = undefined | null | number;

export type PaginationState = {
    skip: number;
    top: 10 | 30 | 50 | 100;
    links?: Array<{ label: string; active: boolean; url: string | null; page: number | null }>;
};

export type SortState = {
    sort?: string;
    order?: 'asc' | 'desc';
};

export type FilterState = {
    filter?: unknown;
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

export type QueryState = PaginationState & SortState & FilterState & SearchState;

export type QueryRequestContextProps = {
    state: QueryState;
    updateState: (updates: Partial<QueryState>) => void;
};

export const initialQueryState: QueryState = {
    skip: 1,
    top: 10,
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

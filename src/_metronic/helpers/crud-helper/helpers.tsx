import { createContext } from 'react';
import qs from 'qs';
import { QueryResponseContextProps, QueryState } from './models';
import { LOC_STORAGE_USER_STATE } from 'common/app-consts';
import { DefaultRecordsPerPage } from 'common/settings/settings';

export function createResponseContext<T>(initialState: QueryResponseContextProps<T>) {
    return createContext(initialState);
}

export function isNotEmpty(obj: unknown) {
    return obj !== undefined && obj !== null && obj !== '';
}

export function stringifyRequestQuery(state: QueryState): string {
    const pagination = qs.stringify(state, {
        filter: ['currentpage', 'count'],
        skipNulls: true,
    });
    const sort = qs.stringify(state, { filter: ['sort', 'order'], skipNulls: true });
    const search = isNotEmpty(state.search)
        ? qs.stringify(state, { filter: ['search'], skipNulls: true })
        : '';

    return [pagination, sort, search]
        .filter((f) => f)
        .join('&')
        .toLowerCase();
}

export function parseRequestQuery(query: string): QueryState {
    const cache: unknown = qs.parse(query);
    return cache as QueryState;
}

export interface LocalState {
    currentpage: number;
    login: string;
    count: number;
}

export const getLocalState = (): LocalState => {
    const defaultValues = { currentpage: 0, login: '', count: DefaultRecordsPerPage };
    const storage = localStorage.getItem(LOC_STORAGE_USER_STATE);
    if (storage !== null) {
        const parsedData = JSON.parse(storage);
        const result = { ...defaultValues };

        if (parsedData) {
            if (parsedData.currentpage !== undefined) {
                result.currentpage = parsedData.currentpage;
            }
            if (parsedData.count !== undefined) {
                result.count = parsedData.count;
            }

            if (parsedData.login !== undefined) {
                result.login = parsedData.login;
            }
        }

        return result;
    }

    return { ...defaultValues };
};

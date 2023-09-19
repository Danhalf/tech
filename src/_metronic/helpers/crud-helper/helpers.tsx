import { createContext, useEffect, useState } from 'react';
import qs from 'qs';
import { QueryResponseContextProps, QueryState } from './models';

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

export function useDebounce(value: string | undefined, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

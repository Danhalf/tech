import { createContext, useEffect, useState } from 'react';
import qs from 'qs';
import { QueryResponseContextProps, QueryState } from './models';

export function createResponseContext<T>(initialState: QueryResponseContextProps<T>) {
    return createContext(initialState);
}

export function isNotEmpty(obj: unknown) {
    return obj !== undefined && obj !== null && obj !== '';
}

// Example: skip=1&top=10&sort=id&order=desc&search=a&filter_name=a&filter_online=false
export function stringifyRequestQuery(state: QueryState): string {
    const pagination = qs.stringify(state, { filter: ['skip', 'top'], skipNulls: true });
    const sort = qs.stringify(state, { filter: ['column', 'type'], skipNulls: true });
    const search = isNotEmpty(state.search)
        ? qs.stringify(state, { filter: ['qry'], skipNulls: true })
        : '';

    const filter = state.filter
        ? Object.entries(state.filter as Object)
              .filter((obj) => isNotEmpty(obj[1]))
              .map((obj) => {
                  return `filter_${obj[0]}=${obj[1]}`;
              })
              .join('&')
        : '';

    return [pagination, sort, search, filter]
        .filter((f) => f)
        .join('&')
        .toLowerCase();
}

export function parseRequestQuery(query: string): QueryState {
    const cache: unknown = qs.parse(query);
    return cache as QueryState;
}

// Hook
export function useDebounce(value: string | undefined, delay: number) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}

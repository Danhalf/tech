/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useQueryRequest } from './QueryRequestProvider';
import {
    createResponseContext,
    initialQueryResponse,
    stringifyRequestQuery,
    QUERIES,
    PaginationState,
    initialQueryState,
    WithChildren,
    Response,
} from '_metronic/helpers';
import { User, getUsers } from 'components/dashboard/users/user.service';

const QueryResponseContext = createResponseContext<User>(initialQueryResponse);
const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
    const { state } = useQueryRequest();
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery);
        }
    }, [updatedQuery]);

    const {
        isFetching,
        refetch,
        data: axiosResponse,
    } = useQuery(
        `${QUERIES.USERS_LIST}-${query}`,
        () => {
            return getUsers(query);
        },
        { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    );

    const response: Response<User[]> = {
        data: axiosResponse && axiosResponse.data,
    };

    return (
        <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryResponseContext.Provider>
    );
};

const useQueryResponse = () => useContext(QueryResponseContext);

const useQueryResponseData = () => {
    const { response } = useQueryResponse();
    if (!response) {
        return [];
    }

    return response?.data || [];
};

const useQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    };

    const { response } = useQueryResponse();
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState;
    }

    return response.payload.pagination;
};

const useQueryResponseLoading = (): boolean => {
    const { isLoading } = useQueryResponse();
    return isLoading;
};

export {
    QueryResponseProvider,
    useQueryResponse,
    useQueryResponseData,
    useQueryResponsePagination,
    useQueryResponseLoading,
};

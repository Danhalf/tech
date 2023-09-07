/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect, useMemo, PropsWithChildren } from 'react';
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
import { getDeletedUsers, getUsers } from 'components/dashboard/users/api/user.service';
import { User, UsersListType } from 'components/dashboard/users/types/Users.types';

type QueryResponseProviderProps = {
    listType: UsersListType;
};

const QueryResponseContext = createResponseContext<User>(initialQueryResponse);
const QueryResponseProvider = ({
    listType,
    children,
}: PropsWithChildren<QueryResponseProviderProps>) => {
    const { state } = useQueryRequest();
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

    const GET_LIST_TYPE = () => {
        switch (listType) {
            case 'Users':
                return QUERIES.USERS_LIST;
            case 'Deleted users':
                return QUERIES.DELETED_USERS_LIST;
        }
    };

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
        `${GET_LIST_TYPE()}-${query}`,
        () => {
            switch (listType) {
                case 'Users':
                    return getUsers(query);
                case 'Deleted users':
                    return getDeletedUsers(query);
            }
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

const useQueryResponse = (dataType: UsersListType) => useContext(QueryResponseContext);

const useQueryResponseData = (dataType: UsersListType) => {
    const { response } = useQueryResponse(dataType);
    if (!response) {
        return [];
    }

    return response?.data || [];
};

const useQueryResponsePagination = (dataType: UsersListType) => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    };

    const { response } = useQueryResponse(dataType);
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState;
    }

    return response.payload.pagination;
};

const useQueryResponseLoading = (dataType: UsersListType): boolean => {
    const { isLoading } = useQueryResponse(dataType);
    return isLoading;
};

export {
    QueryResponseProvider,
    useQueryResponse,
    useQueryResponseData,
    useQueryResponsePagination,
    useQueryResponseLoading,
};

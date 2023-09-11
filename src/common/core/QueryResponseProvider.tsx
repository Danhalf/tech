/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect, useMemo, PropsWithChildren } from 'react';
import { useQuery } from 'react-query';
import { useQueryRequest } from './QueryRequestProvider';
import {
    createResponseContext,
    initialQueryResponse,
    stringifyRequestQuery,
    QUERIES,
    PaginationState,
    initialQueryState,
    Response,
    parseRequestQuery,
} from '_metronic/helpers';
import { getDeletedUsers, getUsers } from 'components/dashboard/users/api/user.service';
import { User, UsersListType, UsersType } from 'components/dashboard/users/types/Users.types';

type QueryResponseProviderProps = {
    listType: UsersListType;
};

const QueryResponseContext = createResponseContext<User>(initialQueryResponse);
export const QueryResponseProvider = ({
    listType,
    children,
}: PropsWithChildren<QueryResponseProviderProps>) => {
    const { state } = useQueryRequest();
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

    const GET_LIST_TYPE = () => {
        switch (listType) {
            case UsersType.Users:
                return QUERIES.USERS_LIST;
            case UsersType.DeletedUsers:
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
            const userQuery = parseRequestQuery(query);
            const currentQuery = {
                ...userQuery,
                column: userQuery?.sort || 'username',
                qry: userQuery?.search || '',
                type: userQuery?.order || 'asc',
            };
            // eslint-disable-next-line no-console
            // console.log(currentQuery);
            switch (listType) {
                case UsersType.Users:
                    return getUsers(currentQuery);
                case UsersType.DeletedUsers:
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

export const useQueryResponse = (dataType: UsersListType) => useContext(QueryResponseContext);

export const useQueryResponseData = (dataType: UsersListType) => {
    const { response } = useQueryResponse(dataType);
    if (!response) {
        return [];
    }

    return response?.data || [];
};

export const useQueryResponsePagination = (dataType: UsersListType): number => {
    const { response } = useQueryResponse(dataType);
    if (!response || !response.data) {
        return 0;
    }

    return response.data.length;
};

export const useQueryResponseLoading = (dataType: UsersListType): boolean => {
    const { isLoading } = useQueryResponse(dataType);
    return isLoading;
};

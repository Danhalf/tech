/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect, useMemo, PropsWithChildren } from 'react';
import { useQuery } from 'react-query';
import { useQueryRequest } from './QueryRequestProvider';
import {
    createResponseContext,
    initialQueryResponse,
    stringifyRequestQuery,
    QUERIES,
    Response,
} from '_metronic/helpers';
import { getDeletedUsers, getUsers } from 'components/dashboard/users/user.service';
import { User, UsersListType, UsersType } from 'common/interfaces/UserData';
import { UserQuery } from 'common/interfaces/QueriesParams';

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
            case UsersType.ACTIVE:
                return QUERIES.USERS_LIST;
            case UsersType.DELETED:
                return QUERIES.DELETED_USERS_LIST;
        }
    };

    const {
        isFetching,
        refetch,
        data: axiosResponse,
    } = useQuery(
        `${GET_LIST_TYPE()}`,
        () => {
            const currentQuery: UserQuery = {
                skip: state.currentpage * state.count,
                top: state.count,
                column: state.sort,
                qry: state.search,
                type: state.order,
            };

            switch (listType) {
                case UsersType.ACTIVE:
                    return getUsers(currentQuery);
                case UsersType.DELETED:
                    return getDeletedUsers(currentQuery);
            }
        },
        { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    );

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery);
            refetch();
        }
    }, [updatedQuery, state]);

    const response: Response<User[]> = {
        data: axiosResponse,
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

export const useQueryResponseDataLength = (dataType: UsersListType): number => {
    const { response } = useQueryResponse(dataType);
    return response?.data?.length || 0;
};

export const useQueryResponseLoading = (dataType: UsersListType): boolean => {
    const { isLoading } = useQueryResponse(dataType);
    return isLoading;
};

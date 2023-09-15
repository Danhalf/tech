import { QueryRequestContextProps, WithChildren, initialQueryRequest } from '_metronic/helpers';
import { useState, createContext, useContext } from 'react';
import { QueryState } from 'react-query/types/core/query';

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest);

export const QueryRequestProvider = ({ children }: WithChildren): JSX.Element => {
    const [state, setState] = useState<any>(initialQueryRequest.state);

    const updateState = (updates: Partial<any>) => {
        const updatedState = { ...state, ...updates } as QueryState;
        setState(updatedState);
    };

    return (
        <QueryRequestContext.Provider value={{ state, updateState }}>
            {children}
        </QueryRequestContext.Provider>
    );
};

export const useQueryRequest = () => useContext(QueryRequestContext);

import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { useState, useEffect, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { initialQueryState } from '_metronic/helpers';

export const UsersListSearchComponent = () => {
    const { state, updateState } = useQueryRequest();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isSearchUnchanged, setIsSearchUnchanged] = useState<boolean>(true);

    useEffect(() => {
        setIsSearchUnchanged(searchTerm === state.search);
    }, [searchTerm, state.search]);

    const handleSearch = (): void => {
        if (!isSearchUnchanged) {
            setIsSearchUnchanged(true);
            try {
                updateState({ ...state, search: searchTerm, currentpage: 0 });
            } catch (error) {}
        }
    };

    const handleClear = (): void => {
        setSearchTerm('');
        updateState(initialQueryState);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className='input-group w-350px'>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid pe-4'
                placeholder='Search user'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleKeyPress}
            />
            {searchTerm && (
                <button className={clsx('btn btn-light input-group-append')} onClick={handleClear}>
                    <i className='ki-outline ki-cross fs-2'></i>
                </button>
            )}
            <button
                className={clsx('btn btn-primary', {
                    disabled: isSearchUnchanged,
                })}
                onClick={handleSearch}
            >
                <i className='ki-outline ki-magnifier fs-2'></i>
            </button>
        </div>
    );
};

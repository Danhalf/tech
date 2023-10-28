import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { useState, useEffect, KeyboardEvent } from 'react';
import clsx from 'clsx';
import { initialQueryState } from '_metronic/helpers';

export const UsersListSearchComponent = () => {
    const { state, updateState } = useQueryRequest();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isSearchUnchanged, setIsSearchUnchanged] = useState<boolean>(true);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        setIsSearchUnchanged(searchTerm === state.search);
        !searchTerm && setIsSearching(false);
    }, [searchTerm, state.search]);

    const handleSearch = (): void => {
        if (!isSearchUnchanged) {
            setIsSearchUnchanged(true);
            try {
                updateState({ ...state, search: searchTerm, currentpage: 0 });
                setIsSearching(true);
            } catch (error) {
                setIsSearching(false);
            }
        }
    };

    const handleClear = (): void => {
        setSearchTerm('');
        updateState(initialQueryState);
        setIsSearching(false);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className='d-flex align-items-center my-1'>
            <div className='input-group position-relative'>
                <input
                    type='text'
                    data-kt-user-table-filter='search'
                    className='form-control form-control-solid w-250px'
                    placeholder='Search user'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyUp={handleKeyPress}
                />
                {isSearching ? (
                    <button
                        className={clsx('btn position-absolute end-0 me-14')}
                        onClick={handleClear}
                    >
                        <i className='ki-outline ki-cross fs-2'></i>
                    </button>
                ) : null}
                <button
                    className={clsx('btn btn-primary', {
                        disabled: isSearchUnchanged,
                    })}
                    onClick={handleSearch}
                >
                    <i className='ki-outline ki-magnifier fs-2'></i>
                </button>
            </div>
        </div>
    );
};

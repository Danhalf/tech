import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { useState, useEffect, KeyboardEvent } from 'react';
import clsx from 'clsx';

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
            updateState({ ...state, search: searchTerm });
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className='d-flex align-items-center position-relative my-1'>
            <div className='input-group'>
                <input
                    type='text'
                    data-kt-user-table-filter='search'
                    className='form-control form-control-solid w-250px'
                    placeholder='Search user'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
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

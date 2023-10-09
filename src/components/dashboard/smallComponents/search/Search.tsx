import { useDebounce } from '_metronic/helpers';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { useState, useEffect } from 'react';

export const UsersListSearchComponent = () => {
    const { state, updateState } = useQueryRequest();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 150);
    useEffect(() => {
        if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
            updateState({ ...state, search: debouncedSearchTerm });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm]);

    return (
        <div className='d-flex align-items-center position-relative my-1'>
            <i className='ki-duotone ki-magnifier fs-1 position-absolute ms-6'>
                <span className='path1'></span>
                <span className='path2'></span>
            </i>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid w-250px ps-14'
                placeholder='Search user'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

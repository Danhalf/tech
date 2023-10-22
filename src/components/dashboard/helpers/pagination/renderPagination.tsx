/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
    useQueryResponseDataLength,
    useQueryResponseLoading,
} from 'common/core/QueryResponseProvider';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { initialQueryState } from '_metronic/helpers';
import { UsersListType } from 'common/interfaces/UserData';

interface UsersListPaginationProps {
    list: UsersListType;
    totalRecords: number;
}

export const UsersListPagination = ({ list, totalRecords }: UsersListPaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const isLoading = useQueryResponseLoading(list);
    const searchResultLength = useQueryResponseDataLength(list);
    const [pagesCount, setPagesCount] = useState<number>(totalRecords);

    const { state, updateState } = useQueryRequest();

    const recordsPerPage = initialQueryState.count;

    useEffect(() => {
        if (!!state.search?.length) {
            setPagesCount(searchResultLength);
        } else {
            setPagesCount(totalRecords);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResultLength, state.search]);

    useEffect(() => {
        if (currentPage !== undefined) {
            const currentpage = currentPage * recordsPerPage;

            updateState({ ...state, currentpage });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handleSetCurrentPage = (page: number): void => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(pagesCount / recordsPerPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

    return (
        <div className='w-100 py-6 col-sm-12 col-md-7 d-flex align-items-center justify-content-center'>
            <div id='kt_table_users_paginate'>
                <ul className='pagination'>
                    <li
                        className={clsx('page-item previous', {
                            disabled: isLoading || currentPage === 0,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(currentPage - 1)}
                        >
                            <i className='previous'></i>
                        </a>
                    </li>

                    {pageNumbers.map((pageNumber) => (
                        <li
                            key={pageNumber}
                            className={clsx('page-item', {
                                disabled: isLoading,
                                active: pageNumber === currentPage,
                            })}
                        >
                            <a
                                href='#'
                                className='page-link'
                                onClick={() => handleSetCurrentPage(pageNumber)}
                            >
                                {pageNumber + 1}
                            </a>
                        </li>
                    ))}

                    <li
                        className={clsx('page-item next', {
                            disabled: isLoading || currentPage === totalPages - 1,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(currentPage + 1)}
                        >
                            <i className='next'></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
    useQueryResponseDataLength,
    useQueryResponseLoading,
} from 'common/core/QueryResponseProvider';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { getLocalState, initialQueryState } from '_metronic/helpers';
import { UsersListType } from 'common/interfaces/UserData';
import { LOC_STORAGE_USER_STATE } from 'common/app-consts';

interface UsersListPaginationProps {
    list: UsersListType;
    totalRecords: number;
}

const { login, usersPage } = getLocalState();

export const UsersListPagination = ({ list, totalRecords }: UsersListPaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(initialQueryState.currentpage);
    const isLoading = useQueryResponseLoading(list);
    const searchResultLength = useQueryResponseDataLength(list);
    const [pagesCount, setPagesCount] = useState<number>(totalRecords);
    const showedPages = 3;

    const { state, updateState } = useQueryRequest();

    const recordsPerPage = initialQueryState.count;

    useEffect(() => {
        if (!!state.search?.length) {
            setPagesCount(searchResultLength);
        } else {
            setPagesCount(totalRecords);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResultLength, state.search, totalRecords]);

    const handleSetCurrentPage = (page: number): void => {
        setCurrentPage(page);
        localStorage.setItem(LOC_STORAGE_USER_STATE, JSON.stringify({ login, usersPage: page }));

        updateState({ ...state, currentpage: page });
    };

    useEffect(() => {
        if (usersPage) {
            setCurrentPage(usersPage);
        }
    }, []);

    const totalPages = Math.ceil(pagesCount / recordsPerPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

    return (
        <div className='w-100 py-6 col-sm-12 col-md-7 d-flex align-items-center justify-content-center'>
            <div id='kt_table_users_paginate'>
                <ul className='pagination'>
                    <li
                        className={clsx('page-item first', {
                            disabled: isLoading || currentPage === 0,
                        })}
                    >
                        <a href='#' className='page-link' onClick={() => handleSetCurrentPage(0)}>
                            <i className='ki-outline ki-double-left fs-4'></i>
                        </a>
                    </li>
                    <li
                        className={clsx('page-item previous me-6', {
                            disabled: isLoading || currentPage === 0,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(currentPage - 1)}
                        >
                            <i className='ki-outline ki-left fs-4'></i>
                        </a>
                    </li>

                    {pageNumbers.map((pageNumber) => {
                        if (
                            currentPage + showedPages > pageNumber &&
                            currentPage - showedPages < pageNumber
                        ) {
                            return (
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
                            );
                        } else return null;
                    })}

                    <li
                        className={clsx('page-item next ms-6', {
                            disabled: isLoading || currentPage === totalPages - 1,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(currentPage + 1)}
                        >
                            <i className='ki-outline ki-right fs-4'></i>
                        </a>
                    </li>
                    <li
                        className={clsx('page-item last', {
                            disabled: isLoading || currentPage === totalPages - 1,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => handleSetCurrentPage(totalPages - 1)}
                        >
                            <i className='ki-outline ki-double-right fs-4'></i>
                        </a>
                    </li>
                </ul>
                <div className='mt-4 text-center fs-5'>Records per page: {recordsPerPage}</div>
                <div className='mt-4 text-center fs-5'>Total records: {totalRecords}</div>
            </div>
        </div>
    );
};

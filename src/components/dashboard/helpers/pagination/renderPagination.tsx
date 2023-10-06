/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useQueryResponseLoading } from 'common/core/QueryResponseProvider';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { initialQueryState } from '_metronic/helpers';
import { UsersListType } from 'common/interfaces/UserData';

interface UsersListPaginationProps {
    list: UsersListType, totalRecords: number
}

export const UsersListPagination = ({ list, totalRecords }: UsersListPaginationProps) => {

    const [currentpage, setCurrentPage] = useState<number>(0);
    const isLoading = useQueryResponseLoading(list);

    const { state, updateState } = useQueryRequest();

    const recordsPerPage = initialQueryState.count;

    useEffect(() => {
        if (currentpage !== undefined) {
            updateState({ ...state, currentpage: currentpage * recordsPerPage });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentpage]);

    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

    return (
        <div className='row'>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center'>
                <div id='kt_table_users_paginate'>
                    <ul className='pagination'>
                        <li
                            className={clsx('page-item previous', {
                                disabled: isLoading || currentpage === 0,
                            })}
                        >
                            <a
                                href='#'
                                className='page-link'
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                                <i className='previous'></i>
                            </a>
                        </li>

                        {pageNumbers.map((pageNumber) => (
                            <li
                                key={pageNumber}
                                className={clsx('page-item', {
                                    active: pageNumber === currentpage,
                                })}
                            >
                                <a
                                    href='#'
                                    className='page-link'
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber + 1}
                                </a>
                            </li>
                        ))}

                        <li
                            className={clsx('page-item next', {
                                disabled: isLoading || currentpage === totalPages - 1,
                            })}
                        >
                            <a
                                href='#'
                                className='page-link'
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                                <i className='next'></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

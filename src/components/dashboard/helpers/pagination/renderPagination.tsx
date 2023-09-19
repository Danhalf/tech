/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useQueryResponseLoading } from 'common/core/QueryResponseProvider';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { UsersListType } from 'components/dashboard/users/types/Users.types';
import { getTotalUsersRecords } from 'components/dashboard/users/api/user.service';

export const UsersListPagination = ({ list }: { list: UsersListType }) => {
    const [totalRecords, setTotalRecords] = useState<number>(0);

    const [currentpage, setCurrentPage] = useState<number>(1);
    const isLoading = useQueryResponseLoading(list);

    const { state, updateState } = useQueryRequest();

    useEffect(() => {
        getTotalUsersRecords().then(({ total }) => {
            setTotalRecords(total);
        });
    }, []);

    useEffect(() => {
        if (currentpage !== undefined) {
            updateState({ ...state, currentpage });
        }
    }, [currentpage]);

    const recordsPerPage = 10;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='row'>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center'>
                <div id='kt_table_users_paginate'>
                    <ul className='pagination'>
                        <li
                            className={clsx('page-item previous', {
                                disabled: isLoading || currentpage === 1,
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
                                    {pageNumber}
                                </a>
                            </li>
                        ))}

                        <li
                            className={clsx('page-item next', {
                                disabled: isLoading || currentpage === totalPages,
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

/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';

import { useEffect, useState } from 'react';
import { useQueryResponseLoading } from 'common/core/QueryResponseProvider';
import { useQueryRequest } from 'common/core/QueryRequestProvider';
import { UsersListType } from 'components/dashboard/users/types/Users.types';

export const UsersListPagination = ({
    list,
    totalRows,
}: {
    list: UsersListType;
    totalRows: number;
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageCount = 3;
    const isLoading = useQueryResponseLoading(list);

    const { state, updateState } = useQueryRequest();
    useEffect(() => {
        if (currentPage !== undefined) {
            updateState({ ...state, currentPage });
        }
    }, [currentPage]);

    return (
        <div className='row'>
            <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center'>
                <div id='kt_table_users_paginate'>
                    <ul className='pagination'>
                        <li
                            className={clsx('page-item', {
                                disabled: isLoading,
                            })}
                        >
                            <a
                                onClick={() => setCurrentPage(1)}
                                style={{ cursor: 'btn btn-primary pointer' }}
                                className='page-link'
                            >
                                First
                            </a>
                        </li>

                        <li
                            className={clsx('page-item', {
                                disabled: isLoading,
                            })}
                        >
                            <button
                                onClick={() => setCurrentPage(2)}
                                style={{ cursor: 'btn btn-primary pointer' }}
                                className='page-link'
                            >
                                Last
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

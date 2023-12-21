/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { RecordsPerPageSteps, VisiblePageCount } from 'common/settings/settings';

interface CustomPaginationProps {
    records: number;
    initialCurrentPage?: number;
}

const updatePageNumbers = (length: number): number[] => {
    return Array.from({ length }, (_, index) => index);
};

export const CustomPagination = ({ records, initialCurrentPage }: CustomPaginationProps) => {
    const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage || 0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    return (
        <div className='w-100 py-6 col-sm-12 col-md-7 d-flex align-items-center justify-content-center'>
            <div id='kt_table_users_paginate'>
                <ul className='pagination'>
                    <li
                        className={clsx('page-item first', {
                            disabled: isLoading || currentPage === 0,
                        })}
                    >
                        <a href='#' className='page-link' onClick={() => setCurrentPage(0)}>
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
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            <i className='ki-outline ki-left fs-4'></i>
                        </a>
                    </li>

                    {pageNumbers &&
                        pageNumbers.map((pageNumber) => {
                            if (
                                currentPage + VisiblePageCount > pageNumber &&
                                currentPage - VisiblePageCount < pageNumber
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
                                            onClick={() => setCurrentPage(pageNumber)}
                                        >
                                            {pageNumber + 1}
                                        </a>
                                    </li>
                                );
                            } else return null;
                        })}

                    <li
                        className={clsx('page-item next ms-6', {
                            disabled:
                                isLoading ||
                                currentPage === totalPages - 1 ||
                                currentPage > totalPages,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            <i className='ki-outline ki-right fs-4'></i>
                        </a>
                    </li>
                    <li
                        className={clsx('page-item last', {
                            disabled:
                                isLoading ||
                                currentPage === totalPages - 1 ||
                                currentPage > totalPages,
                        })}
                    >
                        <a
                            href='#'
                            className='page-link'
                            onClick={() => setCurrentPage(totalPages - 1)}
                        >
                            <i className='ki-outline ki-double-right fs-4'></i>
                        </a>
                    </li>
                </ul>
                <div className='mt-4 text-center fs-5'>
                    <label className='d-flex w-100 align-items-center gap-4 justify-content-center '>
                        <span className='text-nowrap'>Records per page</span>
                        <Form.Select
                            aria-label='records per page'
                            className='w-50'
                            // value={state.count}
                            // onChange={(event) =>
                            //     handleChangeRecordsPerPage(Number(event.target.value))
                            // }
                        >
                            {RecordsPerPageSteps.map((value) => {
                                return (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </label>
                    <div className='mt-4 text-center fs-5'>Total records: {totalRecords}</div>
                </div>
            </div>
        </div>
    );
};

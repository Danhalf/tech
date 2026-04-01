import { AxiosError } from 'axios';
import clsx from 'clsx';
import { Dealer, DealerStatusParam } from 'common/interfaces/Dealer';
import { DefaultRecordsPerPage, RecordsPerPage } from 'common/settings/settings';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomPagination } from '../helpers/pagination/renderPagination';
import { useToast } from '../helpers/renderToastHelper';
import { getDealerUsers, getDealers } from './dealers.service';

const statusOptions: Array<{ value: DealerStatusParam; label: string }> = [
    { value: 'pre_approved', label: 'Pre-approved' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'expired', label: 'Expired' },
];

const formatSandbox = (value: number): string => {
    if (value === 1) return 'Yes';
    if (value === 0) return 'No';
    return String(value);
};

export const Dealers = () => {
    const [dealers, setDealers] = useState<Dealer[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [statusFilter, setStatusFilter] = useState<DealerStatusParam | ''>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentCount, setCurrentCount] = useState<RecordsPerPage>(DefaultRecordsPerPage);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
    const [usersByDealer, setUsersByDealer] = useState<
        Record<string, { loading: boolean; rows: { useruid: string; username: string }[] }>
    >({});
    const { handleShowToast } = useToast();

    const loadDealers = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await getDealers({
                top: currentCount,
                skip: currentPage * currentCount,
                param: statusFilter || undefined,
            });
            setDealers(response.dealers ?? []);
            setTotal(
                typeof response.total === 'number' ? response.total : response.dealers?.length ?? 0
            );
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        } finally {
            setIsLoading(false);
        }
    }, [currentCount, currentPage, statusFilter, handleShowToast]);

    useEffect(() => {
        void loadDealers();
    }, [loadDealers]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleCountChange = (count: RecordsPerPage) => {
        setCurrentCount(count);
        setCurrentPage(0);
    };

    const handleFilterChange = (value: DealerStatusParam | '') => {
        setStatusFilter(value);
        setCurrentPage(0);
    };

    const toggleExpand = (dealerId: string) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(dealerId)) {
                next.delete(dealerId);
            } else {
                next.add(dealerId);
                if (!usersByDealer[dealerId]) {
                    setUsersByDealer((u) => ({
                        ...u,
                        [dealerId]: { loading: true, rows: [] },
                    }));
                    getDealerUsers(dealerId)
                        .then((rows) => {
                            setUsersByDealer((u) => ({
                                ...u,
                                [dealerId]: { loading: false, rows },
                            }));
                        })
                        .catch((err) => {
                            const { message } = err as Error | AxiosError;
                            handleShowToast({ message, type: 'danger' });
                            setUsersByDealer((u) => ({
                                ...u,
                                [dealerId]: { loading: false, rows: [] },
                            }));
                        });
                }
            }
            return next;
        });
    };

    return (
        <div className='card'>
            <div className='card-body'>
                <div className='d-flex justify-content-between align-items-center mb-5'>
                    <h3 className='m-0'>Dealers</h3>
                    <div className='d-flex align-items-center gap-3'>
                        <label className='mb-0 text-muted fw-bold'>Status</label>
                        <select
                            className='form-select form-select-sm w-200px'
                            value={statusFilter}
                            onChange={(event) =>
                                handleFilterChange(event.target.value as DealerStatusParam | '')
                            }
                        >
                            <option value=''>All statuses</option>
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='table-responsive position-relative'>
                    {isLoading && (
                        <div className='processing-overlay cursor-default position-absolute w-100 h-100 d-flex align-items-center justify-content-center'>
                            <div className='p-6 bg-white rounded-2 shadow-sm'>Processing...</div>
                        </div>
                    )}
                    <table className='table align-middle table-row-dashed fs-6 gy-3 dataTable no-footer'>
                        <thead>
                            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                <th className='w-50px' aria-label='Expand' />
                                <th>Company name</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Sandbox mode</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 fw-bold'>
                            {dealers.length > 0 ? (
                                dealers.map((dealer) => {
                                    const expanded = expandedIds.has(dealer.id);
                                    const usersState = usersByDealer[dealer.id];
                                    return (
                                        <Fragment key={dealer.id}>
                                            <tr role='row'>
                                                <td>
                                                    <button
                                                        type='button'
                                                        className='btn btn-icon btn-sm btn-light me-1'
                                                        onClick={() => toggleExpand(dealer.id)}
                                                        aria-expanded={expanded}
                                                        aria-label={
                                                            expanded
                                                                ? 'Collapse users'
                                                                : 'Expand users'
                                                        }
                                                    >
                                                        <i
                                                            className={clsx(
                                                                'ki-outline fs-3',
                                                                expanded ? 'ki-down' : 'ki-right'
                                                            )}
                                                        />
                                                    </button>
                                                </td>
                                                <td>{dealer.company_name}</td>
                                                <td>{dealer.dealer_status}</td>
                                                <td>{dealer.dealer_type}</td>
                                                <td>{formatSandbox(dealer.sandbox_mode)}</td>
                                                <td>{dealer.created}</td>
                                            </tr>
                                            {expanded && (
                                                <tr className='bg-light'>
                                                    <td colSpan={6} className='p-0'>
                                                        <div className='ps-10 ms-6 py-4 border-start border-3 border-primary'>
                                                            <div className='text-muted fw-bold fs-7 mb-2'>
                                                                Users
                                                            </div>
                                                            {usersState?.loading && (
                                                                <span className='text-muted fs-7'>
                                                                    Loading…
                                                                </span>
                                                            )}
                                                            {!usersState?.loading &&
                                                                (usersState?.rows?.length ? (
                                                                    <ul className='list-unstyled mb-0 ps-2'>
                                                                        {usersState.rows.map(
                                                                            (u) => (
                                                                                <li
                                                                                    key={u.useruid}
                                                                                    className='mb-1'
                                                                                >
                                                                                    <Link
                                                                                        to={`/dashboard/user/${u.useruid}`}
                                                                                        className='text-gray-800 text-hover-primary'
                                                                                    >
                                                                                        {u.username}
                                                                                    </Link>
                                                                                    <span className='text-muted fs-8 ms-2'>
                                                                                        {u.useruid}
                                                                                    </span>
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                ) : (
                                                                    <span className='text-muted fs-7'>
                                                                        No users
                                                                    </span>
                                                                ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <div className='d-flex text-center w-100 align-content-center justify-content-center py-6'>
                                            No matching records found
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <CustomPagination
                    records={total}
                    count={currentCount}
                    initialCurrentPage={currentPage}
                    onPageChange={handlePageChange}
                    onCountChange={handleCountChange}
                />
            </div>
        </div>
    );
};

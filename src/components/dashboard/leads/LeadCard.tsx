import { AxiosError } from 'axios';
import { leadsKeys } from 'common/app-consts';
import { formatServerDateForDisplay } from 'components/dashboard/helpers/common';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../helpers/renderToastHelper';
import { deleteLead, getLead } from './leads.service';
import { PrimaryButton } from '../smallComponents/buttons/PrimaryButton';

const isEmpty = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    return false;
};

const isDateLikeFieldKey = (fieldKey: string): boolean =>
    fieldKey === 'created' || fieldKey === 'updated' || fieldKey.endsWith('_at');

const formatFieldValue = (fieldKey: string, value: unknown): string => {
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }
    if (isDateLikeFieldKey(fieldKey)) {
        return formatServerDateForDisplay(value);
    }
    return String(value);
};

const LEAD_FIELD_ORDER: string[] = [
    'id',
    'created',
    'updated',
    'status',
    'lead_status',
    'status_code',
    'source',
    'source_code',
    'source_details',
    'company_name',
    'company_address',
    'city',
    'state',
    'zip',
    'first_name',
    'last_name',
    'email',
    'phone',
    'dealer_type',
    'referral_code',
    'notes',
    'recaptcha_verified',
    'reviewed_by_user_uid',
    'reviewed_at',
    'review_notes',
];

const humanizeKey = (key: string): string =>
    key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const sortLeadKeys = (keys: string[]): string[] => {
    const orderMap = new Map(LEAD_FIELD_ORDER.map((fieldKey, index) => [fieldKey, index]));
    const unknownRank = LEAD_FIELD_ORDER.length;
    return [...keys].sort((leftKey, rightKey) => {
        const rankLeft = orderMap.has(leftKey) ? orderMap.get(leftKey)! : unknownRank;
        const rankRight = orderMap.has(rightKey) ? orderMap.get(rightKey)! : unknownRank;
        if (rankLeft !== rankRight) return rankLeft - rankRight;
        return leftKey.localeCompare(rightKey);
    });
};

export const LeadCard = () => {
    const { id } = useParams();
    const [leadRecord, setLeadRecord] = useState<Record<string, unknown> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { handleShowToast } = useToast();
    const navigate = useNavigate();
    const fetchLead = useCallback(async (): Promise<void> => {
        if (!id) return;
        setIsLoading(true);
        try {
            const data = await getLead(id);
            setLeadRecord(data as unknown as Record<string, unknown>);
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
            setLeadRecord(null);
        } finally {
            setIsLoading(false);
        }
    }, [id, handleShowToast]);

    useEffect(() => {
        void fetchLead();
    }, [fetchLead]);

    const rows = useMemo(() => {
        if (!leadRecord) return [];
        const keys = sortLeadKeys(Object.keys(leadRecord));
        return keys
            .map((key) => ({ key, value: leadRecord[key] }))
            .filter(({ value }) => !isEmpty(value));
    }, [leadRecord]);
    const leadCompanyName = useMemo(() => {
        const companyName = leadRecord?.company_name;
        if (typeof companyName === 'string' && companyName.trim() !== '') return companyName;
        return 'unknown';
    }, [leadRecord]);

    const handleDelete = async () => {
        if (!id) return;
        try {
            await deleteLead(id);
            handleShowToast({
                message: 'Lead successfully deleted',
                type: 'success',
            });
            navigate('/dashboard/leads');
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    return (
        <div className='card mb-5 mb-xl-10'>
            <div className='card-header'>
                <div className='w-100 py-4'>
                    <h3 className='fw-bolder m-0 my-6'>Lead {leadCompanyName}</h3>
                    <div className='d-flex align-items-center flex-wrap gap-3'>
                        <PrimaryButton
                            icon='arrow-left'
                            buttonClickAction={() => navigate('/dashboard/leads')}
                            appearance='light'
                        >
                            Back to leads
                        </PrimaryButton>
                        <PrimaryButton
                            icon='arrows-circle'
                            buttonClickAction={() => void fetchLead()}
                        >
                            Refresh
                        </PrimaryButton>
                        <PrimaryButton
                            className='ms-auto'
                            icon='trash'
                            buttonClickAction={handleDelete}
                            appearance='danger'
                        >
                            Delete
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div className='card-body p-9 position-relative'>
                {isLoading && (
                    <div className='processing-overlay cursor-default position-absolute w-100 h-100 d-flex align-items-center justify-content-center start-0 top-0'>
                        <div className='p-6 bg-white rounded-2 shadow-sm'>Loading...</div>
                    </div>
                )}
                {!id && <div className='text-muted'>Lead ID is missing.</div>}
                {id && !isLoading && !leadRecord && (
                    <div className='text-muted'>Lead not found or could not be loaded.</div>
                )}
                {leadRecord &&
                    rows.map(({ key, value }) => (
                        <div className='row mb-7' key={key}>
                            <label className='col-lg-4 fw-bold text-muted'>
                                {leadsKeys[key] ?? humanizeKey(key)}
                            </label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-dark'>
                                    {formatFieldValue(key, value)}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

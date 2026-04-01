import { fetchApiData } from 'common/api/fetchAPI';
import { DefaultRecordsPerPage } from 'common/settings/settings';
import { DealerLinkedUser, DealersListResponse, DealerStatusParam } from 'common/interfaces/Dealer';
import { UserQuery } from 'common/interfaces/QueriesParams';

export interface GetDealersParams {
    top?: number;
    skip?: number;
    param?: DealerStatusParam;
}

export const getDealers = (params?: GetDealersParams): Promise<DealersListResponse> => {
    const top = params?.top ?? DefaultRecordsPerPage;
    const skip = params?.skip ?? 0;

    return fetchApiData<DealersListResponse>('GET', 'dealer', {
        params: {
            top,
            skip,
            ...(params?.param ? { param: params.param } : {}),
        } as UserQuery,
    });
};

export const getDealerUsers = async (dealerId: string): Promise<DealerLinkedUser[]> => {
    const res = await fetchApiData<DealerUsersApiShape>('GET', `dealer/${dealerId}/users`);
    if (Array.isArray(res)) {
        return normalizeUsers(res);
    }
    if (res && 'users' in res && Array.isArray(res.users)) {
        return normalizeUsers(res.users);
    }
    if (res && 'records' in res && Array.isArray(res.records)) {
        return normalizeUsers(res.records);
    }
    return [];
};

type DealerUsersApiShape =
    | DealerLinkedUser[]
    | { users?: DealerLinkedUser[] }
    | { records?: DealerLinkedUser[] };

function normalizeUsers(rows: DealerLinkedUser[]): DealerLinkedUser[] {
    return rows.map((row) => ({
        useruid: String(row.useruid ?? ''),
        username: String(row.username ?? ''),
    }));
}

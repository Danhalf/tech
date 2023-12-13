import { fetchApiData } from 'common/api/fetchAPI';
import { ActionStatus } from 'common/interfaces/ActionStatus';

export const getUserApiKeys = (useruid?: string): Promise<any[]> => {
    return fetchApiData<any[]>('GET', `user/${useruid}/apikeys`);
};

// export const deleteUser = (uid: string): Promise<ActionStatus> => {
//     return fetchApiData<ActionStatus>('POST', `user/${uid}/delete`);
// };

// export const setUserPermissions = (uid: string, data: unknown): Promise<ActionStatus> => {
//     return fetchApiData('POST', `user/${uid}/permissions`, { data });
// };

// export const getUserPermissions = (uid: string): Promise<string> => {
//     return fetchApiData<string>('GET', `user/${uid}/permissions`);
// };

import { fetchApiData } from 'common/api/fetchAPI';
import { ApiKeyRecord, ApiTypesResponse } from 'common/interfaces/UserApiKeys';

export const getUserApiKeysList = (useruid: string): Promise<ApiKeyRecord[]> => {
    return fetchApiData<ApiKeyRecord[]>('GET', `user/${useruid}/apikeys`);
};

export const getApiKey = (keyuid: string): Promise<any[]> => {
    return fetchApiData<any[]>('GET', `user/${keyuid}/apikey`);
};

export const getApiKeysTypes = (): Promise<ApiTypesResponse> => {
    return fetchApiData<ApiTypesResponse>('GET', 'user/listapikeys');
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

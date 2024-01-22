import { fetchApiData } from 'common/api/fetchAPI';
import { ActionStatus, Status } from 'common/interfaces/ActionStatus';
import { ApiKeyRecord, ApiTypesResponse } from 'common/interfaces/UserApiKeys';

export const getUserApiKeysList = (useruid: string): Promise<ApiKeyRecord[]> => {
    return fetchApiData<ApiKeyRecord[]>('GET', `user/${useruid}/apikeys`);
};

export const getApiKey = (keyuid: string): Promise<ApiKeyRecord[]> => {
    return fetchApiData<ApiKeyRecord[]>('GET', `user/${keyuid}/apikey`);
};

export const getApiKeysTypes = (): Promise<ApiTypesResponse> => {
    return fetchApiData<ApiTypesResponse>('GET', 'user/listapikeys');
};

export const setUserApiKey = (uid: string, data?: Partial<ApiKeyRecord>): Promise<ActionStatus> => {
    return fetchApiData<ActionStatus>('POST', `user/${uid}/apikeyset`, { data });
};

export const deleteUserApiKey = (keyuid: string): Promise<ActionStatus> => {
    return fetchApiData<ActionStatus>('POST', `user/${keyuid}/apikeydelete`);
};

export const undeleteUserApiKey = (keyuid: string): Promise<Status> => {
    return fetchApiData<Status>('POST', `user/${keyuid}/apikeyundelete`);
};

export const getClientUid = (): Promise<Record<string, string>[]> => {
    return fetchApiData<Record<string, string>[]>('GET', 'user/getuid');
};

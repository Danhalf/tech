import { fetchApiData } from 'common/api/fetchAPI';
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

export const setUserApiKey = (uid: string, data?: Partial<ApiKeyRecord>): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/apikeyset`, { data });
};

export const deleteUserApiKey = (keyuid: string): Promise<any> => {
    return fetchApiData('POST', `user/${keyuid}/apikeydelete`);
};

export const undeleteUserApiKey = (keyuid: string): Promise<any> => {
    return fetchApiData('POST', `user/${keyuid}/apikeyundelete`);
};

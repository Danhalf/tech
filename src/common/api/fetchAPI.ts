import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'common/app-consts';
import { UserQuery } from 'common/interfaces/QueriesParams';
import { getToken } from 'common/utils';

type Method = 'GET' | 'POST';

export const fetchApiData = async <T>(
    method: Method,
    url: string,
    options?: { data?: unknown; params?: UserQuery; contentType?: 'application/data' }
): Promise<T> => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
    };
    const { data, params, contentType } = options || {};
    try {
        const response: AxiosResponse<T> = await axios({
            method,
            url: API_URL + url,
            data,
            params,
            headers: {
                ...headers,
                'Content-Type': contentType || 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

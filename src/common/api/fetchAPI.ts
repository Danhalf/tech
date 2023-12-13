import axios, { AxiosResponse, ResponseType as AxiosResponseType } from 'axios';
import { API_URL } from 'common/app-consts';
import { UserQuery } from 'common/interfaces/QueriesParams';
import { getToken } from 'common/utils';

type Method = 'GET' | 'POST';

interface FetchHeaders {
    Authorization?: string;
    'Content-Type'?: 'application/data' | 'application/json';
}

export const fetchApiData = async <T>(
    method: Method,
    url: string,
    options?: { data?: unknown; params?: UserQuery; responseType?: AxiosResponseType },
    headers?: FetchHeaders
): Promise<T> => {
    const { data, params, responseType } = options || {};
    const defaultHeaders: FetchHeaders = {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
    };

    try {
        const response: AxiosResponse<T> = await axios({
            method,
            url: API_URL + url,
            data,
            params,
            responseType,
            headers: { ...defaultHeaders, ...headers },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

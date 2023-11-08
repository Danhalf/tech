import axios, { AxiosResponse } from 'axios';
import { API_URL } from 'common/app-consts';
import { UserQuery } from 'common/interfaces/QueriesParams';
import { getApplicationType, getToken } from 'common/utils';

type Method = 'GET' | 'POST';

export const fetchApiData = async <T>(
    method: Method,
    url: string,
    options?: { data?: unknown; params?: UserQuery }
): Promise<T> => {
    const headers = {
        Authorization: `Bearer ${getToken()}`,
        ...getApplicationType(),
    };
    const { data, params } = options || {};
    try {
        const response: AxiosResponse<T> = await axios({
            method,
            url: API_URL + url,
            data,
            params,
            headers,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

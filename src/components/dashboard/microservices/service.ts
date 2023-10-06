import axios from 'axios';
import { getToken } from 'common/utils';
import { API_URL } from 'common/app-consts';
import { Microservice } from 'common/interfaces/MicroserviceServerData';
import { ActionStatus } from 'common/interfaces/ActionStatus';
import { ServicesSortParams } from 'common/interfaces/QueriesParams';

export const getServiceById = (uid: string) => {
    return axios
        .get<Microservice[]>(`${API_URL}services/${uid}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data[0]);
};

export const listServices = (params?: ServicesSortParams) => {
    const initialParams: ServicesSortParams = {
        column: params?.column || 'name',
        type: params?.type || 'ASC',
    };

    return axios
        .get<Microservice[]>(`${API_URL}services/list`, {
            headers: { Authorization: `Bearer ${getToken()}` },
            params: initialParams,
        })
        .then((response) => response.data);
};

export const getServiceLogs = (uid: string) => {
    return axios
        .get<ActionStatus>(`${API_URL}services/${uid}/logs`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data);
};

export const getServiceAudit = (uid: string) => {
    return axios
        .get<ActionStatus>(`${API_URL}services/${uid}/audit`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data);
};

export const getServiceAlerts = (uid: string) => {
    return axios
        .get<ActionStatus>(`${API_URL}services/${uid}/allerts`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data);
};

export const getServiceCounters = (uid: string) => {
    return axios
        .get<ActionStatus>(`${API_URL}services/${uid}/counters`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data);
};

export const stopService = (id: string) => {
    return axios
        .get<ActionStatus>(API_URL + 'services/' + id + '/stop', {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data);
};

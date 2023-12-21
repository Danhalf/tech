import {
    Microservice,
    MicroserviceCounters,
    MicroserviceServerData,
} from 'common/interfaces/MicroserviceServerData';
import { ServiceCheckDBResponse, ServiceStopResponse } from 'common/interfaces/ActionStatus';
import { ServicesSortParams } from 'common/interfaces/QueriesParams';
import { fetchApiData } from 'common/api/fetchAPI';

export const getServiceById = (uid: string) => {
    return fetchApiData<Microservice>('GET', `services/${uid}`);
};

export const listServices = (params?: ServicesSortParams): Promise<Microservice[]> => {
    const initialParams: ServicesSortParams = {
        column: params?.column || 'name',
        type: params?.type || 'asc',
    };

    return fetchApiData<Microservice[]>('GET', 'services/list', { params: initialParams });
};

export const getServiceLogs = (uid: string): Promise<MicroserviceServerData[]> => {
    return fetchApiData<MicroserviceServerData[]>('GET', `services/${uid}/logs`);
};

export const getServiceAudit = (uid: string): Promise<MicroserviceServerData[]> => {
    return fetchApiData<MicroserviceServerData[]>('GET', `services/${uid}/audit`);
};

export const getServiceAlerts = (uid: string): Promise<MicroserviceServerData[]> => {
    return fetchApiData<MicroserviceServerData[]>('GET', `services/${uid}/allerts`);
};

export const getServiceCounters = (uid: string): Promise<MicroserviceCounters[]> => {
    return fetchApiData<MicroserviceCounters[]>('GET', `services/${uid}/counters`);
};

export const stopService = (id: string): Promise<ServiceStopResponse> => {
    return fetchApiData<ServiceStopResponse>('POST', `services/${id}/stop`);
};

export const checkServiceDB = (id: string): Promise<ServiceCheckDBResponse> => {
    return fetchApiData<ServiceCheckDBResponse>('POST', `services/${id}/checkdb`);
};

import {
    Microservice,
    MicroserviceCounters,
    MicroserviceServerData,
} from 'common/interfaces/MicroserviceServerData';
import { ServiceCheckDBResponse, ServiceStopResponse } from 'common/interfaces/ActionStatus';
import { ServicesSortParams } from 'common/interfaces/QueriesParams';
import { fetchApiData } from 'common/api/fetchAPI';

export const getImportList = (useruid?: string): Promise<any> => {
    return fetchApiData<any>('GET', ` import/${useruid || 0}/list`);
};

export const deleteImportItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `import/${itemuid}/deleteitem`);
};
export const getImportItemInfo = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('GET', `import/${itemuid}/metadata`);
};

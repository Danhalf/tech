import { fetchApiData } from 'common/api/fetchAPI';

export const getImportList = (useruid?: string): Promise<any> => {
    return fetchApiData<any>('GET', `import/${useruid || 0}/list`);
};

export const deleteImportItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `import/${itemuid}/deleteitem`);
};
export const getImportItemInfo = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('GET', `import/${itemuid}/metadata`);
};

export const getTemplateReports = (): Promise<any> => {
    return fetchApiData<any>('GET', `reports/list`);
};

export const deleteReportsItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `reports/${itemuid}/deleteitem`);
};

export const setReportsItemInfo = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `reports/${itemuid}/set`);
};

export const getTemplatePrints = (): Promise<any> => {
    return fetchApiData<any>('GET', `print/list`);
};

export const deletePrintItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `print/${itemuid}/deleteitem`);
};

export const setPrintItemInfo = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `print/${itemuid}/set`);
};

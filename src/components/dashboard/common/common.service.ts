import { fetchApiData } from 'common/api/fetchAPI';
import { DataImportsInfoResponse, DataImportsResponse } from 'common/interfaces/DataImports';
import { TemplatesPrintedData } from 'common/interfaces/TemplatesPrintedData';

export const getImportList = (useruid?: string): Promise<DataImportsResponse> => {
    return fetchApiData<DataImportsResponse>('GET', `import/${useruid || 0}/list`);
};

export const deleteImportItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `import/${itemuid}/deleteitem`);
};
export const getImportItemInfo = (itemuid: string): Promise<DataImportsInfoResponse> => {
    return fetchApiData<DataImportsInfoResponse>('GET', `import/${itemuid}/metadata`);
};

export const getTemplateReports = (): Promise<any> => {
    return fetchApiData<any>('GET', `reports/0/list`);
};

export const deleteReportsItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `reports/${itemuid}/deleteitem`);
};

export const setReportsItemInfo = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `reports/${itemuid}/set`);
};

export const uploadReportsFile = (file: File, itemuid?: string): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    return fetchApiData<any>('POST', `reports/${itemuid || 0}/add`, { data: formData });
};

export const getTemplatePrints = (): Promise<TemplatesPrintedData> => {
    return fetchApiData<TemplatesPrintedData>('GET', `print/list`);
};

export const deletePrintItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `print/${itemuid}/deleteitem`);
};

export const setPrintItemInfo = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `print/${itemuid}/set`);
};

export const downloadPrintItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('GET', `print/${itemuid}/get`);
};

export const uploadPrintFile = (file: File, itemuid?: string): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    return fetchApiData<any>('POST', `print/${itemuid || 0}/add`, { data: formData });
};

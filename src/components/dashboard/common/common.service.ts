import { fetchApiData } from 'common/api/fetchAPI';
import { DataImportsInfoResponse, DataImportsResponse } from 'common/interfaces/DataImports';
import {
    TemplatesPrintedData,
    TemplatesPrintedRecord,
} from 'common/interfaces/TemplatesPrintedData';
import {
    TemplatesReportsData,
    TemplatesReportsRecord,
} from 'common/interfaces/TemplatesReportsData';

export type PrintedItem = Pick<
    TemplatesPrintedRecord,
    'description' | 'name' | 'version' | 'itemuid'
>;

export type ReportsItem = Pick<
    TemplatesReportsRecord,
    'description' | 'name' | 'version' | 'itemuid'
>;

export const getImportList = (useruid?: string): Promise<DataImportsResponse> => {
    return fetchApiData<DataImportsResponse>('GET', `import/${useruid || 0}/list`);
};

export const deleteImportItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `import/${itemuid}/delete`);
};
export const getImportItemInfo = (itemuid: string): Promise<DataImportsInfoResponse> => {
    return fetchApiData<DataImportsInfoResponse>('GET', `import/${itemuid}/metadata`);
};

export const getTemplateReports = (useruid?: string): Promise<TemplatesReportsData> => {
    return fetchApiData<TemplatesReportsData>('GET', `reports/${useruid || 0}/list`);
};

export const deleteReportsItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `reports/${itemuid}/delete`);
};

export const setReportsItemInfo = (data: ReportsItem): Promise<any> => {
    const { itemuid, ...body } = data;
    return fetchApiData<any>('POST', `reports/${itemuid}/set`, { data: body });
};

export const uploadReportsFile = (file: File, itemuid?: string): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    return fetchApiData<any>('POST', `reports/${itemuid || 0}/add`, { data: formData });
};

export const downloadReportsItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('GET', `reports/${itemuid}/get`);
};

export const getTemplatePrints = (useruid?: string): Promise<TemplatesPrintedData> => {
    return fetchApiData<TemplatesPrintedData>('GET', `print/${useruid || 0}/list`);
};

export const deletePrintItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('POST', `print/${itemuid}/delete`);
};

export const setPrintItemInfo = (data: PrintedItem): Promise<any> => {
    const { itemuid, ...body } = data;
    return fetchApiData<any>('POST', `print/${itemuid}/set`, { data: body });
};

export const downloadPrintItem = (itemuid: string): Promise<any> => {
    return fetchApiData<any>('GET', `print/${itemuid}/get`);
};

export const uploadPrintFile = (file: File, itemuid?: string): Promise<any> => {
    const formData = new FormData();
    formData.append('data', file);

    return fetchApiData<any>(
        'POST',
        `print/${itemuid || 0}/add`,
        {
            data: formData,
        },
        { 'Content-Type': 'application/data' }
    );
};

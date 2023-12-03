import { Status } from './ActionStatus';

export interface TemplatesReportsRecord {
    description: string;
    index: number;
    itemuid: string;
    name: string;
    state: string;
    type: string;
    version: string;
}

export interface TemplatesPrintedData {
    documents: TemplatesReportsRecord[];
    status: Status;
}

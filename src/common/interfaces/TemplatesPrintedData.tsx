import { Status } from './ActionStatus';

export interface TemplatesPrintedRecord {
    description: string;
    index: number;
    itemuid: string;
    name: string;
    state: string;
    type: string;
    version: string;
}

export interface TemplatesPrintedData {
    documents: TemplatesPrintedRecord[];
    status: Status;
}

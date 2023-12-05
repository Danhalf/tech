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

export const initialReportsState: TemplatesReportsRecord[] = [
    {
        description: '',
        index: 0,
        itemuid: '',
        name: '',
        state: '',
        type: '',
        version: '',
    },
];

export interface TemplatesReportsData {
    documents: TemplatesReportsRecord[];
    status: Status;
}

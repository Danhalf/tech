import { Status } from './ActionStatus';

export interface DataImportsRecord {
    datapath: string;
    id: number;
    mode: string;
    size: number;
    timestamp: string;
    username: string;
    useruid: string;
}

export interface DataImportsResponse {
    records: DataImportsRecord[];
    status: Status;
}

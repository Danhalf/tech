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

export interface DataImportsInfoDatabase {
    itemuid: string;
    name: string;
    size: number;
}

export interface DataImportsInfoImage {
    itemuid: string;
    name: string;
    size: number;
}

export interface DataImportsInfoMetadata {
    databases: DataImportsInfoDatabase[];
    images: DataImportsInfoImage[];
    type: string;
}

export interface DataImportsInfoResponse {
    metadata: DataImportsInfoMetadata;
    status: Status;
    error?: string;
}

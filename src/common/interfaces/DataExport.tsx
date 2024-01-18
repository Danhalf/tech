import { Status } from './ActionStatus';

export interface DataExportRecord {
    datapath: string;
    id: number;
    mode: string;
    size: number;
    timestamp: string;
    username: string;
    useruid: string;
}

export interface DataExportsResponse {
    records: DataExportRecord[];
    status: Status;
}

export interface DataExportsInfoDatabase {
    itemuid: string;
    name: string;
    size: number;
}

export interface DataExportsInfoImage {
    itemuid: string;
    name: string;
    size: number;
}

export interface DataExportsInfoMetadata {
    databases: DataExportsInfoDatabase[];
    images: DataExportsInfoImage[];
    type: string;
}

export interface DataExportsInfoResponse {
    metadata: DataExportsInfoMetadata;
    status: Status;
    error?: string;
}

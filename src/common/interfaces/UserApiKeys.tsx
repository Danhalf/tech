import { Status } from './ActionStatus';

export interface ApiKeyRecord {
    created: string;
    deleted: string;
    updated: string;
    issuedate: string;
    expirationdate: string;
    lastused: string;
    flags: string;
    enabled: string;
    apitype: string;
    useruid: string;
    itemuid: string;
    apikey: string;
    notes: string;
}

export interface ApiKeysResponse {
    documents: ApiKeyRecord[];
    status: Status;
}

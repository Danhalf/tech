/* eslint-disable no-unused-vars */
import { Status } from './ActionStatus';

export type ApiKeyEnabled = 0 | 1;

export interface ApiKeyRecord {
    apikey: string;
    apitype: string;
    clientuid: string;
    created: string;
    deleted: string;
    enabled: ApiKeyEnabled;
    expirationdate: string;
    flags: number;
    host: string;
    id: number;
    issuedate: string;
    itemuid: string;
    lastused: string;
    notes: string;
    port: number;
    updated: string;
    userlogin: string;
    userpassword: string;
    useruid: string;
}

export interface ApiTypes {
    id: number;
    name: string;
}

export interface ApiTypesResponse {
    api_types: ApiTypes[];
    status: Status;
}

export interface ApiItemUid {
    itemuid: string;
    status: Status;
}

/* eslint-disable no-unused-vars */
import { Status } from './ActionStatus';

export type ApiKeyEnabled = 0 | 1;

export interface ApiKeyRecord {
    apikey: string;
    apitype: ApiTypeName;
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

export enum ApiTypeName {
    DEFAULT = 'Default',
    KBB = 'KBB',
    EDMUNDS = 'Edmunds',
    CARS = 'Cars',
    AUTOTRADER = 'Autotrader',
}

export interface ApiTypes {
    id: number;
    name: ApiTypeName;
}

export interface ApiTypesResponse {
    api_types: ApiTypes[];
    status: Status;
}

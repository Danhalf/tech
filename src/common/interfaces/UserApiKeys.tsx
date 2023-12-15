/* eslint-disable no-unused-vars */
import { Status } from './ActionStatus';

export type ApiKeyEnabled = 0 | 1;

export interface ApiKeyRecord {
    created: string;
    deleted: string;
    updated: string;
    issuedate: number;
    expirationdate: number;
    lastused: string;
    flags: number;
    enabled: ApiKeyEnabled;
    apitype: ApiTypeName;
    useruid: string;
    itemuid: string;
    apikey: string;
    notes: string;
    id: number;
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

/* eslint-disable no-unused-vars */
import { Status } from './ActionStatus';

export interface ApiKeyRecord {
    created: string;
    deleted: string;
    updated: string;
    issuedate: string;
    expirationdate: string;
    lastused: string;
    flags: number;
    enabled: number;
    apitype: string;
    useruid: string;
    itemuid: string;
    apikey: string;
    notes: string;
    id: number;
}

enum ApiTypeName {
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

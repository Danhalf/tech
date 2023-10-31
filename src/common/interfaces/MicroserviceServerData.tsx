export interface MicroserviceServerData {
    info: string;
    status?: string;
    timestamp: string;
}

export interface MicroserviceCounters extends MicroserviceServerData {
    type: string;
    value: string;
}

export interface Microservice {
    heartbit: string;
    index: number;
    ipv4: string;
    name: string;
    port: number;
    started: string;
    status: string;
    type: string;
    type_i: number;
    uid: string;
    version: string;
}

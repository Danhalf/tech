export enum Status {
    // eslint-disable-next-line no-unused-vars
    OK = 'OK',
    // eslint-disable-next-line no-unused-vars
    ERROR = 'Error',
}

export interface ServiceResponse {
    error: string;
    info: string;
    status: string;
}

export interface ServiceStopResponse extends ServiceResponse {}
export interface ServiceCheckDBResponse extends ServiceResponse {}

export interface ActionStatus {
    status: Status;
    warning?: string;
}

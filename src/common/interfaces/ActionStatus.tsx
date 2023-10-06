export enum Status {
    // eslint-disable-next-line no-unused-vars
    OK = 'OK',
    // eslint-disable-next-line no-unused-vars
    ERROR = 'Error',
}

export interface ActionStatus {
    status: Status;
}

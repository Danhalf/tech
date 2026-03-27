export interface IUserData {
    username: string;
    password: string;
}

export interface IUser {
    created: string;
    createdbyuid: string;
    index: number;
    parentuid: string;
    updated: string;
    username: string;
    useruid: string;
}

export interface ShortUserInfo {
    firstName: string;
    lastName: string;
    loginname: string;
    middleName: string;
    status: 'OK' | 'Error';
    userName: string;
    useruid: string;
    warning: string;
}

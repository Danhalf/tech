/* eslint-disable no-unused-vars */

export interface UserInputData {
    username: string;
    password: string;
}

export interface User {
    created?: string;
    createdbyuid?: string;
    index?: number;
    parentuid?: string;
    parentusername?: string;
    updated?: string;
    username: string;
    useruid: string;
    isadmin?: number;
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

export enum UsersType {
    ACTIVE = 'Users',
    DELETED = 'Deleted users',
}

export type UsersListType = UsersType;

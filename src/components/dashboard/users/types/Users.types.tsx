export interface UserInputData {
    username: string;
    password: string;
}

export interface UserQuery {
    skip?: number;
    top?: number;
}

export enum UsersType {
    Users = 'Users',
    DeletedUsers = 'Deleted users',
}

export type UsersListType = UsersType;

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

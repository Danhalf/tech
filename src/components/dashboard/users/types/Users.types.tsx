export interface UserInputData {
    username: string;
    password: string;
}

export type UsersListType = 'Users' | 'Deleted users';

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

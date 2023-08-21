interface IUserData {
    username: string
    password: string
}

export interface IUserAdd extends IUserData {}
export interface IUserEdit extends IUserData {}

export interface IUser {
    created: string
    createdbyuid: string
    index: number
    parentuid: string
    updated: string
    username: string
    useruid: string
}

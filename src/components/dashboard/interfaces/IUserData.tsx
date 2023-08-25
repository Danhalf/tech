interface IUserData {
    username: string
    password: string
}

interface IUser {
    created: string
    createdbyuid: string
    index: number
    parentuid: string
    updated: string
    username: string
    useruid: string
}

export type { IUserData, IUser }

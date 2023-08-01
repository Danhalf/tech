import axios from 'axios'
import { getToken } from '../../../common/utils'
import { API_URL } from '../../../common/app-consts'
import { ActionStatus } from '../../../common/models'

export interface User {
    created: string
    createdbyuid: string
    index: number
    parentuid: string
    updated: string
    username: string
    useruid: string
}

export const createUser = (loginname: string, loginpassword: string) => {
    return axios.post(
        API_URL + 'user/' + 0 + '/user',
        { loginname: loginname, loginpassword: loginpassword },
        {
            headers: { Authorization: `Bearer ${getToken()}` },
        }
    )
}

export const updateUser = (uid: string, loginname: string, loginpassword: string) => {
    return axios.post(
        API_URL + 'user/' + uid + '/user',
        { loginname: loginname, loginpassword: loginpassword },
        {
            headers: { Authorization: `Bearer ${getToken()}` },
        }
    )
}

export const setUserOptionalData = (uid: string, data: any) => {
    return axios.post(
        API_URL + 'user/' + uid + '/set',
        { ...data },
        {
            headers: { Authorization: `Bearer ${getToken()}` },
        }
    )
}

export const getUsers = () => {
    return axios
        .get<User[]>(`${API_URL}user/0/list`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getDeletedUsers = () => {
    return axios
        .get<User[]>(`${API_URL}user/0/listdeleted`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const deleteUser = (uid: string) => {
    return axios
        .post<ActionStatus>(
            `${API_URL}user/${uid}/delete`,
            {},
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        )
        .then((response) => response.data)
}

export const undeleteUser = (uid: string) => {
    return axios
        .post<ActionStatus>(
            `${API_URL}user/${uid}/undelete`,
            {},
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            }
        )
        .then((response) => response.data)
}

export const setUserPermissions = (uid: string, data: any) => {
    return axios.post(
        API_URL + 'user/' + uid + '/permissions',
        { ...data },
        {
            headers: { Authorization: `Bearer ${getToken()}` },
        }
    )
}

export const getUserPermissions = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/permissions`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getUserExtendedInfo = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/info`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getUserLocations = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/locations`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const setUserProfile = (uid: string, profile: any) => {
    return axios.post(
        API_URL + 'user/' + uid + '/profile',
        { ...profile },
        {
            headers: { Authorization: `Bearer ${getToken()}` },
        }
    )
}

export const getUserProfile = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/profile`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const setUserSettings = (uid: string, data: any) => {
    return axios.post(API_URL + 'user/' + uid + '/settings', data, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const getUserSettings = (uid: string) => {
    return axios
        .get(`${API_URL}user/${uid}/settings`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const checkToken = (token: string) => {
    return axios.get(API_URL + 'user/' + token + '/token', {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const listUserSessions = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/sessions`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const killSession = (id: number) => {
    return axios.post(API_URL + 'user/' + id.toString() + '/session', {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const checkSession = (uid: string) => {
    return axios.get(API_URL + 'user/' + uid + '/session', {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const listUserLogins = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/logins`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const listSubusers = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/subusers`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const listSalesPersons = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/salespersons`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getUserShortInfo = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/username`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getAllUIPermissions = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/listpermissions`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

export const getAllUITypes = (uid: string) => {
    return axios
        .get<string>(`${API_URL}user/${uid}/listusertypes`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data)
}

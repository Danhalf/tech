import axios from 'axios';
import { getToken } from './utils';
import { API_URL, APPLICATION } from './app-consts';

export interface LoginResponse {
    companyname: string;
    firstname: string;
    isadmin: number;
    islocaladmin: number;
    ismanager: number;
    issalesperson: number;
    lastname: string;
    loginname: string;
    sessionuid: string;
    status: 'OK';
    token: string;
    username: string;
    useruid: string;
}

interface LogoutResponse {
    status: 'OK';
}

export const login = (username: string, password: string) => {
    return axios
        .post<LoginResponse>(`${API_URL}user`, {
            user: username,
            secret: password,
            application: APPLICATION,
        })
        .then((response) => response.data);
};

export const logout = (userId: string) => {
    return axios
        .post<LogoutResponse>(`${API_URL}user/${userId}/logout`, null, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then((response) => response.data);
};

export const checkToken = (token: string) => {
    return axios.get(API_URL + 'user/' + token + '/token', {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

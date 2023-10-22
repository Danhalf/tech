import { LOC_STORAGE_USER } from './app-consts';

export function getToken(): string {
    const userJson = localStorage.getItem(LOC_STORAGE_USER);
    let token = '';

    if (userJson) {
        token = JSON.parse(userJson).token;
    }
    return token;
}

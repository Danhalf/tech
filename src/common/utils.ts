import { LOC_STORAGE_USER } from './app-consts';

export function getToken(): string | null {
    const userLocalStorage = localStorage.getItem(LOC_STORAGE_USER);

    return !!userLocalStorage ? JSON.parse(userLocalStorage)?.token : null;
}

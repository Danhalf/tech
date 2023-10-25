import axios from 'axios';
import { LOC_STORAGE_USER } from './app-consts';

export const useAuthInterceptor = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem(LOC_STORAGE_USER);
                return error.response.data.error;
            }
        }
    );
};

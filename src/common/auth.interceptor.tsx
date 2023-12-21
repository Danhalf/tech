import axios, { AxiosError } from 'axios';
import { LOC_STORAGE_USER } from './app-consts';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';

export const useAuthInterceptor = () => {
    const { handleShowToast } = useToast();

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError | any) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem(LOC_STORAGE_USER);
                handleShowToast({
                    message: error.response.data.error,
                    type: 'danger',
                });
                return error.response.data.error;
            }
            if (error.response) {
                const { status, data } = error.response;
                return Promise.reject({ status, data });
            } else {
                return Promise.reject(error);
            }
        }
    );
};

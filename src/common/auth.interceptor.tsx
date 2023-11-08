import axios from 'axios';
import { APPLICATION, LOC_STORAGE_USER } from './app-consts';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';

export const useAuthInterceptor = () => {
    const { handleShowToast } = useToast();

    axios.interceptors.request.use(
        (config) => {
            config.params = { ...config.params, application: APPLICATION };
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem(LOC_STORAGE_USER);
                handleShowToast({
                    message: error.response.data.error,
                    type: 'danger',
                });
                return error.response.data.error;
            }
        }
    );
};

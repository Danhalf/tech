import { useTokenValidation } from 'common/hooks/useTokenValidation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Dashboard } from 'components/dashboard/Dashboard';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { getToken } from 'common/utils';

export const PrivateRouter = () => {
    const token = getToken();
    const navigate = useNavigate();
    const location = useLocation();
    const { handleShowToast } = useToast();

    const isTokenValid = useTokenValidation(token as string);

    useEffect(() => {
        if (!isTokenValid) {
            if (location.pathname !== '/') {
                handleShowToast({
                    message: 'Your session has expired. Please login again.',
                    type: 'danger',
                });
            }
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTokenValid, navigate]);

    return isTokenValid && <Dashboard />;
};

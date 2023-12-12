import { AxiosError } from 'axios';
import clsx from 'clsx';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { clearCache } from 'components/dashboard/users/user.service';
import { useEffect, useState } from 'react';

export const ClearCache = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
    const handleClearCache = async () => {
        try {
            const response = await clearCache();
            if (response) {
                handleShowToast({
                    message: 'Server cache successfully cleared',
                    type: 'success',
                });
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    const { handleShowToast } = useToast();
    return (
        <button
            className={clsx(
                'fixed-bottom mw-50 col-sm-2 px-2 text-nowrap ms-auto me-sm-4 mb-sm-4 btn btn-warning font-weight-bold',
                {
                    'transform-90': windowWidth < 576,
                }
            )}
            onClick={handleClearCache}
        >
            Clear server cache
        </button>
    );
};

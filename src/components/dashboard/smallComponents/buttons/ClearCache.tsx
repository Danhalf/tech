import { AxiosError } from 'axios';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { clearCache } from 'components/dashboard/users/user.service';

export const ClearCache = () => {
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
            className='fixed-bottom col-sm-2 text-nowrap ms-auto me-sm-4 mb-sm-4 btn btn-warning font-weight-bold'
            onClick={handleClearCache}
        >
            Clear server cache
        </button>
    );
};

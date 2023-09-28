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
        <div className='fixed-bottom d-flex justify-content-end m-3'>
            <button className='btn btn-warning font-weight-bold mr-2' onClick={handleClearCache}>
                Clear server cache
            </button>
        </div>
    );
};

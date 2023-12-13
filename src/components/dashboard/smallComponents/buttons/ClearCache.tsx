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
        <>
            <button
                className='d-none d-sm-inline fixed-bottom text-nowrap ms-auto me-4 mb-4 btn btn-warning font-weight-bold'
                onClick={handleClearCache}
            >
                <span className='d-none d-sm-inline'>Clear server cache</span>
            </button>
            <button
                className='d-sm-none fixed-bottom text-nowrap btn-icon ms-auto me-8 mb-8 btn btn-warning font-weight-bold rounded-circle'
                onClick={handleClearCache}
            >
                <div title='Clear server cache'>
                    <i className='ki-solid ki-trash fs-1' />
                </div>
            </button>
        </>
    );
};

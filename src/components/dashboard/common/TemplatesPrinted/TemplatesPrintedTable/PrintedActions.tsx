import { Status } from 'common/interfaces/ActionStatus';
import { deletePrintItem, downloadPrintItem, setPrintItemInfo } from '../../common.service';
import { AxiosError } from 'axios';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';

/* eslint-disable no-console */
export const PrintedActions = ({ itemuid }: { itemuid: string }) => {
    const { handleShowToast } = useToast();
    const handleInformationClick = () => {
        setPrintItemInfo(itemuid)
            .then((response) => {
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${itemuid}</strong> information successfully updated`,
                        type: 'success',
                    });
                } else {
                    throw new Error(response.error);
                }
            })
            .catch((err) => {
                handleShowToast({ message: err, type: 'danger' });
            });
    };

    const handleDeleteClick = () => {
        deletePrintItem(itemuid)
            .then((response) => {
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${itemuid}</strong> successfully deleted`,
                        type: 'success',
                    });
                } else {
                    throw new Error(response.error);
                }
            })
            .catch((err) => {
                handleShowToast({ message: err, type: 'danger' });
            });
    };

    const handleDownloadClick = () => {
        downloadPrintItem(itemuid)
            .then((response) => {
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${itemuid}</strong> successfully downloaded`,
                        type: 'success',
                    });
                } else {
                    throw new Error(response.error);
                }
            })
            .catch((err) => {
                handleShowToast({ message: err, type: 'danger' });
            });
    };

    return (
        <>
            <div className='d-flex column-gap-1'>
                <button
                    className='btn btn-outline-secondary '
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title='Information'
                    onClick={handleInformationClick}
                >
                    <i className='ki-outline ki-information-2 fs-4 p-1' />
                </button>
                <button
                    className='btn btn-outline-secondary'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title='Delete'
                    onClick={handleDeleteClick}
                >
                    <i className='ki-outline ki-file-deleted fs-4 p-1' />
                </button>
                <button
                    className='btn btn-outline-secondary'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    title='Download'
                    onClick={handleDownloadClick}
                >
                    <i className='ki-outline ki-file-down fs-4 p-1' />
                </button>
            </div>
        </>
    );
};

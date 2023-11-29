import { Status } from 'common/interfaces/ActionStatus';
import { deletePrintItem, downloadPrintItem, setPrintItemInfo } from '../../common.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';

export const PrintedActions = ({ itemuid }: { itemuid: string }) => {
    const { handleShowToast } = useToast();
    const handleInformationClick = () => {
        setPrintItemInfo(itemuid)
            .then((response) => {
                if (response.status === Status.OK) {
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
        <CustomDropdown
            title='Actions'
            items={[
                {
                    menuItemName: 'Data info',
                    icon: 'information-2',
                    menuItemAction: () => handleInformationClick(),
                },
                {
                    menuItemName: 'Delete',
                    icon: 'file-deleted',
                    menuItemAction: () => handleDeleteClick(),
                },
                {
                    menuItemName: 'Download',
                    icon: 'file-down',
                    menuItemAction: () => handleDownloadClick(),
                },
            ]}
        />
    );
};

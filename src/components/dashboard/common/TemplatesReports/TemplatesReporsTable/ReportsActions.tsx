import { Status } from 'common/interfaces/ActionStatus';
import {
    ReportsItem,
    deleteReportsItem,
    downloadReportsItem,
    setReportsItemInfo,
} from '../../common.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';

interface ReportsActionsProps {
    item: ReportsItem;
    updateAction?: () => void;
}

export const ReportsActions = ({
    item: { itemuid, name, description, version },
    updateAction,
}: ReportsActionsProps) => {
    const { handleShowToast } = useToast();
    const handleInformationClick = () => {
        setReportsItemInfo({ itemuid, description, version, name })
            .then((response) => {
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${itemuid}</strong> successfully updated`,
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
        deleteReportsItem(itemuid)
            .then((response) => {
                if (response.status === Status.OK) {
                    updateAction && updateAction();
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
        downloadReportsItem(itemuid)
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

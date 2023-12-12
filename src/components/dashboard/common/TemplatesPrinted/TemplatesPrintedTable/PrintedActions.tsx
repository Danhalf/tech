import { useState } from 'react';
import { Status } from 'common/interfaces/ActionStatus';
import {
    PrintedItem,
    deletePrintItem,
    downloadPrintItem,
    setPrintItemInfo,
} from 'components/dashboard/common/common.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { ConfirmModal } from 'components/dashboard/helpers/modal/confirmModal';

interface PrintedActionsProps {
    item: PrintedItem;
    updateAction?: () => void;
}

export const PrintedActions = ({
    item: { itemuid, name, description, version },
    updateAction,
}: PrintedActionsProps) => {
    const { handleShowToast } = useToast();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

    const handleInformationClick = () => {
        setPrintItemInfo({ itemuid, description, version, name })
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

    const handleDeleteConfirm = () => {
        setShowDeleteConfirm(false);
        deletePrintItem(itemuid)
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
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Set data',
                        icon: 'information-2',
                        menuItemAction: () => handleInformationClick(),
                    },
                    {
                        menuItemName: 'Delete',
                        icon: 'file-deleted',
                        menuItemAction: () => setShowDeleteConfirm(true),
                    },
                    {
                        menuItemName: 'Download',
                        icon: 'file-down',
                        menuItemAction: () => handleDownloadClick(),
                    },
                ]}
            />

            <ConfirmModal
                show={showDeleteConfirm}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setShowDeleteConfirm(false)}
                itemName={itemuid}
            />
        </>
    );
};

import { Status } from 'common/interfaces/ActionStatus';
import { deleteImportItem, getImportItemInfo } from '../../common.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { useState } from 'react';
import { TabDataWrapper } from 'components/dashboard/helpers/helpers';
import { DataImportsInfoMetadata } from 'common/interfaces/DataImports';
import { ConfirmModal } from 'components/dashboard/helpers/modal/confirmModal';

interface DataImportActionsProps {
    id: number | string;
    updateAction?: () => void;
}

export const DataImportActions = ({ id, updateAction }: DataImportActionsProps) => {
    const [modalEnabled, setModalEnabled] = useState<boolean>(false);
    const [dataItemInfo, setDataItemInfo] = useState<DataImportsInfoMetadata | null>(null);
    const { handleShowToast } = useToast();

    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

    const handleInformationClick = () => {
        getImportItemInfo(String(id))
            .then((response) => {
                if (response.status === Status.OK) {
                    setDataItemInfo(response.metadata);
                    setModalEnabled(true);
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
        deleteImportItem(String(id))
            .then((response) => {
                if (response.status === Status.OK) {
                    updateAction && updateAction();
                    handleShowToast({
                        message: `<strong>${id}</strong> successfully deleted`,
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
            {modalEnabled && (
                <CustomModal
                    onClose={() => setModalEnabled(false)}
                    width={1000}
                    title={'Data Information'}
                >
                    <TabDataWrapper isCard={false} data={JSON.stringify(dataItemInfo, null, 2)} />
                </CustomModal>
            )}
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
                        menuItemAction: () => setShowDeleteConfirm(true),
                    },
                ]}
            />
            <ConfirmModal
                show={showDeleteConfirm}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setShowDeleteConfirm(false)}
                itemName={id}
            />
        </>
    );
};

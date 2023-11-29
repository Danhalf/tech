import { Status } from 'common/interfaces/ActionStatus';
import { deleteImportItem, getImportItemInfo } from '../../common.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { useState } from 'react';
import { TabDataWrapper } from 'components/dashboard/helpers/helpers';
import { DataImportsInfoMetadata } from 'common/interfaces/DataImports';

export const DataImportActions = ({ id }: { id: number | string }) => {
    const [modalEnabled, setModalEnabled] = useState<boolean>(false);
    const [dataItemInfo, setDataItemInfo] = useState<DataImportsInfoMetadata | null>(null);
    const { handleShowToast } = useToast();

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

    const handleDeleteClick = () => {
        deleteImportItem(String(id))
            .then((response) => {
                if (response.status === Status.OK) {
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
                <CustomModal onClose={() => setModalEnabled(false)} title={'Data Information'}>
                    <TabDataWrapper data={JSON.stringify(dataItemInfo, null, 2)} />;
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
                        menuItemAction: () => handleDeleteClick(),
                    },
                ]}
            />
        </>
    );
};

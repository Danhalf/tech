import { useState } from 'react';
import { Status } from 'common/interfaces/ActionStatus';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { ConfirmModal } from 'components/dashboard/helpers/modal/confirmModal';
import { ApiKeyRecord } from 'common/interfaces/UserApiKeys';

interface ApiKeysActionsProps {
    item: Partial<ApiKeyRecord>;
    updateAction?: () => void;
}

export const ApiKeysActions = ({
    item: { itemuid, enabled, apitype, apikey },
    updateAction,
}: ApiKeysActionsProps) => {
    const { handleShowToast } = useToast();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

    return (
        <>
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Add key',
                        icon: 'information-2',
                        // menuItemAction: () => handleInformationClick(),
                    },
                    {
                        menuItemName: 'Edit key',
                        icon: 'file-deleted',
                        menuItemAction: () => setShowDeleteConfirm(true),
                    },
                    {
                        menuItemName: 'Delete key',
                        icon: 'file-down',
                        // menuItemAction: () => handleDownloadClick(),
                    },
                ]}
            />

            {/* <ConfirmModal
                show={showDeleteConfirm}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setShowDeleteConfirm(false)}
                itemName={itemuid}
            /> */}
        </>
    );
};

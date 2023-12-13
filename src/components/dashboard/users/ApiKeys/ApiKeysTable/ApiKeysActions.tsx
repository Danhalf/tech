import { useState } from 'react';
import { Status } from 'common/interfaces/ActionStatus';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { ConfirmModal } from 'components/dashboard/helpers/modal/confirmModal';
import { ApiKeyRecord } from 'common/interfaces/UserApiKeys';
import { getApiKey, getApiKeysTypes } from '../apiKeys.service';

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
    const [apiKey, setApiKey] = useState<boolean | null>(null);

    const handleEditApiKey = () => {
        getApiKeysTypes().then((res: any) => {
            // eslint-disable-next-line no-console
            console.log(res);
        });
    };

    return (
        <>
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Add key',
                        icon: 'plus-square',
                        // menuItemAction: () => handleInformationClick(),
                    },
                    {
                        menuItemName: 'Edit key',
                        icon: 'key',
                        menuItemAction: () => handleEditApiKey(),
                        // menuItemAction: () => setShowDeleteConfirm(true),
                    },
                    {
                        menuItemName: 'Delete key',
                        icon: 'minus-circle',
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

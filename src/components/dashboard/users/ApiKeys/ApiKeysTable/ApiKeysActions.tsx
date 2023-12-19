import { useState } from 'react';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { ApiKeyRecord } from 'common/interfaces/UserApiKeys';
import { ApiKeyModal } from '../ApiKeysModal/ApiKeyModal';
import { deleteUserApiKey } from '../apiKeys.service';
import { Status } from 'common/interfaces/ActionStatus';

interface ApiKeysActionsProps {
    apiKey: Partial<ApiKeyRecord>;
    updateAction?: () => void;
}

export const ApiKeysActions = ({ apiKey, updateAction }: ApiKeysActionsProps) => {
    const [editKeyModalEnabled, setEditKeyModalEnabled] = useState<boolean>(false);

    const handleDeleteClick = () => {
        deleteUserApiKey(apiKey.itemuid as string).then((res) => {
            if (res.status === Status.OK) updateAction && updateAction();
        });
    };

    return (
        <>
            {editKeyModalEnabled && (
                <ApiKeyModal
                    onClose={() => setEditKeyModalEnabled(false)}
                    updateAction={updateAction}
                    apiKey={apiKey}
                />
            )}
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Edit key',
                        icon: 'key',
                        menuItemAction: () => setEditKeyModalEnabled(true),
                    },
                    {
                        menuItemName: 'Delete key',
                        icon: 'minus-circle',
                        menuItemAction: () => handleDeleteClick(),
                    },
                ]}
            />
        </>
    );
};

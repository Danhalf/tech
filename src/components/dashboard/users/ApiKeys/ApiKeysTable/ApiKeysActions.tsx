import { useState } from 'react';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { ApiKeyRecord } from 'common/interfaces/UserApiKeys';
import { ApiKeyModal } from '../ApiKeysModal/ApiKeyModal';
import { deleteUserApiKey } from '../apiKeys.service';

interface ApiKeysActionsProps {
    item: Partial<ApiKeyRecord>;
    updateAction?: () => void;
}

export const ApiKeysActions = ({ item, updateAction }: ApiKeysActionsProps) => {
    const [addKeyModalEnabled, setAddKeyModalEnabled] = useState<boolean>(false);
    const [editKeyModalEnabled, setEditKeyModalEnabled] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<boolean | null>(null);

    const handleDeleteClick = () => {
        deleteUserApiKey(item.itemuid as string)
        updateAction && updateAction()
    };

    return (
        <>
            {addKeyModalEnabled && <ApiKeyModal onClose={() => setAddKeyModalEnabled(false)} />}
            {editKeyModalEnabled && (
                <ApiKeyModal onClose={() => setEditKeyModalEnabled(false)} updateAction={updateAction} apiKey={item} />
            )}
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Add key',
                        icon: 'plus-square',
                        menuItemAction: () => setAddKeyModalEnabled(true),
                    },
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

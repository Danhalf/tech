import { useState } from 'react';
import { Status } from 'common/interfaces/ActionStatus';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { ConfirmModal } from 'components/dashboard/helpers/modal/confirmModal';
import { ApiKeyRecord, ApiTypes } from 'common/interfaces/UserApiKeys';
import { getApiKey, getApiKeysTypes } from '../apiKeys.service';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { Form, InputGroup } from 'react-bootstrap';
import { CustomCheckbox, CustomTextInput } from 'components/dashboard/helpers/renderInputsHelper';
import { ApiKeyModal } from '../ApiKeysModal/ApiKeyModal';

interface ApiKeysActionsProps {
    item: Partial<ApiKeyRecord>;
    updateAction?: () => void;
}

export const ApiKeysActions = ({ item, updateAction }: ApiKeysActionsProps) => {
    const { handleShowToast } = useToast();
    const [addKeyModalEnabled, setAddKeyModalEnabled] = useState<boolean>(false);
    const [editKeyModalEnabled, setEditKeyModalEnabled] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<boolean | null>(null);

    const handleDeleteClick = () => {};

    return (
        <>
            {addKeyModalEnabled && <ApiKeyModal onClose={() => setAddKeyModalEnabled(false)} />}
            {editKeyModalEnabled && (
                <ApiKeyModal onClose={() => setEditKeyModalEnabled(false)} apiKey={item} />
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

            {/* <ConfirmModal
                show={showDeleteConfirm}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setShowDeleteConfirm(false)}
                itemName={itemuid}
            /> */}
        </>
    );
};

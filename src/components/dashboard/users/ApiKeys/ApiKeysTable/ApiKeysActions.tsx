import { useState } from 'react';
import { Status } from 'common/interfaces/ActionStatus';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { ConfirmModal } from 'components/dashboard/helpers/modal/confirmModal';
import { ApiKeyRecord, ApiTypes } from 'common/interfaces/UserApiKeys';
import { getApiKey, getApiKeysTypes } from '../apiKeys.service';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { Form } from 'react-bootstrap';
import { CustomCheckbox, CustomTextInput } from 'components/dashboard/helpers/renderInputsHelper';

interface ApiKeysActionsProps {
    item: Partial<ApiKeyRecord>;
    updateAction?: () => void;
}

export const ApiKeysActions = ({
    item: { itemuid, enabled, apitype, apikey, notes },
    updateAction,
}: ApiKeysActionsProps) => {
    const { handleShowToast } = useToast();
    const [modalEnabled, setModalEnabled] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [apiKey, setApiKey] = useState<boolean | null>(null);
    const [apiKeyTypes, setApiKeyTypes] = useState<ApiTypes[] | null>(null);

    const getApiTypes = () => {
        getApiKeysTypes().then((res) => {
            setApiKeyTypes(res.api_types);
        });
    };

    const handleCreateOrUpdateApiKey = (item?: Partial<ApiKeyRecord>) => {
        getApiTypes();
        setModalEnabled(true);
    };

    return (
        <>
            {modalEnabled && (
                <CustomModal
                    onClose={() => setModalEnabled(false)}
                    width={400}
                    title={'Add API Key'}
                >
                    <CustomTextInput
                        currentValue={apikey as string}
                        disabled
                        id={itemuid as string}
                        name='Current API key'
                    />
                    <CustomCheckbox
                        currentValue={enabled as number}
                        id={apikey || 'apikey'}
                        name={apikey || 'api_key'}
                        title='API key active'
                    />
                    <Form.Select>
                        {apiKeyTypes?.map(({ id, name }) => (
                            <option id={String(id)}>{name}</option>
                        ))}
                    </Form.Select>
                    <Form.Control
                        as='textarea'
                        value={notes || ''}
                        placeholder='Leave a notes here'
                    />
                </CustomModal>
            )}
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Add key',
                        icon: 'plus-square',
                        menuItemAction: handleCreateOrUpdateApiKey,
                    },
                    {
                        menuItemName: 'Edit key',
                        icon: 'key',
                        menuItemAction: () => handleCreateOrUpdateApiKey(),
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

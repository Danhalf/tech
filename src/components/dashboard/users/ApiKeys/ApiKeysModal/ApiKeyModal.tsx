import { ApiKeyEnabled, ApiKeyRecord, ApiTypeName, ApiTypes } from 'common/interfaces/UserApiKeys';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { CustomCheckbox } from 'components/dashboard/helpers/renderInputsHelper';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getApiKeysTypes } from '../apiKeys.service';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';

interface ApiKeyModalProps {
    onClose: () => void;
    apiKey?: Partial<ApiKeyRecord>;
}

export const ApiKeyModal = ({ apiKey, onClose }: ApiKeyModalProps): JSX.Element => {
    const [apiKeyTypes, setApiKeyTypes] = useState<ApiTypes[] | null>(null);
    const [apiKeyValue, setApiKeyValue] = useState<string | undefined>(apiKey?.apikey);
    const [apiKeyType, setApiKeyType] = useState<ApiTypeName | undefined>(apiKey?.apitype);
    const [apiKeyNotes, setApiKeyNotes] = useState<string | undefined>(apiKey?.notes);
    const [apiKeyEnabled, setApiKeyEnabled] = useState<ApiKeyEnabled | 0>(apiKey?.enabled || 0);

    const getApiTypes = () => {
        getApiKeysTypes().then((res) => {
            setApiKeyTypes(res.api_types);
        });
    };

    useEffect(() => {
        getApiTypes();
    }, []);

    const handleApiKeyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setApiKeyType(e.target.value as ApiTypeName);
    };

    const handleApiKeyNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setApiKeyNotes(e.target.value);
    };

    const handleApiKeyEnabledChange = () => {
        setApiKeyEnabled((prevEnabled) => (prevEnabled ? 0 : 1));
    };

    const handleSave = () => {
        onClose();
    };

    return (
        <CustomModal onClose={onClose} width={800} title={`${apiKey ? 'Edit' : 'Add'} API key`}>
            <Form.Group className='d-flex flex-column row-gap-4'>
                {apiKey && (
                    <>
                        <Form.Control
                            value={apiKeyValue as string}
                            disabled
                            id={apiKey?.itemuid as string}
                            name='Current API key'
                        />
                        <CustomCheckbox
                            currentValue={apiKeyEnabled}
                            id={apiKeyValue || 'apikey'}
                            name={apiKeyValue || 'api_key'}
                            title='API key enabled'
                            action={handleApiKeyEnabledChange}
                        />
                    </>
                )}
                <Form.Select value={apiKeyType} onChange={handleApiKeyTypeChange}>
                    {apiKeyTypes?.map(({ id, name }) => (
                        <option key={String(id)} value={name}>
                            {name}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control
                    as='textarea'
                    value={apiKeyNotes}
                    onChange={handleApiKeyNotesChange}
                    placeholder='Leave notes here'
                />
                <div className='mt-12 d-flex justify-content-center align-content-center'>
                    <PrimaryButton type='button' onClick={handleSave}>
                        {apiKey ? 'Save changes' : 'Create'}
                    </PrimaryButton>
                </div>
            </Form.Group>
        </CustomModal>
    );
};

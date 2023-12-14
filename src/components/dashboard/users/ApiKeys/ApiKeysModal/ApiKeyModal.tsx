import { ApiKeyEnabled, ApiKeyRecord, ApiTypeName, ApiTypes } from 'common/interfaces/UserApiKeys';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { CustomCheckbox } from 'components/dashboard/helpers/renderInputsHelper';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getApiKeysTypes, setUserApiKey } from '../apiKeys.service';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { useParams } from 'react-router-dom';

interface ApiKeyModalProps {
    onClose: () => void;
    apiKey?: Partial<ApiKeyRecord>;
    updateAction?: () => void
}

export const ApiKeyModal = ({ apiKey, onClose, updateAction }: ApiKeyModalProps): JSX.Element => {
    const { id: useruid } = useParams()
    const [apiKeyTypes, setApiKeyTypes] = useState<ApiTypes[] | null>(null);
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

    const handleCreate = () => {
        setUserApiKey(useruid as string, { apitype: apiKeyType, notes: apiKeyNotes }).then((res: any) => {

        })
        updateAction && updateAction()
        onClose();
    }

    return (
        <CustomModal onClose={onClose} width={800} title={`${apiKey ? 'Edit' : 'Add'} API key`}>
            <Form.Group className='d-flex flex-column row-gap-4'>
                {apiKey && (
                    <>
                        <CustomCheckbox
                            currentValue={apiKeyEnabled}
                            id={apiKey.apikey || 'apikey'}
                            name={apiKey.apikey || 'api_key'}
                            title='API key enabled'
                            action={handleApiKeyEnabledChange}
                        /><Form.Control
                            value={apiKey.apikey as string}
                            disabled
                            id={apiKey?.itemuid as string}
                            name='Current API key'
                        />
                    </>
                )}
                <Form.Select value={apiKeyType} onChange={handleApiKeyTypeChange}>
                    {apiKeyTypes?.map(({ id, name }) => (
                        <option key={String(id)} value={id}>
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
                    {apiKey
                        ? <PrimaryButton type='button' buttonClickAction={handleSave}>
                            Save changes
                        </PrimaryButton>
                        : <PrimaryButton type='button' buttonClickAction={handleCreate}>
                            Create
                        </PrimaryButton>}

                </div>
            </Form.Group>
        </CustomModal>
    );
};

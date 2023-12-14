import { ApiKeyRecord, ApiTypes } from 'common/interfaces/UserApiKeys';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { CustomCheckbox } from 'components/dashboard/helpers/renderInputsHelper';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getApiKeysTypes } from '../apiKeys.service';

interface ApiKeyModalProps {
    onClose: () => void;
    apiKey?: Partial<ApiKeyRecord>;
}

export const ApiKeyModal = ({ apiKey, onClose }: ApiKeyModalProps): JSX.Element => {
    const [apiKeyTypes, setApiKeyTypes] = useState<ApiTypes[] | null>(null);

    const getApiTypes = () => {
        getApiKeysTypes().then((res) => {
            setApiKeyTypes(res.api_types);
        });
    };

    useEffect(() => {
        getApiTypes();
    }, []);

    return (
        <CustomModal onClose={onClose} width={800} title={`${apiKey ? 'Edit' : 'Add'} API key`}>
            <Form.Group className='d-flex flex-column row-gap-4'>
                <Form.Control
                    value={apiKey?.apikey as string}
                    disabled
                    id={apiKey?.itemuid as string}
                    name='Current API key'
                />
                <CustomCheckbox
                    currentValue={apiKey?.enabled as number}
                    id={apiKey?.apikey || 'apikey'}
                    name={apiKey?.apikey || 'api_key'}
                    title='API key active'
                />
                <Form.Select>
                    {apiKeyTypes?.map(({ id, name }) => (
                        <option id={String(id)}>{name}</option>
                    ))}
                </Form.Select>
                <Form.Control
                    as='textarea'
                    value={apiKey?.notes || ''}
                    placeholder='Leave a notes here'
                />
            </Form.Group>
        </CustomModal>
    );
};

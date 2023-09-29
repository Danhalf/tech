import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
    Status,
    getUserLocations,
    setUserOptionalData,
} from 'components/dashboard/users/user.service';
import { deepEqual } from 'components/dashboard/helpers/common';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';
import { renamedKeys } from 'common/app-consts';

interface UserOptionalModalProps {
    onClose: () => void;
    useruid: string;
}

export const UserOptionalModal = ({ onClose, useruid }: UserOptionalModalProps): JSX.Element => {
    const [optional, setOptional] = useState<any[]>([]);
    const [initialUserOptional, setInitialUserOptional] = useState<any>([]);
    const [allOptional, setAllOptional] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const { handleShowToast } = useToast();

    useEffect(() => {
        setIsLoading(true);
        if (useruid) {
            getUserLocations(useruid).then(async (response: any) => {
                setAllOptional(response);
                const responseOptional: any[] = response.locations;
                setOptional(responseOptional);
                const deepClone = JSON.parse(JSON.stringify(responseOptional));
                setInitialUserOptional(deepClone);
                setIsLoading(false);
            });
        }
    }, [useruid]);

    useEffect(() => {
        const isEqual = deepEqual(initialUserOptional, optional);
        if (!isEqual && !isLoading) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [optional, initialUserOptional, isLoading]);

    const handleChangeUserOptional = useCallback(
        (event: ChangeEvent<HTMLInputElement>, index: number) => {
            const { name, value } = event.target;
            optional[index][name] = value;

            setOptional([...optional]);
        },
        [optional]
    );

    const handleSetUserOptional = async (): Promise<void> => {
        setIsLoading(true);
        if (useruid) {
            const newOptional = { ...allOptional[0], locations: optional };
            try {
                const response = await setUserOptionalData(useruid, newOptional);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: 'User optional data successfully saved',
                        type: 'success',
                    });
                    onClose();
                }
            } catch (err) {
                const { message } = err as Error | AxiosError;
                handleShowToast({ message, type: 'danger' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!optional) {
        return <></>;
    }

    const disabledKeys = ['useruid', 'created', 'updated'];
    return (
        <>
            {optional &&
                optional.map((option: any, index: number) => {
                    return (Object.entries(option) as [string, string | number][]).map(
                        ([setting, value]) => {
                            const settingName = renamedKeys[setting] || setting;
                            return (
                                <div className='fv-row mb-8' key={setting}>
                                    <label
                                        htmlFor={setting}
                                        className='form-label fs-6 fw-bolder text-dark'
                                    >
                                        {settingName}
                                    </label>
                                    <input
                                        disabled={disabledKeys.includes(setting)}
                                        className='form-control bg-transparent'
                                        name={setting}
                                        type='text'
                                        value={value}
                                        onChange={(event) => handleChangeUserOptional(event, index)}
                                    />
                                </div>
                            );
                        }
                    );
                })}
            <PrimaryButton
                buttonText='Save user optional data'
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserOptional}
            />
        </>
    );
};

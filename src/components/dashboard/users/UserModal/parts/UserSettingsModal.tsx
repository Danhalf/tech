import { AxiosError } from 'axios';
import { convertToNumberIfNumeric, deepEqual } from 'components/dashboard/helpers/common';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { renamedKeys } from 'common/app-consts';
import { Status } from 'common/interfaces/ActionStatus';
import { getUserSettings, setUserSettings } from 'components/dashboard/users/user.service';
import { CustomCheckbox, CustomTextInput } from 'components/dashboard/helpers/renderInputsHelper';

interface UserSettingsModalProps {
    onClose: () => void;
    useruid: string;
}

export const UserSettingsModal = ({ onClose, useruid }: UserSettingsModalProps): JSX.Element => {
    const [settings, setSettings] = useState<any>({});
    const [initialUserSettings, setInitialUserSettings] = useState<any>({});
    const [allSettings, setAllSettings] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const { handleShowToast } = useToast();

    useEffect(() => {
        setIsLoading(true);
        if (useruid) {
            getUserSettings(useruid).then(async (response) => {
                setAllSettings(response);
                const responseSettings = response.settings;
                setSettings(responseSettings);
                setInitialUserSettings(responseSettings);
                setIsLoading(false);
            });
        }
    }, [useruid]);

    useEffect(() => {
        const isEqual = deepEqual(initialUserSettings, settings);
        if (!isEqual && !isLoading) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [settings, initialUserSettings, isLoading]);

    const handleChangeUserSettings = useCallback(
        (event: any) => {
            const { name, value } = event.target;
            // eslint-disable-next-line no-console
            console.log(name, value);
            setSettings({
                ...settings,
                [name]: convertToNumberIfNumeric(value),
            });
        },
        [settings]
    );

    const handleSetUserSettings = async (): Promise<void> => {
        setIsLoading(true);
        try {
            if (useruid) {
                const newSettings = { ...allSettings, settings };
                const response = await setUserSettings(useruid, newSettings);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: 'User settings successfully saved',
                        type: 'success',
                    });
                    onClose();
                }
            }
        } catch (error) {
            const { message } = error as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!settings) {
        return <></>;
    }

    const disabledKeys = ['useruid', 'created', 'updated'];
    const checkboxInputKeys = ['stocknumPrefix', 'stocknumSuffix', 'stocknumFixedDigits'];
    return (
        <>
            {settings &&
                (Object.entries(settings) as [string, string | number][]).map(
                    ([setting, value]) => {
                        const settingName = renamedKeys[setting] || setting;
                        return (
                            <div className='fv-row mb-8' key={setting}>
                                {checkboxInputKeys.includes(setting) ? (
                                    <CustomCheckbox
                                        currentValue={value as number}
                                        id={setting}
                                        name={setting}
                                        title={settingName}
                                        action={handleChangeUserSettings}
                                    />
                                ) : (
                                    <CustomTextInput
                                        currentValue={value as number}
                                        id={setting}
                                        name={setting}
                                        title={settingName}
                                        disabled={disabledKeys.includes(setting)}
                                        action={handleChangeUserSettings}
                                    />
                                    // <>
                                    //     <label
                                    //         htmlFor={setting}
                                    //         className='form-label fs-6 fw-bolder text-dark'
                                    //     >
                                    //         {settingName}
                                    //     </label>
                                    //     <input
                                    //         disabled={disabledKeys.includes(setting)}
                                    //         className='form-control bg-transparent'
                                    //         name={setting}
                                    //         type={'text'}
                                    //         value={value}
                                    //         onChange={handleChangeUserSettings}
                                    //     />
                                    // </>
                                )}
                            </div>
                        );
                    }
                )}
            <PrimaryButton
                buttonText='Save permissions'
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserSettings}
            />
        </>
    );
};

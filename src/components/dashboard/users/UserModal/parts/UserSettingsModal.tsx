import { AxiosError } from 'axios';
import { convertToNumberIfNumeric, deepEqual } from 'components/dashboard/helpers/common';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { useState, useEffect, useCallback } from 'react';
import { renamedKeys } from 'common/app-consts';
import { Status } from 'common/interfaces/ActionStatus';
import { getUserSettings, setUserSettings } from 'components/dashboard/users/user.service';
import {
    CustomCheckbox,
    CustomRadioButton,
    CustomTextInput,
} from 'components/dashboard/helpers/renderInputsHelper';

interface UserSettingsModalProps {
    onClose: () => void;
    useruid: string;
    username: string;
}

export const UserSettingsModal = ({
    onClose,
    useruid,
    username,
}: UserSettingsModalProps): JSX.Element => {
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
        (inputData: [string, number | string]) => {
            const [name, value] = inputData;
            setSettings({
                ...settings,
                [name]: convertToNumberIfNumeric(value as string),
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
                        message: `<strong>${username}</strong> settings successfully saved`,
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
    const radioButtonsKeys = ['stocknumLast6ofVIN', 'stocknumLast8ofVIN'];

    type SettingRecord = [string, string | number];
    type SettingsRecord = Record<string, string | number>;

    const settingsEntries = Object.entries(settings) as SettingRecord[];
    const orderedSettings: SettingRecord[] = [];
    const checkboxSettings: SettingsRecord = {};
    const radioSettings: SettingsRecord = {};
    const restOfSettings: SettingsRecord = {};

    settingsEntries.forEach(([key, value]: SettingRecord) => {
        switch (true) {
            case checkboxInputKeys.includes(key):
                checkboxSettings[key] = value;
                break;
            case radioButtonsKeys.includes(key):
                radioSettings[key] = value;
                break;
            default:
                restOfSettings[key] = value;
        }
    });

    orderedSettings.push(
        ...Object.entries(checkboxSettings),
        ...Object.entries(radioSettings),
        ...Object.entries(restOfSettings)
    );

    return (
        <>
            {orderedSettings &&
                orderedSettings.map(([setting, value]) => {
                    const settingName = renamedKeys[setting] || setting;
                    return (
                        <div className='fv-row mb-4' key={setting}>
                            {checkboxInputKeys.includes(setting) ? (
                                <CustomCheckbox
                                    currentValue={value as number}
                                    id={setting}
                                    name={setting}
                                    title={settingName}
                                    action={(newValue: [string, number]) =>
                                        handleChangeUserSettings(newValue)
                                    }
                                />
                            ) : radioButtonsKeys.includes(setting) ? (
                                <CustomRadioButton
                                    currentValue={value as number}
                                    id={setting}
                                    name={setting}
                                    title={settingName}
                                    options={[
                                        { value: 1, label: 'Include' },
                                        { value: 0, label: "Don't include" },
                                    ]}
                                    action={(newValue: [string, string]) =>
                                        handleChangeUserSettings(newValue)
                                    }
                                />
                            ) : (
                                <CustomTextInput
                                    currentValue={value as number}
                                    id={setting}
                                    name={setting}
                                    title={settingName}
                                    disabled={disabledKeys.includes(setting)}
                                    action={(event) =>
                                        handleChangeUserSettings([setting, event.target.value])
                                    }
                                />
                            )}
                        </div>
                    );
                })}
            <PrimaryButton
                buttonText='Save permissions'
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserSettings}
            />
        </>
    );
};

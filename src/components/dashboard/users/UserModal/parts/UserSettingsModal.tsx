import { AxiosError } from 'axios';
import { convertToNumberIfNumeric, deepEqual } from 'components/dashboard/helpers/common';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { useState, useEffect, useCallback } from 'react';
import { renamedKeys } from 'common/app-consts';
import { Status } from 'common/interfaces/ActionStatus';
import {
    getDealsOptions,
    getUserSettings,
    setUserSettings,
} from 'components/dashboard/users/user.service';
import {
    CustomCheckbox,
    CustomRadioButton,
    CustomTextInput,
    InputType,
} from 'components/dashboard/helpers/renderInputsHelper';
import {
    checkboxInputKeys,
    disabledKeys,
    radioButtonsKeys,
    rangeInputKeys,
    selectInputKeys,
    textInputKeys,
} from 'common/interfaces/users/UserSettings';
import { SettingKey } from 'common/interfaces/users/UserConsts';
import {
    SettingGroup,
    dealsGroup,
    feesGroup,
    taxesGroup,
    stockNewGroup,
    stockTIGroup,
    accountGroup,
    contractGroup,
    leaseGroup,
} from 'common/interfaces/users/UserGroups';

const getSettingType = (key: SettingKey): InputType => {
    if (disabledKeys.includes(key)) return InputType.DISABLED;
    if (textInputKeys.includes(key)) return InputType.TEXT;
    if (checkboxInputKeys.includes(key)) return InputType.CHECKBOX;
    if (rangeInputKeys.includes(key)) return InputType.RANGE;
    if (radioButtonsKeys.some((group) => group.includes(key))) return InputType.RADIO;
    if (selectInputKeys.includes(key)) return InputType.SELECT;
    return InputType.DEFAULT;
};

const getSettingGroup = (key: SettingKey): SettingGroup => {
    if (dealsGroup.includes(key)) return SettingGroup.DEALS;
    if (feesGroup.includes(key)) return SettingGroup.FEES;
    if (taxesGroup.includes(key)) return SettingGroup.TAXES;
    if (stockNewGroup.includes(key)) return SettingGroup.STOCK_NEW;
    if (stockTIGroup.includes(key)) return SettingGroup.STOCK_TI;
    if (accountGroup.includes(key)) return SettingGroup.ACCOUNT;
    if (contractGroup.includes(key)) return SettingGroup.CONTRACT;
    if (leaseGroup.includes(key)) return SettingGroup.LEASE;
    return SettingGroup.OTHER;
};

const getSettingTitle = (key: SettingKey): string => renamedKeys[key] || key;

interface Setting {
    key: string;
    value: string | number;
    title: string;
    type: InputType;
}

type GroupedSetting = Record<string, Setting[]>;

interface UserSettingsModalProps {
    onClose: () => void;
    useruid: string;
    username: string;
}

const SettingGroupValues: string[] = Object.values(SettingGroup) as string[];

const getGroupedList = () => {
    const grouped: GroupedSetting = {};
    SettingGroupValues.forEach((groupKey) => {
        grouped[groupKey] = [];
    });
    return grouped;
};

export const UserSettingsModal = ({
    onClose,
    useruid,
    username,
}: UserSettingsModalProps): JSX.Element => {
    const [settings, setSettings] = useState<Setting[]>([]);
    const [groupedSettings, setGroupedSettings] = useState<any>();
    const [initialUserSettings, setInitialUserSettings] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const { handleShowToast } = useToast();

    useEffect(() => {
        setIsLoading(true);
        if (useruid) {
            getUserSettings(useruid)
                .then(async (response) => {
                    if (response.status === Status.OK && response.settings) {
                        const settings = response.settings;

                        const groupedList: GroupedSetting = getGroupedList();

                        Object.entries({ ...settings }).forEach(
                            ([key, value]: [string, string | number]) => {
                                const type = getSettingType(key as SettingKey);
                                const group = getSettingGroup(key as SettingKey);
                                const title = getSettingTitle(key as SettingKey);

                                groupedList[group].push({
                                    key,
                                    value,
                                    title,
                                    type,
                                });
                            }
                        );
                        setGroupedSettings(groupedList);
                    }
                })
                .finally(() => {
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
                const newSettings = { settings };
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

    // eslint-disable-next-line no-console
    console.log(groupedSettings);

    if (!settings) {
        return <></>;
    }

    return (
        <>
            {groupedSettings &&
                Object.entries(groupedSettings).map(([groupName, groupSettings]) => {
                    return (
                        <div className='fv-row mb-4' key={groupName}>
                            <h2>{groupName}</h2>
                            {(groupSettings as Setting[]).map((setting: Setting) => (
                                <div key={setting.key}>
                                    <p>{setting.title}</p>
                                </div>
                            ))}
                        </div>
                    );
                })}

            <PrimaryButton
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserSettings}
            >
                Save {username} settings
            </PrimaryButton>
        </>
    );
};

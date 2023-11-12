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

const getSettingGroup = (key: SettingKey) => {
    if (dealsGroup.includes(key)) return 'DEALS';
    if (feesGroup.includes(key)) return 'FEES';
    if (taxesGroup.includes(key)) return 'TAXES';
    if (stockNewGroup.includes(key)) return 'STOCK_NEW';
    if (stockTIGroup.includes(key)) return 'STOCK_TI';
    if (accountGroup.includes(key)) return 'ACCOUNT';
    if (contractGroup.includes(key)) return 'CONTRACT';
    if (leaseGroup.includes(key)) return 'LEASE';
    return 'OTHER';
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

const SettingGroupKeys: string[] = Object.keys(SettingGroup) as string[];

const getGroupedList = () => {
    const grouped: GroupedSetting = {};
    SettingGroupKeys.forEach((groupKey) => {
        grouped[groupKey] = [];
    });
    return grouped;
};

// const initialSettingsState = {
//     useruid: '',
//     created: '',
//     updated: '',
//     stocknumPrefix: '',
//     stocknumSuffix: '',
//     stocknumFixedDigits: 0,
//     stocknumSequental: 0,
//     stocknumtiSequental: 0,
//     stocknumtiFromSoldVehicle: 0,
//     stocknumLast6ofVIN: 0,
//     stocknumLast8ofVIN: 0,
//     dealType: 0,
//     dealStatus: 0,
//     leaseTerm: 0,
//     leasePaymentFrequency: 0,
//     inventoryStatus: '',
//     saleType: '',
//     accountFixedDigits: 0,
//     accountLateFeeGracePeriod: 0,
//     accountLateFeeMax: 0,
//     accountLateFeeMin: 0,
//     accountLateFeePercentage: 0,
//     accountPrefix: '',
//     accountStartNumber: 0,
//     accountSuffix: '',
//     contractDefInterestRate: 0,
//     contractPaymentFrequency: 0,
//     feeDefDocumentation: 0,
//     feeDefSpareTag: 0,
//     feeDefSpareTransferTag: 0,
//     feeDefTag: 0,
//     feeDefTitle: 0,
//     feeDefTransfer: 0,
//     feeDefvehiclePack: 0,
//     index: 0,
//     itemuid: '',
//     leaseDefaultMileage: 0,
//     leaseMoneyFactor: 0,
//     leaseOverageAmount: 0,
//     taxDefStateVehicleTaxRate: 0,
// };

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

                                groupedList[group] &&
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

    if (!settings) {
        return <></>;
    }

    return (
        <>
            <div className='fv-row mb-4'>
                <h2>Deals</h2>
            </div>
            <div className='fv-row mb-4'>
                <h2>Fees</h2>
                {/* {groupedSettings.Deals.map((e: any) => (
                    <div key={e.title}>
                        {e.title} - {e.type} - <b></b>
                    </div>
                ))} */}
            </div>

            {/* {orderedSettings &&
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
                            ) : (
                                // : radioButtonsKeys.includes(setting) ? (
                                //     <CustomRadioButton
                                //         currentValue={value as number}
                                //         id={setting}
                                //         name={setting}
                                //         title={settingName}
                                //         options={[
                                //             { value: 1, label: 'Include' },
                                //             { value: 0, label: "Don't include" },
                                //         ]}
                                //         action={(newValue: [string, string]) =>
                                //             handleChangeUserSettings(newValue)
                                //         }
                                //     />)
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
                })} */}
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

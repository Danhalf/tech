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

interface UserSettingsModalProps {
    onClose: () => void;
    useruid: string;
    username: string;
}

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
    const [settings, setSettings] = useState<any>({});
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
                        const newSettings = Object.entries({ ...settings }).map(
                            ([key, value]: [string, string | number]) => {
                                let type: string;

                                switch (true) {
                                    case disabledKeys.includes(key as SettingKey):
                                        type = InputType.DISABLED;
                                        break;
                                    case textInputKeys.includes(key as SettingKey):
                                        type = InputType.TEXT;
                                        break;
                                    case checkboxInputKeys.includes(key as SettingKey):
                                        type = InputType.CHECKBOX;
                                        break;
                                    case rangeInputKeys.includes(key as SettingKey):
                                        type = InputType.RANGE;
                                        break;
                                    case radioButtonsKeys.some((group) =>
                                        group.includes(key as SettingKey)
                                    ):
                                        type = InputType.RADIO;
                                        break;
                                    case selectInputKeys.includes(key as SettingKey):
                                        type = InputType.SELECT;
                                        break;
                                    default:
                                        type = InputType.DEFAULT;
                                }

                                return {
                                    key,
                                    value,
                                    title: renamedKeys[key] || key,
                                    type,
                                };
                            }
                        );
                        setInitialUserSettings(newSettings);
                        // eslint-disable-next-line no-console
                        console.log(newSettings);
                        const UserSettings = {
                            deals: {},
                            fees: {
                                feeDefDocumentation: {
                                    title:
                                        renamedKeys[settings.feeDefDocumentation] ||
                                        settings.feeDefDocumentation,
                                },
                            },
                            taxes: {},
                            stockNewInventory: {},
                            stockTradeInventory: {},
                            accountSettings: {},
                            contractSettings: {},
                            leaseSettings: {},
                        };

                        setSettings(settings);
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

    // eslint-disable-next-line no-console
    console.log(initialUserSettings);

    return (
        <>
            <div className='fv-row mb-4'>
                <h2>Deals</h2>
                <CustomRadioButton
                    action={() => {}}
                    currentValue={settings.dealType}
                    id={'deals'}
                    name='deals'
                    options={[
                        { value: 0, label: 'Deal Status' },
                        { value: 1, label: 'Deal Type' },
                    ]}
                />
            </div>
            <div className='fv-row mb-4'>
                <h2>Fees</h2>
                {initialUserSettings.map((e: any) => (
                    <div>
                        {e.title} - {e.type}
                    </div>
                ))}
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

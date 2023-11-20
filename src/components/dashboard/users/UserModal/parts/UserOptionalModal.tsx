import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getUserLocations, setUserOptionalData } from 'components/dashboard/users/user.service';
import { deepEqual } from 'components/dashboard/helpers/common';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';
import { renamedKeys } from 'common/app-consts';
import { Status } from 'common/interfaces/ActionStatus';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';
import { TabPanel } from 'components/dashboard/helpers/helpers';

type Optional = Record<string, string | number>[];

interface UserOptionalModalProps {
    onClose: () => void;
    useruid: string;
    username: string;
}

interface TabSwitcherProps {
    tabs: Optional;
    activeTab: number;
    handleTabClick: (tab: number) => void;
}

const TabSwitcher = ({ tabs, activeTab, handleTabClick }: TabSwitcherProps) => {
    const renderTabs = () => {
        const totalTabs = tabs.length;
        const visibleTabs = [
            0,
            activeTab - 2,
            activeTab - 1,
            activeTab,
            activeTab + 1,
            activeTab + 2,
            totalTabs - 1,
        ];

        return tabs.map((_, idx: number) => {
            const isVisible = visibleTabs.includes(idx);
            return (
                isVisible && (
                    <button
                        key={idx}
                        type='button'
                        className={`btn btn-secondary ${activeTab === idx ? 'active' : ''}`}
                        onClick={() => handleTabClick(idx)}
                    >
                        {idx + 1}
                    </button>
                )
            );
        });
    };

    return (
        <div className='d-flex justify-content-center mb-3'>
            <div className='btn-group' role='group'>
                {renderTabs()}
            </div>
        </div>
    );
};

const hiddenKeys: readonly ['locationuid', ...string[]] = ['locationuid', 'useruid', 'index'];
const disabledKeys: readonly string[] = ['useruid', 'created', 'updated'];

const [locationuid] = hiddenKeys;
export const UserOptionalModal = ({
    onClose,
    useruid,
    username,
}: UserOptionalModalProps): JSX.Element => {
    const [optional, setOptional] = useState<Optional>([]);
    const [activeTab, setActiveTab] = useState<number>(0);
    const [initialUserOptional, setInitialUserOptional] = useState<
        Record<string, string | number>[]
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [locationKeys, setLocationKeys] = useState<string[]>([]);

    const { handleShowToast } = useToast();

    const UserOptionalSchema = Yup.object().shape({
        locEmail1: Yup.string().email('Please enter valid email address'),
        locEmail2: Yup.string().email('Please enter valid email address'),
        locPhone1: Yup.string().matches(/^[\d-]{10,16}$/, {
            message: 'Please enter a valid number with only digits/dashes.',
            excludeEmptyString: false,
        }),
        locPhone2: Yup.string().matches(/^[\d-]{10,16}$/, {
            message: 'Please enter a valid number with only digits/dashes.',
            excludeEmptyString: false,
        }),
        locZIP: Yup.string().matches(/^\d{5}$/, 'Please enter a valid 5-digit ZIP'),
    });

    const userOptionalValidateFields = Object.keys(UserOptionalSchema.fields);

    useEffect(() => {
        setIsLoading(true);
        if (useruid) {
            getUserLocations(useruid).then(async (response: any) => {
                const responseOptional: any[] = response.locations;

                const filteredOptional = responseOptional.map((option) => {
                    const filteredOption = Object.keys(option).reduce(
                        (acc: Record<string, string>, key) => {
                            if (key === locationuid) {
                                setLocationKeys((keys) => [...keys, option[key]]);
                            }
                            if (!hiddenKeys.includes(key)) {
                                acc[key] = option[key];
                            }
                            return acc;
                        },
                        {}
                    );

                    return filteredOption;
                });
                setOptional(filteredOptional);
                const deepClone = JSON.parse(JSON.stringify(filteredOptional));
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
            const filteredOptional = optional.map((item, index) => {
                const filteredItem = { ...item };
                disabledKeys.forEach((key) => {
                    delete filteredItem[key];
                });
                filteredItem[locationuid] = locationKeys[index];

                return filteredItem;
            });
            const newOptional = { locations: filteredOptional };
            try {
                const response = await setUserOptionalData(useruid, newOptional);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${username}</strong> optional data successfully saved`,
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

    const handleTabClick = (tab: number): void => {
        setActiveTab(tab);
    };

    if (!optional) {
        return <></>;
    }

    return (
        <>
            <TabSwitcher tabs={optional} activeTab={activeTab} handleTabClick={handleTabClick} />
            {optional.map((option: any, index: number) => (
                <div key={index} className='tab-content' id='myTabPanel'>
                    <Formik
                        initialValues={option}
                        onSubmit={handleSetUserOptional}
                        validationSchema={UserOptionalSchema}
                    >
                        {({ errors, touched }) => (
                            <TabPanel activeTab={String(activeTab)} tabName={`${index}`}>
                                <Form>
                                    {(Object.entries(option) as [string, string | number][]).map(
                                        ([setting]) => {
                                            const settingName = renamedKeys[setting] || setting;
                                            return (
                                                <div className='fv-row mb-4' key={setting}>
                                                    <div className='row'>
                                                        <div className='col-6 d-flex align-items-center'>
                                                            <label
                                                                htmlFor={setting}
                                                                className='fs-6 fw-bolder text-dark'
                                                            >
                                                                {settingName}
                                                                {touched[setting] &&
                                                                    errors[setting] && (
                                                                        <div className='fv-plugins-message-container position-absolute'>
                                                                            <div className='fv-help-block'>
                                                                                <span role='alert'>
                                                                                    {String(
                                                                                        errors[
                                                                                            setting
                                                                                        ]
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                            </label>
                                                        </div>
                                                        <div className='col-6 d-flex align-items-center'>
                                                            <Field
                                                                key={setting}
                                                                autoComplete='off'
                                                                disabled={disabledKeys.includes(
                                                                    setting
                                                                )}
                                                                className={clsx(
                                                                    'form-control bg-transparent',
                                                                    userOptionalValidateFields.includes(
                                                                        setting
                                                                    ) && {
                                                                        ...{
                                                                            'border-danger':
                                                                                touched[setting] &&
                                                                                errors[setting],
                                                                        },
                                                                        ...{
                                                                            'border-secondary':
                                                                                touched[setting] &&
                                                                                !errors[setting],
                                                                        },
                                                                    }
                                                                )}
                                                                name={setting}
                                                                onChange={(
                                                                    event: ChangeEvent<HTMLInputElement>
                                                                ) =>
                                                                    handleChangeUserOptional(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                    <div className='text-center mt-8'>
                                        <PrimaryButton
                                            icon='check'
                                            disabled={
                                                isButtonDisabled || !!Object.keys(errors).length
                                            }
                                            type='submit'
                                        >
                                            Save {username} optional data
                                        </PrimaryButton>
                                    </div>
                                </Form>
                            </TabPanel>
                        )}
                    </Formik>
                </div>
            ))}
        </>
    );
};

/* eslint-disable jsx-a11y/anchor-is-valid */
import { MenuComponent } from '_metronic/assets/ts/components';
import { AxiosError } from 'axios';
import { Status } from 'common/interfaces/ActionStatus';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { useEffect, useState } from 'react';
import { UserModal } from '../../UserModal/parts/UserModal';
import { UserOptionalModal } from '../../UserModal/parts/UserOptionalModal';
import { UserPermissionsModal } from '../../UserModal/parts/UserPermissionsModal';
import { UserSettingsModal } from '../../UserModal/parts/UserSettingsModal';
import { copyUser, deleteUser, killSession } from '../../user.service';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { User } from 'common/interfaces/UserData';

export const UserActionsCell = ({ useruid, username }: User) => {
    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false);
    const [userPermissionsModalEnabled, setUserPermissionsModalEnabled] = useState<boolean>(false);
    const [userSettingsModalEnabled, setUserSettingssModalEnabled] = useState<boolean>(false);
    const [userOptionalModalEnabled, setUserOptionalsModalEnabled] = useState<boolean>(false);

    const navigate = useNavigate();
    const { handleShowToast } = useToast();

    const handleEditUserModalOpen = () => {
        setEditUserModalEnabled(true);
    };
    const handleUserPermissonsModalOpen = () => {
        setUserPermissionsModalEnabled(true);
    };
    const handleUserSettingsModalOpen = () => {
        setUserSettingssModalEnabled(true);
    };
    const handleUserOptionalModalOpen = () => {
        setUserOptionalsModalEnabled(true);
    };

    useEffect(() => {
        MenuComponent.reinitialization();
    }, []);

    const handleCopyUser = async (): Promise<void> => {
        try {
            if (useruid) {
                const response: any = await copyUser(useruid);
                if (response.status === 'OK') {
                    const newUseruid = response.useruid;
                    navigate(`/dashboard/user/${newUseruid}`);
                    handleShowToast({
                        message: `${username} successfully copied`,
                        type: 'success',
                    });
                    // updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    const handleMoveToTrash = async (): Promise<void> => {
        try {
            if (useruid) {
                const response = await deleteUser(useruid);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: 'User successfully deleted',
                        type: 'success',
                    });
                    // updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    const handleKillSession = async (): Promise<void> => {
        try {
            if (useruid) {
                const response = await killSession(useruid);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: 'User session successfully closed',
                        type: 'success',
                    });
                    // updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    return (
        <>
            {editUserModalEnabled && (
                <CustomModal
                    onClose={() => setEditUserModalEnabled(false)}
                    title={'Change password'}
                >
                    <UserModal
                        onClose={() => setEditUserModalEnabled(false)}
                        user={{ username, useruid }}
                    />
                </CustomModal>
            )}
            {userPermissionsModalEnabled && (
                <CustomModal
                    onClose={() => setUserPermissionsModalEnabled(false)}
                    title={`${username} user permissions: `}
                >
                    <UserPermissionsModal
                        onClose={() => setUserPermissionsModalEnabled(false)}
                        useruid={useruid}
                    />
                </CustomModal>
            )}
            {userSettingsModalEnabled && (
                <CustomModal
                    onClose={() => setUserSettingssModalEnabled(false)}
                    title={`${username} user settings: `}
                >
                    <UserSettingsModal
                        onClose={() => setUserSettingssModalEnabled(false)}
                        useruid={useruid}
                    />
                </CustomModal>
            )}
            {userOptionalModalEnabled && (
                <CustomModal
                    onClose={() => setUserOptionalsModalEnabled(false)}
                    title={`${username} user settings: `}
                >
                    <UserOptionalModal
                        onClose={() => setUserOptionalsModalEnabled(false)}
                        useruid={useruid}
                    />
                </CustomModal>
            )}
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Change password',
                        menuItemAction: () => handleEditUserModalOpen(),
                    },
                    {
                        menuItemName: 'Copy user',
                        menuItemAction: () => handleCopyUser(),
                    },
                    {
                        menuItemName: 'Set user permissions',
                        menuItemAction: () => handleUserPermissonsModalOpen(),
                    },
                    {
                        menuItemName: 'Set user settings',
                        menuItemAction: () => handleUserSettingsModalOpen(),
                    },
                    {
                        menuItemName: 'Set user optional data',
                        menuItemAction: () => handleUserOptionalModalOpen(),
                    },
                    {
                        menuItemName: 'Delete user',
                        menuItemAction: () => handleMoveToTrash(),
                    },
                    {
                        menuItemName: 'Kill user session',
                        menuItemAction: () => killSession(useruid),
                    },
                ]}
            />
        </>
    );
};

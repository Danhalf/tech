/* eslint-disable jsx-a11y/anchor-is-valid */
import { MenuComponent } from '_metronic/assets/ts/components';
import { useEffect, useState } from 'react';
import { copyUser, deleteUser, getUsers, killSession } from '../../api/user.service';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { UserModal } from '../../UserModal/UserModal';
import { UserOptionalModal } from '../../UserModal/UserOptionalModal';
import { UserPermissionsModal } from '../../UserModal/UserPermissionsModal';
import { UserSettingsModal } from '../../UserModal/UserSettingsModal';
import { User } from '../../types/Users.types';

export const UserActionsCell = ({ useruid, username }: User) => {
    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false);
    const [userPermissionsModalEnabled, setUserPermissionsModalEnabled] = useState<boolean>(false);
    const [userSettingsModalEnabled, setUserSettingssModalEnabled] = useState<boolean>(false);
    const [userOptionalModalEnabled, setUserOptionalsModalEnabled] = useState<boolean>(false);

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

    const handleCopyUser = () => {
        copyUser(useruid).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response: any) => {});
            }
        });
    };

    const moveToTrash = () => {
        deleteUser(useruid).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response: any) => {});
            }
        });
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
                        username={username}
                        useruid={useruid}
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
                        menuItemAction: () => moveToTrash(),
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

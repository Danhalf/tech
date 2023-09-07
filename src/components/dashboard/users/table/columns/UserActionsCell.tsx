/* eslint-disable jsx-a11y/anchor-is-valid */
import { MenuComponent } from '_metronic/assets/ts/components';
import { useQueryResponse } from 'common/core/QueryResponseProvider';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import {
    copyUser,
    deleteUser,
    getDeletedUsers,
    getUsers,
    killSession,
} from '../../api/user.service';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { UserModal } from '../../UserModal/parts/UserModal';
import { UserOptionalModal } from '../../UserModal/parts/UserOptionalModal';
import { UserPermissionsModal } from '../../UserModal/parts/UserPermissionsModal';
import { UserSettingsModal } from '../../UserModal/parts/UserSettingsModal';
import { User, UsersType } from '../../types/Users.types';

const UserActionsCell = ({ useruid, username }: User) => {
    const { query } = useQueryResponse(UsersType.Users);

    const queryClient = useQueryClient();

    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);
    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false);
    const [userPermissionsModalEnabled, setUserPermissionsModalEnabled] = useState<boolean>(false);
    const [userSettingsModalEnabled, setUserSettingssModalEnabled] = useState<boolean>(false);
    const [userOptionalModalEnabled, setUserOptionalsModalEnabled] = useState<boolean>(false);

    const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled);
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
                getUsers().then((response: any) => {
                    // setUsers(response);
                    // setLoaded(true);
                });
                getDeletedUsers().then((response) => {
                    // setDeletedUsers(response);
                    // setLoaded(true);
                });
            }
        });
    };

    const moveToTrash = () => {
        deleteUser(useruid).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response: any) => {
                    // setUsers(response);
                    // setLoaded(true);
                });
                getDeletedUsers().then((response) => {
                    // setDeletedUsers(response);
                    // setLoaded(true);
                });
            }
        });
    };

    return (
        <>
            {addUserModalEnabled && (
                <CustomModal onClose={handleAddUserModalOpen} title={'Add user'}>
                    <UserModal onClose={handleAddUserModalOpen} />
                </CustomModal>
            )}
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
            {/* end::Menu */}
        </>
    );
};

export { UserActionsCell };

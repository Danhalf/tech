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
    undeleteUser,
} from '../../api/user.service';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { UserModal } from '../../UserModal/parts/UserModal';
import { User } from '../../types/Users.types';

const DeletedUsersActionsCell = ({ useruid, username }: User) => {
    const { query } = useQueryResponse();

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

    const restoreUser = (userId: string) => {
        undeleteUser(userId).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response: any) => {
                    //     setUsers(response);
                    //     setLoaded(true);
                });
                getDeletedUsers().then((response) => {
                    // setDeletedUsers(response);
                    // setLoaded(true);
                });
            }
        });
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
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Change password',
                        menuItemAction: () => handleEditUserModalOpen(),
                    },
                    {
                        menuItemName: 'Restore user',
                        menuItemAction: () => restoreUser(useruid),
                    },
                ]}
            />
            {/* end::Menu */}
        </>
    );
};

export { DeletedUsersActionsCell };

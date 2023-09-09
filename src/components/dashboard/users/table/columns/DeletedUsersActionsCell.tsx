import { MenuComponent } from '_metronic/assets/ts/components';
import { useEffect, useState } from 'react';
import { getDeletedUsers, undeleteUser } from '../../api/user.service';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { UserModal } from '../../UserModal/UserModal';
import { User } from '../../types/Users.types';

export const DeletedUsersActionsCell = ({ useruid, username }: User) => {
    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);
    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false);

    const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled);
    const handleEditUserModalOpen = () => {
        setEditUserModalEnabled(true);
    };

    const restoreUser = (userId: string) => {
        undeleteUser(userId).then((response) => {
            if (response.status === 'OK') {
                getDeletedUsers().then((response) => {});
            }
        });
    };

    useEffect(() => {
        MenuComponent.reinitialization();
    }, []);

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
        </>
    );
};

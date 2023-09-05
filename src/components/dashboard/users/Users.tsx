import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    copyUser,
    deleteUser,
    getDeletedUsers,
    getUsers,
    killSession,
    undeleteUser,
    User,
} from 'components/dashboard/users/user.service';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { UserModal } from 'components/dashboard/users/UserModal/parts/UserModal';
import { UserPermissionsModal } from 'components/dashboard/users/UserModal/parts/UserPermissionsModal';
import { UserSettingsModal } from 'components/dashboard/users/UserModal/parts/UserSettingsModal';
import { UserOptionalModal } from 'components/dashboard/users/UserModal/parts/UserOptionalModal';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { TableHead } from 'components/dashboard/helpers/renderTableHelper';
import { TabNavigate, TabPanel } from 'components/dashboard/helpers/helpers';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';

enum UsersTabs {
    Users = 'Users',
    DeletedUsers = 'Deleted users',
}

enum UsersColumns {
    ID = 'Index',
    Username = 'User name',
    ParrentUser = 'Created by user',
    isAdmin = 'Is admin',
    Actions = 'Actions',
}

const usersTabsArray: string[] = Object.values(UsersTabs) as string[];
const usersColumnsArray: string[] = Object.values(UsersColumns) as string[];

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);
    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false);
    const [userPermissionsModalEnabled, setUserPermissionsModalEnabled] = useState<boolean>(false);
    const [userSettingsModalEnabled, setUserSettingssModalEnabled] = useState<boolean>(false);
    const [userOptionalModalEnabled, setUserOptionalsModalEnabled] = useState<boolean>(false);

    const initialUsersState = {
        created: '',
        createdbyuid: '',
        index: 0,
        parentuid: '',
        parentusername: '',
        updated: '',
        username: '',
        useruid: '',
        isAdmin: 0,
    };

    const [selectedUser, setSelectedUser] = useState<User>(initialUsersState);

    const [activeTab, setActiveTab] = useState('Users');
    const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled);
    const handleEditUserModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setEditUserModalEnabled(true);
    };
    const handleUserPermissonsModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setUserPermissionsModalEnabled(true);
    };
    const handleUserSettingsModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setUserSettingssModalEnabled(true);
    };
    const handleUserOptionalModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setUserOptionalsModalEnabled(true);
    };

    const updateUsers = (): void => {
        getUsers().then((response: any) => {
            setUsers(response);
            setLoaded(true);
        });
    };

    useEffect(() => {
        if (!loaded) {
            updateUsers();
            getDeletedUsers().then((response) => {
                setDeletedUsers(response);
                setLoaded(true);
            });
        }
    }, [users, loaded]);

    const handleCopyUser = (srcuid: string) => {
        copyUser(srcuid).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response: any) => {
                    setUsers(response);
                    setLoaded(true);
                });
                getDeletedUsers().then((response) => {
                    setDeletedUsers(response);
                    setLoaded(true);
                });
            }
        });
    };

    const moveToTrash = (userId: string) => {
        deleteUser(userId).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response: any) => {
                    setUsers(response);
                    setLoaded(true);
                });
                getDeletedUsers().then((response) => {
                    setDeletedUsers(response);
                    setLoaded(true);
                });
            }
        });
    };

    const restoreUser = (userId: string) => {
        undeleteUser(userId).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response: any) => {
                    setUsers(response);
                    setLoaded(true);
                });
                getDeletedUsers().then((response) => {
                    setDeletedUsers(response);
                    setLoaded(true);
                });
            }
        });
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            {addUserModalEnabled && (
                <CustomModal onClose={handleAddUserModalOpen} title={'Add user'}>
                    <UserModal onClose={handleAddUserModalOpen} updateData={updateUsers} />
                </CustomModal>
            )}
            {editUserModalEnabled && (
                <CustomModal
                    onClose={() => setEditUserModalEnabled(false)}
                    title={'Change password'}
                >
                    <UserModal onClose={() => setEditUserModalEnabled(false)} user={selectedUser} />
                </CustomModal>
            )}
            {userPermissionsModalEnabled && (
                <CustomModal
                    onClose={() => setUserPermissionsModalEnabled(false)}
                    title={`${selectedUser.username} user permissions: `}
                >
                    <UserPermissionsModal
                        onClose={() => setUserPermissionsModalEnabled(false)}
                        useruid={selectedUser.useruid}
                    />
                </CustomModal>
            )}
            {userSettingsModalEnabled && (
                <CustomModal
                    onClose={() => setUserSettingssModalEnabled(false)}
                    title={`${selectedUser.username} user settings: `}
                >
                    <UserSettingsModal
                        onClose={() => setUserSettingssModalEnabled(false)}
                        useruid={selectedUser.useruid}
                    />
                </CustomModal>
            )}
            {userOptionalModalEnabled && (
                <CustomModal
                    onClose={() => setUserOptionalsModalEnabled(false)}
                    title={`${selectedUser.username} user settings: `}
                >
                    <UserOptionalModal
                        onClose={() => setUserOptionalsModalEnabled(false)}
                        useruid={selectedUser.useruid}
                    />
                </CustomModal>
            )}
            <div className='card'>
                <div className='card-header d-flex flex-column justify-content-end pb-0'>
                    <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                        {usersTabsArray.map((tab) => (
                            <TabNavigate
                                key={tab}
                                activeTab={activeTab}
                                tab={tab}
                                onTabClick={handleTabClick}
                            />
                        ))}
                    </ul>
                </div>

                <div className='tab-content' id='myTabContentInner'>
                    <div className='d-flex w-100 justify-content-end px-8 mt-4'>
                        <PrimaryButton
                            buttonText='Add User'
                            icon='plus'
                            buttonClickAction={handleAddUserModalOpen}
                        />
                    </div>
                    <TabPanel activeTab={activeTab} tabName={UsersTabs.Users}>
                        <div className='card-body'>
                            <div
                                className='d-flex justify-content-end'
                                data-kt-user-table-toolbar='base'
                            ></div>
                            <div className='table-responsive'>
                                <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                                    <TableHead columns={usersColumnsArray} />
                                    <tbody className='text-gray-600 fw-bold'>
                                        {users.map((user: User) => {
                                            return (
                                                <tr key={user.useruid}>
                                                    <td className='text-gray-800'>{user.index}</td>
                                                    <td>
                                                        <Link
                                                            to={`${user.useruid}`}
                                                            className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
                                                        >
                                                            {user.username}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`user/${user.parentuid}`}
                                                            className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
                                                        >
                                                            {user.parentusername}
                                                        </Link>
                                                    </td>
                                                    <td>{user.isAdmin ? 'yes' : 'no'}</td>

                                                    <td>
                                                        <CustomDropdown
                                                            title='Actions'
                                                            items={[
                                                                {
                                                                    menuItemName: 'Change password',
                                                                    menuItemAction: () =>
                                                                        handleEditUserModalOpen(
                                                                            user
                                                                        ),
                                                                },
                                                                {
                                                                    menuItemName: 'Copy user',
                                                                    menuItemAction: () =>
                                                                        handleCopyUser(
                                                                            user.useruid
                                                                        ),
                                                                },
                                                                {
                                                                    menuItemName:
                                                                        'Set user permissions',
                                                                    menuItemAction: () =>
                                                                        handleUserPermissonsModalOpen(
                                                                            user
                                                                        ),
                                                                },
                                                                {
                                                                    menuItemName:
                                                                        'Set user settings',
                                                                    menuItemAction: () =>
                                                                        handleUserSettingsModalOpen(
                                                                            user
                                                                        ),
                                                                },
                                                                {
                                                                    menuItemName:
                                                                        'Set user optional data',
                                                                    menuItemAction: () =>
                                                                        handleUserOptionalModalOpen(
                                                                            user
                                                                        ),
                                                                },
                                                                {
                                                                    menuItemName: 'Delete user',
                                                                    menuItemAction: () =>
                                                                        moveToTrash(user.useruid),
                                                                },
                                                                {
                                                                    menuItemName:
                                                                        'Kill user session',
                                                                    menuItemAction: () =>
                                                                        killSession(user.useruid),
                                                                },
                                                            ]}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UsersTabs.DeletedUsers}>
                        <div className='card-body'>
                            <div
                                className='d-flex justify-content-end'
                                data-kt-user-table-toolbar='base'
                            ></div>
                            <div className='table-responsive'>
                                <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                                    <TableHead columns={usersColumnsArray} />
                                    <tbody className='text-gray-600 fw-bold'>
                                        {deletedUsers.map((user: User) => {
                                            return (
                                                <tr key={user.useruid}>
                                                    <td className='text-gray-800'>{user.index}</td>
                                                    <td>
                                                        <Link
                                                            to={`${user.useruid}`}
                                                            className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
                                                        >
                                                            {user.username}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <CustomDropdown
                                                            title='Actions'
                                                            items={[
                                                                {
                                                                    menuItemName: 'Restore user',
                                                                    menuItemAction: () =>
                                                                        restoreUser(user.useruid),
                                                                },
                                                                {
                                                                    menuItemName: 'Change password',
                                                                    menuItemAction: () =>
                                                                        handleEditUserModalOpen(
                                                                            user
                                                                        ),
                                                                },
                                                            ]}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </>
    );
}

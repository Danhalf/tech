import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    copyUser,
    deleteUser,
    getDeletedUsers,
    getUsers,
    killSession,
    Status,
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
import { useToast } from '../helpers/renderToastHelper';
import { AxiosError } from 'axios';

// eslint-disable-next-line no-unused-vars
enum UsersTabs {
    // eslint-disable-next-line no-unused-vars
    Users = 'Users',
    // eslint-disable-next-line no-unused-vars
    DeletedUsers = 'Deleted users',
}

// eslint-disable-next-line no-unused-vars
enum UsersColumns {
    // eslint-disable-next-line no-unused-vars
    ID = 'Index',
    // eslint-disable-next-line no-unused-vars
    Username = 'User name',
    // eslint-disable-next-line no-unused-vars
    ParrentUser = 'Created by user',
    // eslint-disable-next-line no-unused-vars
    isadmin = 'Is admin',
    // eslint-disable-next-line no-unused-vars
    Actions = 'Actions',
}

const usersTabsArray: string[] = Object.values(UsersTabs) as string[];
const usersColumnsArray: string[] = Object.values(UsersColumns) as string[];

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);
    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false);
    const [userPermissionsModalEnabled, setUserPermissionsModalEnabled] = useState<boolean>(false);
    const [userSettingsModalEnabled, setUserSettingsModalEnabled] = useState<boolean>(false);
    const [userOptionalModalEnabled, setUserOptionalsModalEnabled] = useState<boolean>(false);

    const navigate = useNavigate();

    const { handleShowToast } = useToast();

    const initialUsersState = {
        created: '',
        createdbyuid: '',
        index: 0,
        parentuid: '',
        parentusername: '',
        updated: '',
        username: '',
        useruid: '',
        isadmin: 0,
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
        setUserSettingsModalEnabled(true);
    };
    const handleUserOptionalModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setUserOptionalsModalEnabled(true);
    };

    const updateUsers = (): void => {
        getUsers().then((response) => {
            setUsers(response);
            setLoaded(true);
        });
        getDeletedUsers().then((response) => {
            setDeletedUsers(response);
            setLoaded(true);
        });
    };

    useEffect(() => {
        if (!loaded) {
            updateUsers();
        }
    }, [users, loaded]);

    const handleCopyUser = async (useruid: string, username: string): Promise<void> => {
        setLoaded(false);
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
                    updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    const handleMoveToTrash = async (userId: string): Promise<void> => {
        setLoaded(false);
        try {
            if (userId) {
                const response = await deleteUser(userId);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: 'User successfully deleted',
                        type: 'success',
                    });
                    updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    const handleRestoreUser = async (userId: string): Promise<void> => {
        setLoaded(false);
        try {
            if (userId) {
                const response = await undeleteUser(userId);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: 'User successfully restored',
                        type: 'success',
                    });
                    updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    const handleKillSession = async (userId: string): Promise<void> => {
        setLoaded(false);
        try {
            if (userId) {
                const response = await killSession(userId);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: 'User session successfully closed',
                        type: 'success',
                    });
                    updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
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
                    onClose={() => setUserSettingsModalEnabled(false)}
                    title={`${selectedUser.username} settings: `}
                >
                    <UserSettingsModal
                        onClose={() => setUserSettingsModalEnabled(false)}
                        useruid={selectedUser.useruid}
                    />
                </CustomModal>
            )}
            {userOptionalModalEnabled && (
                <CustomModal
                    onClose={() => setUserOptionalsModalEnabled(false)}
                    title={`${selectedUser.username} optional data: `}
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
                                            return user?.useruid ? (
                                                <tr key={user.useruid}>
                                                    <td className='text-gray-800'>{user.index}</td>
                                                    <td>
                                                        <Link
                                                            to={`/dashboard/user/${user.useruid}`}
                                                            className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
                                                        >
                                                            {user.username}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/dashboard/user/${user.parentuid}`}
                                                            className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
                                                        >
                                                            {user.parentusername}
                                                        </Link>
                                                    </td>
                                                    <td>{user.isadmin ? 'yes' : 'no'}</td>

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
                                                                            user.useruid,
                                                                            user.username
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
                                                                        handleMoveToTrash(
                                                                            user.useruid
                                                                        ),
                                                                },
                                                                {
                                                                    menuItemName:
                                                                        'Kill user session',
                                                                    menuItemAction: () =>
                                                                        handleKillSession(
                                                                            user.useruid
                                                                        ),
                                                                },
                                                            ]}
                                                        />
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr>
                                                    <td>
                                                        <div
                                                            className='alert alert-danger fs-6'
                                                            role='alert'
                                                        >
                                                            <div className='bold'>Error: </div>
                                                            <span>
                                                                {JSON.parse(JSON.stringify(users))
                                                                    ?.error ||
                                                                    'Incorrect type of data received from the server'}
                                                            </span>
                                                        </div>
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
                                            return user?.useruid ? (
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
                                                                        handleRestoreUser(
                                                                            user.useruid
                                                                        ),
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
                                            ) : (
                                                <tr>
                                                    <td>
                                                        <div
                                                            className='alert alert-danger fs-6'
                                                            role='alert'
                                                        >
                                                            <div className='bold'>Error: </div>
                                                            <span>
                                                                {JSON.parse(JSON.stringify(users))
                                                                    ?.error ||
                                                                    'Incorrect type of data received from the server'}
                                                            </span>
                                                        </div>
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

import { useEffect, useState } from 'react'
import { copyUser, deleteUser, getDeletedUsers, getUsers, undeleteUser, User } from './user.service'
import { Link } from 'react-router-dom'
import { CustomDropdown, TabNavigate, TabPanel } from '../helpers/helpers'
import { AddUserModal } from './UserModal/AddUserModal'
import { EditUserModal } from './UserModal/EditUserModal'
import { TableHead } from '../helpers/renderTableHelper'

enum UsersTabs {
    Users = 'Users',
    DeletedUsers = 'Deleted users',
}

enum UsersColumns {
    Microservice = 'User name',
    Actions = 'Actions',
}

const usersTabsArray: string[] = Object.values(UsersTabs) as string[]
const usersColumnsArray: string[] = Object.values(UsersColumns) as string[]

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false)
    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false)

    const initialUserState = {
        created: '',
        createdbyuid: '',
        index: 0,
        parentuid: '',
        updated: '',
        username: '',
        useruid: '',
    }

    const [selectedUser, setSelectedUser] = useState<User>(initialUserState)

    const [activeTab, setActiveTab] = useState('Users')
    const [deletedUsers, setDeletedUsers] = useState<User[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

    const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled)
    const handleEditUserModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username })
        setEditUserModalEnabled(true)
    }

    const updateUsers = (): void => {
        getUsers().then((response) => {
            setUsers(response)
            setLoaded(true)
        })
    }

    useEffect(() => {
        if (!loaded) {
            updateUsers()
            getDeletedUsers().then((response) => {
                setDeletedUsers(response)
                setLoaded(true)
            })
        }
    }, [users, loaded])

    const handleCopyUser = (srcuid: string) => {
        copyUser(srcuid).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response) => {
                    setUsers(response)
                    setLoaded(true)
                })
                getDeletedUsers().then((response) => {
                    setDeletedUsers(response)
                    setLoaded(true)
                })
            }
        })
    }

    const moveToTrash = (userId: string) => {
        deleteUser(userId).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response) => {
                    setUsers(response)
                    setLoaded(true)
                })
                getDeletedUsers().then((response) => {
                    setDeletedUsers(response)
                    setLoaded(true)
                })
            }
        })
    }

    const restoreUser = (userId: string) => {
        undeleteUser(userId).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response) => {
                    setUsers(response)
                    setLoaded(true)
                })
                getDeletedUsers().then((response) => {
                    setDeletedUsers(response)
                    setLoaded(true)
                })
            }
        })
    }

    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <>
            {addUserModalEnabled && (
                <AddUserModal
                    onClose={handleAddUserModalOpen}
                    title={'Add user'}
                    updateData={updateUsers}
                />
            )}
            {editUserModalEnabled && (
                <EditUserModal
                    onClose={() => setEditUserModalEnabled(false)}
                    title={'Change password'}
                    userData={selectedUser}
                />
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
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={handleAddUserModalOpen}
                        >
                            <i className='ki-duotone ki-plus fs-2'></i>
                            Add User
                        </button>
                    </div>
                    <TabPanel activeTab={activeTab} tabName={UsersTabs.Users}>
                        <div className='card-body'>
                            <div
                                className='d-flex justify-content-end'
                                data-kt-user-table-toolbar='base'
                            ></div>
                            <div className='table-responsive'>
                                <table
                                    id='kt_table_users'
                                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                                >
                                    <TableHead columns={usersColumnsArray} />
                                    <tbody className='text-gray-600 fw-bold'>
                                        {users.map((user: User) => {
                                            return (
                                                <tr key={user.useruid}>
                                                    <td>
                                                        <Link
                                                            to={`${user.useruid}`}
                                                            className='text-gray-800 text-hover-primary mb-1'
                                                        >
                                                            {user.username}
                                                        </Link>
                                                    </td>
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
                                                                    menuItemName: 'Delete user',
                                                                    menuItemAction: () =>
                                                                        moveToTrash(user.useruid),
                                                                },
                                                            ]}
                                                        />
                                                    </td>
                                                </tr>
                                            )
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
                                <table
                                    id='kt_table_users'
                                    className='table align-middle table-row-dashed fs-6 gy-5 no-footer'
                                >
                                    <TableHead columns={usersColumnsArray} />
                                    <tbody className='text-gray-600 fw-bold'>
                                        {deletedUsers.map((user: User) => {
                                            return (
                                                <tr key={user.useruid}>
                                                    <td>
                                                        <Link
                                                            to={`${user.useruid}`}
                                                            className='text-gray-800 text-hover-primary mb-1'
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
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </>
    )
}

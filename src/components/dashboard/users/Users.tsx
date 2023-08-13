import { useEffect, useState } from 'react'
import { deleteUser, getDeletedUsers, getUsers, undeleteUser, User } from './user.service'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { TabNavigate, TabPanel } from '../helpers/helpers'
import { AddUserModal } from './UserModal/AddUserModal'
import { CreateDropdownHelper } from '../helpers/createDropdownHelper'

enum UsersTabs {
    Users = 'Users',
    DeletedUsers = 'Deleted users',
}

const usersTabsArray: string[] = Object.values(UsersTabs) as string[]

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [modalEnabled, setModalEnabled] = useState<boolean>(false)

    const [activeTab, setActiveTab] = useState('Users')
    const [deletedUsers, setDeletedUsers] = useState<User[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

    const handleModalOpen = () => setModalEnabled(!modalEnabled)

    useEffect(() => {
        if (!loaded) {
            getUsers().then((response) => {
                setUsers(response)
                setLoaded(true)
            })
            getDeletedUsers().then((response) => {
                setDeletedUsers(response)
                setLoaded(true)
            })
        }
    }, [users, loaded])

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
            {modalEnabled && <AddUserModal onClose={handleModalOpen} />}
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
                    <TabPanel activeTab={activeTab} tabName={UsersTabs.Users}>
                        <div className='card-body'>
                            <div
                                className='d-flex justify-content-end'
                                data-kt-user-table-toolbar='base'
                            >
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={handleModalOpen}
                                >
                                    Add User
                                </button>
                            </div>
                            <div className='table-responsive'>
                                <table
                                    id='kt_table_users'
                                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                                >
                                    <thead>
                                        <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                            <th>User name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-gray-600 fw-bold'>
                                        {users.map((user) => {
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
                                                        <CreateDropdownHelper
                                                            title='Action'
                                                            items={[
                                                                {
                                                                    menuItemName: 'Delete user',
                                                                    menuItemAction: () =>
                                                                        moveToTrash(user.useruid),
                                                                },
                                                                {
                                                                    menuItemName: 'Change password',
                                                                    menuItemAction: () =>
                                                                        console.log(
                                                                            `${user.useruid} password changed`
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

                <div className='tab-content' id='myTabContentInner'>
                    <div
                        className={clsx('tab-pane vw-90 mx-auto', {
                            active: activeTab === UsersTabs.DeletedUsers,
                        })}
                        id={`kt_tab_pane_${2}`}
                        role='tabpanel'
                    >
                        <div className='card-body'>
                            <div className='table-responsive'>
                                <table
                                    id='kt_table_users'
                                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                                >
                                    <thead>
                                        <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                            <th>User name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-gray-600 fw-bold'>
                                        {deletedUsers.map((user) => {
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
                                                        <CreateDropdownHelper
                                                            title='Action'
                                                            items={[
                                                                {
                                                                    menuItemName: 'Restore user',
                                                                    menuItemAction: () =>
                                                                        restoreUser(user.useruid),
                                                                },
                                                                {
                                                                    menuItemName: 'Change password',
                                                                    menuItemAction: () =>
                                                                        console.log(
                                                                            `${user.useruid} password changed`
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
                    </div>
                </div>
            </div>
        </>
    )
}

import { useEffect, useState } from 'react'
import { deleteUser, getDeletedUsers, getUsers, undeleteUser, User } from './user.service'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export default function Users() {
    const [users, setUsers] = useState<User[]>([])

    const [activeTab, setActiveTab] = useState('Users')
    const [deletedUsers, setDeletedUsers] = useState<User[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

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

    return (
        <>
            <div className="card">
                <div className='card-header d-flex flex-column justify-content-end pb-0'>
                    <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                        <li className='nav-item'>
                            <button
                                className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                    active: activeTab === 'Users',
                                })}
                                onClick={() => setActiveTab('Users')}
                                role='tab'
                            >
                                Users
                            </button>
                        </li>
                        <li className='nav-item'>
                            <button
                                className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                    active: activeTab === 'Deleted users',
                                })}
                                onClick={() => setActiveTab('Deleted users')}
                                role='tab'
                            >
                                Deleted users
                            </button>
                        </li>
                    </ul>
                </div>

                <div className='tab-content' id='myTabContentInner'>
                    <div
                        className={clsx('tab-pane vw-90 mx-auto', {
                            active: activeTab === 'Users',
                        })}
                        id={`kt_tab_pane_${1}`}
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
                                                        <button
                                                            className='btn btn-danger'
                                                            onClick={() => moveToTrash(user.useruid)}
                                                        >
                                                            Delete user
                                                        </button>
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

                <div className='tab-content' id='myTabContentInner'>
                    <div
                        className={clsx('tab-pane vw-90 mx-auto', {
                            active: activeTab === 'Deleted users',
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
                                                        <button
                                                            className='btn btn-success'
                                                            onClick={() => restoreUser(user.useruid)}
                                                        >
                                                            Restore user
                                                        </button>
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

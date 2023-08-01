import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import {
    getAllUIPermissions,
    getAllUITypes,
    getUserExtendedInfo,
    getUserLocations,
    getUserPermissions,
    getUserProfile,
    getUserSettings,
    getUserShortInfo,
    listSalesPersons,
    listSubusers,
    listUserLogins,
    listUserSessions,
} from './user.service'

export function UserCard() {
    const { id } = useParams()
    const [tab, setTab] = useState('Profile')
    const [profileJson, setProfileJson] = useState<string>('')
    const [extendedInfoJSON, setExtendedInfoJSON] = useState<string>('')
    const [shortInfoJSON, setShortInfoJSON] = useState<string>('')
    const [locationsJSON, setLocationsJSON] = useState<string>('')
    const [userPermissionsJSON, setUserPermissionsJSON] = useState<string>('')
    const [userSettingsJSON, setUserSettingsJSON] = useState<string>('')
    const [userSessionsJSON, setUserSessionsJSON] = useState<string>('')
    const [userLoginsJSON, setUserLoginsJSON] = useState<string>('')
    const [userSubusersJSON, setUserSubusersJSON] = useState<string>('')
    const [userSalesPersonsJSON, setSalesPersonsJSON] = useState<string>('')
    const [permissionsJSON, setPermissionsJSON] = useState<string>('')
    const [userTypesJSON, setUserTypesJSON] = useState<string>('')

    useEffect(() => {
        if (id) {
            getUserProfile(id).then((response) => {
                setProfileJson(JSON.stringify(response, null, 2))
            })
            getUserExtendedInfo(id).then((response) => {
                setExtendedInfoJSON(JSON.stringify(response, null, 2))
            })
            getUserShortInfo(id).then((response) => {
                setShortInfoJSON(JSON.stringify(response, null, 2))
            })
            getUserLocations(id).then((response) => {
                setLocationsJSON(JSON.stringify(response, null, 2))
            })
            getUserPermissions(id).then((response) => {
                setUserPermissionsJSON(JSON.stringify(response, null, 2))
            })
            getUserSettings(id).then((response) => {
                setUserSettingsJSON(JSON.stringify(response, null, 2))
            })
            listUserSessions(id).then((response) => {
                setUserSessionsJSON(JSON.stringify(response, null, 2))
            })
            listUserLogins(id).then((response) => {
                setUserLoginsJSON(JSON.stringify(response, null, 2))
            })
            listSubusers(id).then((response) => {
                setUserSubusersJSON(JSON.stringify(response, null, 2))
            })
            listSalesPersons(id).then((response) => {
                setSalesPersonsJSON(JSON.stringify(response, null, 2))
            })
            getAllUIPermissions(id).then((response) => {
                setPermissionsJSON(JSON.stringify(response, null, 2))
            })
            getAllUITypes(id).then((response) => {
                setUserTypesJSON(JSON.stringify(response, null, 2))
            })
        }
    }, [id])
    return (
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
            <div className='col-12'>
                <div className='card card-custom mb-5'>
                    <div className='card-header'>
                        <h3 className='card-title fw-bolder text-dark'>User Card</h3>
                    </div>
                    <div className='card-body d-flex flex-column justify-content-end pb-0'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Profile',
                                    })}
                                    onClick={() => setTab('Profile')}
                                    role='tab'
                                >
                                    Profile
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Extended info',
                                    })}
                                    onClick={() => setTab('Extended info')}
                                    role='tab'
                                >
                                    Extended info
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Short info',
                                    })}
                                    onClick={() => setTab('Short info')}
                                    role='tab'
                                >
                                    Short info
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Locations',
                                    })}
                                    onClick={() => setTab('Locations')}
                                    role='tab'
                                >
                                    Locations
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'User permissions',
                                    })}
                                    onClick={() => setTab('User permissions')}
                                    role='tab'
                                >
                                    User permissions
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Settings',
                                    })}
                                    onClick={() => setTab('Settings')}
                                    role='tab'
                                >
                                    Settings
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Sessions',
                                    })}
                                    onClick={() => setTab('Sessions')}
                                    role='tab'
                                >
                                    Sessions
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Logins',
                                    })}
                                    onClick={() => setTab('Logins')}
                                    role='tab'
                                >
                                    Logins
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Subusers',
                                    })}
                                    onClick={() => setTab('Subusers')}
                                    role='tab'
                                >
                                    Subusers
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Sales persons',
                                    })}
                                    onClick={() => setTab('Sales persons')}
                                    role='tab'
                                >
                                    Sales persons
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Permissions',
                                    })}
                                    onClick={() => setTab('Permissions')}
                                    role='tab'
                                >
                                    Permissions
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'User types',
                                    })}
                                    onClick={() => setTab('User types')}
                                    role='tab'
                                >
                                    User types
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='card card-custom'>
                    <div className='card-body'>
                        <div className='tab-content' id='myTabContent'>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Profile' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{profileJson}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Extended info' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{extendedInfoJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Short info' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{shortInfoJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Locations' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{locationsJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'User permissions' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{userPermissionsJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Settings' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{userSettingsJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Sessions' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{userSessionsJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Logins' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{userLoginsJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Subusers' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{userSubusersJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Sales persons' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{userSalesPersonsJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'Permissions' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{permissionsJSON}</pre>
                            </div>
                            <div
                                className={clsx('tab-pane', { active: tab === 'User types' })}
                                id='kt_tab_pane_1'
                                role='tabpanel'
                            >
                                <pre className='fs-4'>{userTypesJSON}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

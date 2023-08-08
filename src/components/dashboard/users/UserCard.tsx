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
import { TabContent, TabNavigate } from '../helpers/helpers'

enum UserCardTabs {
    Profile = 'Profile',
    ExtendedInfo = 'Extended info',
    ShortInfo = 'Short info',
    Locations = 'Locations',
    UserPermissions = 'User permissions',
    Settings = 'Settings',
    Sessions = 'Sessions',
    Logins = 'Logins',
    Subusers = 'Subusers',
    SalesPersons = 'Sales persons',
    Permissions = 'Permissions',
    UserTypes = 'User types',
}

const userCardTabsArray: string[] = Object.values(UserCardTabs) as string[]

export function UserCard() {
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState('Profile')
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

    const mutateJson = (jsonString: string, fieldName: string): string => {
        try {
            const jsonObject = JSON.parse(jsonString)

            if (typeof jsonObject === 'object' && jsonObject !== null) {
                const fieldValue = jsonObject[fieldName]
                delete jsonObject[fieldName]

                const updatedJsonObject = { [fieldName]: fieldValue, ...jsonObject }
                return JSON.stringify(updatedJsonObject, null, 2)
            }
        } catch (err) { }

        return jsonString
    }


    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
            <div className='col-12'>
                <div className='card card-custom mb-5 vw-90 mx-auto'>
                    <div className='card-header'>
                        <h3 className='card-title fw-bolder text-dark'>User Card</h3>
                    </div>
                    <div className='card-body d-flex flex-column justify-content-end pb-0'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            {userCardTabsArray.map((tab) => (
                                <TabNavigate key={tab} tab={tab} activeTab={activeTab} onTabClick={handleTabClick} />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='tab-content' id='myTabContent'>
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.Profile}
                        tabIndex={0}
                        tabContent={profileJson}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.ExtendedInfo}
                        tabIndex={1}
                        tabContent={extendedInfoJSON}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.ShortInfo}
                        tabIndex={2}
                        tabContent={shortInfoJSON}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.Locations}
                        tabIndex={3}
                        tabContent={mutateJson(locationsJSON, 'status')}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.UserPermissions}
                        tabIndex={4}
                        tabContent={mutateJson(userPermissionsJSON, 'useruid')}
                        checkbox={true}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.Settings}
                        tabIndex={5}
                        tabContent={mutateJson(userSettingsJSON, 'status')}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.Sessions}
                        tabIndex={6}
                        tabContent={userSessionsJSON}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.Logins}
                        tabIndex={7}
                        tabContent={userLoginsJSON}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.Subusers}
                        tabIndex={8}
                        tabContent={userSubusersJSON}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.SalesPersons}
                        tabIndex={9}
                        tabContent={userSalesPersonsJSON}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.Permissions}
                        tabIndex={10}
                        tabContent={mutateJson(permissionsJSON, 'status')}
                    />
                    <TabContent
                        activeTab={activeTab}
                        tabName={UserCardTabs.UserTypes}
                        tabIndex={11}
                        tabContent={userTypesJSON}
                    />
                </div>
            </div>
        </div>
    )
}

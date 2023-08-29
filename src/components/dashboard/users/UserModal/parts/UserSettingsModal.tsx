import { useEffect, useState } from 'react'
import { getUserSettings, setUserSettings } from '../../user.service'
import { PrimaryButton } from '../../../smallComponents/buttons/PrimaryButton'

interface UserSettingsModalProps {
    onClose: () => void
    useruid: string
}

export const UserSettingsModal = ({ onClose, useruid }: UserSettingsModalProps): JSX.Element => {
    const [userSettingsJSON, setUserSettingsJSON] = useState<string>('')
    const [initialUserSettingsJSON, setInitialUserSettingsJSON] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        if (useruid) {
            getUserSettings(useruid).then(async (response) => {
                const stringifiedResponse = response.settings
                setUserSettingsJSON(stringifiedResponse)
                setInitialUserSettingsJSON(stringifiedResponse)
                setIsLoading(false)
            })
        }
    }, [useruid])

    useEffect(() => {
        if (initialUserSettingsJSON !== userSettingsJSON && !isLoading) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [userSettingsJSON, initialUserSettingsJSON, isLoading])

    const handleChangeUserSettings = ([fieldName, fieldValue]: [string, number]): void => {
        const parsedUserPermission = JSON.parse(userSettingsJSON)
        parsedUserPermission[fieldName] = fieldValue
        setUserSettingsJSON(JSON.stringify(parsedUserPermission, null, 2))
    }

    const handleSetUserSettings = (): void => {
        setIsLoading(true)
        if (useruid) {
            // setUserSettings(useruid, JSON.parse(userSettingsJSON)).then((response) => {
            //     try {
            //         response.status = 200
            //         onClose()
            //     } catch (error) {
            //         console.log(error)
            //     } finally {
            //         setIsLoading(false)
            //     }
            // })
        }
    }

    console.log(userSettingsJSON)

    const disabledKeys = ['useruid', 'created', 'updated']
    return (
        <>
            {userSettingsJSON &&
                Object.keys(userSettingsJSON).map((key: any) => {
                    return (
                        <div className='w-100 mb-2'>
                            <label htmlFor={key}>{key}</label>
                            <input
                                disabled={disabledKeys.includes(key)}
                                key={key}
                                name={key}
                                type={'text'}
                                value={userSettingsJSON[key]}
                                onChange={handleSetUserSettings}
                            />
                        </div>
                    )
                })}
            <PrimaryButton
                buttonText='Save permissions'
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserSettings}
            />
        </>
    )
}

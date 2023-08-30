import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { getUserSettings, setUserSettings } from '../../user.service'
import { PrimaryButton } from '../../../smallComponents/buttons/PrimaryButton'
import { convertToNumberIfNumeric, deepEqual } from '../../../helpers/common'

interface UserSettingsModalProps {
    onClose: () => void
    useruid: string
}

export const UserSettingsModal = ({ onClose, useruid }: UserSettingsModalProps): JSX.Element => {
    const [settings, setSettings] = useState<any>({})
    const [initialUserSettings, setInitialUserSettings] = useState<any>({})
    const [allSettings, setAllSettings] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        if (useruid) {
            getUserSettings(useruid).then(async (response) => {
                setAllSettings(response)
                const responseSettings = response.settings
                setSettings(responseSettings)
                setInitialUserSettings(responseSettings)
                setIsLoading(false)
            })
        }
    }, [useruid])

    useEffect(() => {
        const isEqual = deepEqual(initialUserSettings, settings)
        if (!isEqual && !isLoading) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [settings, initialUserSettings, isLoading])

    const handleChangeUserSettings = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target

            setSettings({
                ...settings,
                [name]: convertToNumberIfNumeric(value),
            })
        },
        [settings]
    )

    const handleSetUserSettings = (): void => {
        setIsLoading(true)
        if (useruid) {
            const newSettings = { ...allSettings, settings }
            setUserSettings(useruid, newSettings).then((response) => {
                try {
                    response.status = 200
                    onClose()
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false)
                }
            })
        }
    }

    if (!settings) {
        return <></>
    }

    const disabledKeys = ['useruid', 'created', 'updated']
    return (
        <>
            {settings &&
                Object.entries(settings).map(([setting, value]: any) => {
                    return (
                        <div className='fv-row mb-8' key={setting}>
                            <label
                                htmlFor={setting}
                                className='form-label fs-6 fw-bolder text-dark'
                            >
                                {setting}
                            </label>
                            <input
                                disabled={disabledKeys.includes(setting)}
                                className='form-control bg-transparent'
                                name={setting}
                                type={'text'}
                                value={value}
                                onChange={handleChangeUserSettings}
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

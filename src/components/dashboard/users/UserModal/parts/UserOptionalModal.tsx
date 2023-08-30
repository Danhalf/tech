import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { getUserLocations, setUserOptionalData } from '../../user.service'
import { PrimaryButton } from '../../../smallComponents/buttons/PrimaryButton'
import { deepEqual } from '../../../helpers/common'

interface UserOptionalModalProps {
    onClose: () => void
    useruid: string
}

export const UserOptionalModal = ({ onClose, useruid }: UserOptionalModalProps): JSX.Element => {
    const [optional, setOptional] = useState<any[]>([])
    const [initialUserOptional, setInitialUserOptional] = useState<any>({})
    const [allOptional, setAllOptional] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        if (useruid) {
            getUserLocations(useruid).then(async (response: any) => {
                setAllOptional(response)
                const responseOptional: any[] = response.locations
                setOptional(responseOptional)
                setInitialUserOptional(responseOptional)
                setIsLoading(false)
            })
        }
    }, [useruid])

    useEffect(() => {
        const isEqual = deepEqual(initialUserOptional, optional)
        if (!isEqual && !isLoading) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [optional, initialUserOptional, isLoading])

    const handleChangeUserOptional = useCallback(
        (event: ChangeEvent<HTMLInputElement>, index: number) => {
            const { name, value } = event.target
            const updatedOptional = [...optional]

            updatedOptional[index] = { ...updatedOptional[index], [name]: value }

            setOptional(updatedOptional)
        },
        [optional]
    )

    const handleSetUserOptional = async (): Promise<void> => {
        setIsLoading(true)
        if (useruid) {
            const newOptional = { ...allOptional, locations: optional }
            try {
                const response = await setUserOptionalData(useruid, newOptional)
                if (response.status === 200) {
                    onClose()
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    if (!optional) {
        return <></>
    }

    const disabledKeys = ['useruid', 'created', 'updated']
    return (
        <>
            {optional &&
                optional.map((option: any) => {
                    return Object.entries(option).map(([setting, value]: any, index: number) => {
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
                                    onChange={(event) => handleChangeUserOptional(event, index)}
                                />
                            </div>
                        )
                    })
                })}
            <PrimaryButton
                buttonText='Save permissions'
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserOptional}
            />
        </>
    )
}

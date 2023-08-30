import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { getUserLocations, setUserOptionalData } from 'components/dashboard/users/user.service'
import { convertToNumberIfNumeric, deepEqual } from 'components/dashboard/helpers/common'
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton'

interface UserOptionalModalProps {
    onClose: () => void
    useruid: string
}

export const UserOptionalModal = ({ onClose, useruid }: UserOptionalModalProps): JSX.Element => {
    const [optional, setOptional] = useState<any>({})
    const [initialUserOptional, setInitialUserOptional] = useState<any>({})
    const [allOptional, setAllOptional] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        if (useruid) {
            getUserLocations(useruid).then(async (response) => {
                const jsonResponse = JSON.parse(response)
                setAllOptional(jsonResponse)
                const responseOptional = jsonResponse.location
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
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target

            setOptional({
                ...optional,
                [name]: convertToNumberIfNumeric(value),
            })
        },
        [optional]
    )

    const handleSetUserOptional = (): void => {
        setIsLoading(true)
        if (useruid) {
            const newOptional = { ...allOptional, optional }
            setUserOptionalData(useruid, newOptional).then((response: any) => {
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

    if (!optional) {
        return <></>
    }

    const disabledKeys = ['useruid', 'created', 'updated']
    return (
        <>
            {optional &&
                optional.map((option: any) =>
                    Object.entries(option).map(([setting, value]: any) => {
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
                                    onChange={handleChangeUserOptional}
                                />
                            </div>
                        )
                    })
                )}
            <PrimaryButton
                buttonText='Save permissions'
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserOptional}
            />
        </>
    )
}

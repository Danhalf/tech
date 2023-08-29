import { useEffect, useState } from 'react'
import { getUserPermissions, setUserPermissions } from '../../user.service'
import { renderList } from '../../../helpers/helpers'
import { PrimaryButton } from '../../../smallComponents/buttons/PrimaryButton'

interface UserPermissionsModalProps {
    onClose: () => void
    useruid: string
}

export const UserPermissionsModal = ({
    onClose,
    useruid,
}: UserPermissionsModalProps): JSX.Element => {
    const [userPermissionsJSON, setUserPermissionsJSON] = useState<string>('')
    const [initialUserPermissionsJSON, setInitialUserPermissionsJSON] = useState<string>('')
    const [modifiedJSON, setModifiedJSON] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

    const filterObjectValues = (json: Record<string, string | number>) => {
        const filteredObj: any = {}
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                const value = json[key]
                if (value === 0 || value === 1) {
                    filteredObj[key] = value
                }
            }
        }

        return filteredObj
    }

    useEffect(() => {
        setIsLoading(true)
        if (useruid) {
            getUserPermissions(useruid).then(async (response) => {
                const stringifiedResponse = JSON.stringify(response, null, 2)
                setUserPermissionsJSON(stringifiedResponse)
                setInitialUserPermissionsJSON(stringifiedResponse)
                const filteredData = typeof response === 'object' && filterObjectValues(response)
                setModifiedJSON(filteredData)
                setIsLoading(false)
            })
        }
    }, [useruid])

    useEffect(() => {
        if (initialUserPermissionsJSON !== userPermissionsJSON && !isLoading) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }, [userPermissionsJSON, initialUserPermissionsJSON, isLoading])

    const handleChangeUserPermissions = ([fieldName, fieldValue]: [string, number]): void => {
        const parsedUserPermission = JSON.parse(userPermissionsJSON)
        parsedUserPermission[fieldName] = fieldValue
        setUserPermissionsJSON(JSON.stringify(parsedUserPermission, null, 2))
        setModifiedJSON(filterObjectValues(parsedUserPermission))
    }

    const handleSetUserPermissions = (): void => {
        setIsLoading(true)
        if (useruid) {
            setUserPermissions(useruid, JSON.parse(userPermissionsJSON)).then((response) => {
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

    return (
        <>
            {!isLoading &&
                renderList({
                    data: modifiedJSON,
                    checkbox: true,
                    action: handleChangeUserPermissions,
                })}
            <PrimaryButton
                buttonText='Save permissions'
                icon='check'
                disabled={isButtonDisabled}
                buttonClickAction={handleSetUserPermissions}
            />
        </>
    )
}

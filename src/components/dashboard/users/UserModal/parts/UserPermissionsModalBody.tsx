import { useEffect, useState } from 'react'
import { getUserPermissions, setUserPermissions } from '../../user.service'
import { renderList } from '../../../helpers/helpers'

interface UserPermissionsModalBodyProps {
    onClose: () => void
    useruid: string
}

export const UserPermissionsModalBody = ({
    onClose,
    useruid,
}: UserPermissionsModalBodyProps): JSX.Element => {
    const [userPermissionsJSON, setUserPermissionsJSON] = useState<string>('')
    const [modifiedJSON, setModifiedJSON] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const filterObjectValues = async (json: Record<string, string | number>) => {
        const newObj: any = {}
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                const value = json[key]
                if (value === 0 || value === 1) {
                    newObj[key] = value
                }
            }
        }

        return newObj
    }

    useEffect(() => {
        getUserPermissions(useruid).then(async (response) => {
            setIsLoading(true)
            if (useruid) {
                getUserPermissions(useruid).then((response) => {
                    setUserPermissionsJSON(JSON.stringify(response, null, 2))
                })
            }

            const data = typeof response === 'object' && (await filterObjectValues(response))
            data && setModifiedJSON(data)
            setIsLoading(false)
        })
    }, [modifiedJSON, isLoading])

    const handleChangeUserPermissions = ([fieldName, fieldValue]: [string, number]) => {
        const parsedUserPermission = JSON.parse(userPermissionsJSON)
        parsedUserPermission[fieldName] = fieldValue
        if (useruid)
            setUserPermissions(useruid, parsedUserPermission).then(() =>
                getUserPermissions(useruid).then((response) => {
                    setUserPermissionsJSON(JSON.stringify(response, null, 2))
                })
            )
    }

    return (
        <>
            {!isLoading &&
                renderList({
                    data: modifiedJSON,
                    checkbox: true,
                    action: handleChangeUserPermissions,
                })}
        </>
    )
}

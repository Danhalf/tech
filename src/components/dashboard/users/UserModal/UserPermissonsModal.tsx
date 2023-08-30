import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper'
import { UserPermissionsModalBody } from 'components/dashboard/users/UserModal/parts/UserPermissionsModalBody'

type UserPermissonsModalProps = {
    onClose: () => void
    title: string
    useruid: string
}

export const UserPermissonsModal = ({
    onClose,
    title,
    useruid,
}: UserPermissonsModalProps): JSX.Element => (
    <CustomModal onClose={onClose} title={title}>
        <UserPermissionsModalBody onClose={onClose} useruid={useruid} />
    </CustomModal>
)

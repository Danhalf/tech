import { FC } from 'react'
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper'
import { User } from 'components/dashboard/users/user.service'
import { UserModalBody } from 'components/dashboard/users/UserModal/parts/UserModalBody'

type EditUserModalProps = {
    onClose: () => void
    title: string
    userData: User
}

export const EditUserModal: FC<EditUserModalProps> = ({ onClose, title, userData }) => (
    <CustomModal onClose={onClose} title={title}>
        <UserModalBody onClose={onClose} user={userData} />
    </CustomModal>
)

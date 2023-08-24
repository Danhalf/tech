import { FC } from 'react'
import { CustomModal } from '../../helpers/modal/renderModalHelper'
import { UserModalBody } from './parts/UserModalBody'
import { User } from '../user.service'

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

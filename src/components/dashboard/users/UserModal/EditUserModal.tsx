import { FC } from 'react'
import { CustomModal } from '../../helpers/modal/renderModalHelper'
import { EditUserModalBody } from './parts/EditUserModalBody'
import { User } from '../user.service'

type EditUserModalProps = {
    onClose: () => void
    title: string
    userData: User
}

export const EditUserModal: FC<EditUserModalProps> = ({ onClose, title, userData }) => (
    <CustomModal onClose={onClose} title={title}>
        <EditUserModalBody user={userData} />
    </CustomModal>
)

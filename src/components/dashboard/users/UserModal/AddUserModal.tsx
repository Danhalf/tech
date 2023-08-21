import { FC } from 'react'
import { CustomModal } from '../../helpers/modal/renderModalHelper'
import { AddUserModalBody } from './parts/AddUserModalBody'

type AddUserModalProps = {
    onClose: () => void
    title: string
}

export const AddUserModal: FC<AddUserModalProps> = ({ onClose, title }) => (
    <CustomModal onClose={onClose} title={title}>
        <AddUserModalBody />
    </CustomModal>
)

import { CustomModal } from '../../helpers/modal/renderModalHelper'
import { UserModalBody } from './parts/UserModalBody'

type AddUserModalProps = {
    onClose: () => void
    title: string
}

export const AddUserModal = ({ onClose, title }: AddUserModalProps) => (
    <CustomModal onClose={onClose} title={title}>
        <UserModalBody onClose={onClose} />
    </CustomModal>
)

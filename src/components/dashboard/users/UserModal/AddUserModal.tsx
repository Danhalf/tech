import { CustomModal } from '../../helpers/modal/renderModalHelper'
import { UserModalBody } from './parts/UserModalBody'

type AddUserModalProps = {
    onClose: () => void
    title: string
    updateData?: () => void
}

export const AddUserModal = ({ onClose, title, updateData }: AddUserModalProps) => (
    <CustomModal onClose={onClose} title={title}>
        <UserModalBody onClose={onClose} updateData={updateData} />
    </CustomModal>
)

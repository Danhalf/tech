import { UserModalBody } from 'components/dashboard/users/UserModal/parts/UserModalBody'
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper'

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

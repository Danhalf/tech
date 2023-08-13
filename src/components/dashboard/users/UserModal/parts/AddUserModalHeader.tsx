import { FC } from 'react'

interface AddUserModalProps {
    onClose: () => void
}

export const AddUserModalHeader: FC<AddUserModalProps> = ({ onClose }) => {
    return (
        <div className='modal-header'>
            <h2 className='fw-bolder'>Add User</h2>
            <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={onClose}
                style={{ cursor: 'pointer' }}
            >
                ✖
            </div>
        </div>
    )
}

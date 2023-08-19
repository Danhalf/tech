import { FC } from 'react'

interface UserModalHeaderProps {
    onClose: () => void
    title?: string
}

export const UserModalHeader: FC<UserModalHeaderProps> = ({ onClose, title = 'User' }) => {
    return (
        <div className='modal-header'>
            <h2 className='fw-bolder'>{title}</h2>
            <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={onClose}
                style={{ cursor: 'pointer' }}
            >
                <i className='ki-duotone ki-cross fs-1'>
                    <span className='path1'></span>
                    <span className='path2'></span>
                </i>
            </div>
        </div>
    )
}

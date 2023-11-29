import { PropsWithChildren, useCallback, useEffect } from 'react';

type CustomModalProps = {
    onClose: () => void;
    title: string;
};

const UserModalHeader = ({ onClose, title }: CustomModalProps): JSX.Element => {
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
    );
};

export const CustomModal = ({
    title,
    onClose,
    children,
}: PropsWithChildren<CustomModalProps>): JSX.Element => {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    return (
        <>
            <div
                className='modal fade show d-block'
                id={`kt_modal_${title}`}
                role='dialog'
                tabIndex={-1}
                aria-modal='true'
            >
                <div className='modal-dialog modal-dialog-centered mw-650px'>
                    <div className='modal-content'>
                        <UserModalHeader onClose={onClose} title={title} />
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>{children}</div>
                    </div>
                </div>
            </div>
            <div className='modal-backdrop fade show'></div>
        </>
    );
};

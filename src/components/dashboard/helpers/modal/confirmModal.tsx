import { Modal, Button } from 'react-bootstrap';

interface ConfirmModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    itemName: string;
}

export const ConfirmModal = ({
    show,
    onConfirm,
    onCancel,
    itemName,
}: ConfirmModalProps): JSX.Element => {
    return (
        <Modal show={show} onHide={onCancel} centered size='sm'>
            <Modal.Body>
                Are you sure you want to delete <strong>{itemName}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant='danger' onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

import clsx from 'clsx';
import {
    createContext,
    PropsWithChildren,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export const TOAST_DURATION = 5000;

type ToastType = 'success' | 'danger';

interface ToastData {
    message: string;
    type?: ToastType;
}

const InitStateToastData: ToastData = {
    message: '',
    type: 'success',
};

const ToastContext = createContext({
    handleShowToast: ({ message, type }: ToastData): void => {},
    handleToastClose: (): void => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastHeaderText, setToastHeaderText] = useState<string>('');
    const [{ message: toastMessage, type: toastType }, setToastData] =
        useState<ToastData>(InitStateToastData);

    useEffect(() => {
        switch (toastType) {
            case 'success':
                setToastHeaderText('Success!');
                break;
            case 'danger':
                setToastHeaderText('Error!');
                break;
        }
    }, [toastType]);

    const handleShowToast = ({ message, type }: ToastData) => {
        setToastData({ message, type });
        setShowToast(true);
    };

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    const handleToastClose = () => {
        setShowToast(false);
    };

    return (
        <ToastContext.Provider value={{ handleShowToast, handleToastClose }}>
            {children}
            <ToastContainer className='position-fixed' position='bottom-center'>
                <Toast show={showToast} onClose={handleToastClose} delay={TOAST_DURATION} autohide>
                    <Toast.Header
                        className={clsx(`fs-6 bg-${toastType} text-white`)}
                        closeVariant='white'
                    >
                        <strong className='me-auto'>{toastHeaderText}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <span
                            className='fs-6'
                            dangerouslySetInnerHTML={createMarkup(toastMessage)}
                        />
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </ToastContext.Provider>
    );
};

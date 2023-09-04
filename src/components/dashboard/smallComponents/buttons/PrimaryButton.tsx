interface IButtonProps {
    buttonText: string;
    disabled?: boolean;
    icon?: string;
    buttonClickAction?: () => void;
}

export const PrimaryButton = ({ buttonText, icon, disabled, buttonClickAction }: IButtonProps) => {
    return (
        <button
            type='button'
            className='btn btn-primary'
            onClick={buttonClickAction}
            disabled={disabled}
        >
            {icon && <i className={`ki-duotone ki-${icon} fs-2`}></i>}
            {buttonText}
        </button>
    );
};

/* eslint-disable no-unused-vars */
import { group } from 'console';
import { ChangeEvent, useEffect, useState } from 'react';

interface CustomInputProps {
    currentValue: number;
    id: string;
    name: string;
    title?: string;
    disabled?: boolean;
}

interface CustomCheckboxProps extends CustomInputProps {
    action?: (value: [string, number]) => void;
}
interface CustomTextInputProps extends Omit<CustomInputProps, 'currentValue'> {
    currentValue: string;
    action?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface CustomRadioButtonProps extends CustomInputProps {
    action?: (value: [string, number[]]) => void;
    group: string;
}

export enum InputType {
    DISABLED = 'disabledInput',
    TEXT = 'textInput',
    CHECKBOX = 'checkboxInput',
    RANGE = 'rangeInput',
    RADIO = 'radioInput',
    SELECT = 'selectInput',
    DEFAULT = 'defaultInput',
}

export const CustomCheckbox = ({ currentValue, id, name, title, action }: CustomCheckboxProps) => {
    const [value, setValue] = useState<number>(Number(currentValue));
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = () => {
        const newValue = value === 1 ? 0 : 1;
        setValue(newValue);

        if (action) {
            setIsLoading(true);
            action([name, newValue]);
        }
    };

    useEffect(() => {
        setIsLoading(false);
        if (currentValue !== value && action) {
        }
    }, [name, value, currentValue, action]);

    return (
        <div className='mb-4'>
            <div className='form-check form-check-custom form-check-solid'>
                <input
                    className='form-check-input cursor-pointer'
                    type='checkbox'
                    value={value}
                    checked={value === 1}
                    onChange={handleChange}
                    id={`checkbox-${id}`}
                    disabled={isLoading}
                />
                <label className='form-check-label cursor-pointer' htmlFor={`checkbox-${id}`}>
                    {title}
                </label>
            </div>
        </div>
    );
};

export const CustomTextInput = ({
    currentValue,
    id,
    name,
    title,
    action,
    disabled,
}: CustomTextInputProps): JSX.Element => {
    const handleInputAction = (event: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (action) {
            action(event);
        }
    };
    return (
        <div className='row'>
            <div className='col-6 d-flex align-items-center'>
                <label htmlFor={`text-input-${id}`} className='form-label fs-6 fw-bolder text-dark'>
                    {title}
                </label>
            </div>
            <div className='col-6 d-flex align-items-center'>
                <input
                    disabled={disabled}
                    className='form-control bg-transparent'
                    name={name}
                    type={'text'}
                    value={currentValue}
                    onChange={handleInputAction}
                />
            </div>
        </div>
    );
};

export const CustomRadioButton = ({
    id,
    group,
    currentValue,
    title,
    action,
}: CustomRadioButtonProps) => {
    // const [isLoading, setIsLoading] = useState(false);

    // const handleRadioChange = (index: number, newValue: number) => {
    //     const newSelectedValues = [...selectedValues];
    //     newSelectedValues[index] = newValue;
    //     setSelectedValues(newSelectedValues);

    //     if (action) {
    //         setIsLoading(true);
    //         action([name, newSelectedValues]);
    //     }
    // };

    // useEffect(() => {
    //     setIsLoading(false);
    // }, [name, selectedValues, action]);

    return (
        <div className='mb-4'>
            <div key={id}>
                {/* <span className='d-inline-block mb-2 form-check-label'>{title}</span> */}
                <div className='form-check form-check-custom form-check-solid'>
                    <div className='me-10' key={id}>
                        <input
                            className='form-check-input cursor-pointer'
                            type='radio'
                            value={currentValue}
                            name={group}
                            // checked={selectedValues[index] === option.value}
                            // onChange={() => handleRadioChange(index, option.value)}
                            id={`radio-${id}-${currentValue}`}
                            // disabled={isLoading}
                        />
                        <label
                            className='form-check-label cursor-pointer'
                            htmlFor={`radio-${id}-${currentValue}`}
                        >
                            {title}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

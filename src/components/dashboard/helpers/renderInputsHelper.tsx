/* eslint-disable no-unused-vars */
import { SettingKey } from 'common/interfaces/users/UserConsts';
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
    action?: (inputData: [string, string]) => void;
}

interface CustomRadioButtonProps extends CustomInputProps {
    action?: (inputData: [string, number, SettingKey]) => void;
    group: SettingKey;
}

interface CustomRangeInputProps extends CustomInputProps {
    group: string;
    minValue: number;
    maxValue: number;
    step: number;
    action?: (inputData: [string, number]) => void;
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
    const [inputValue, setInputValue] = useState(currentValue);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = String(event.target.value).replace(/[^0-9.,]/g, '');
        if (action) {
            setInputValue(newValue);
            action([name, newValue]);
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
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export const CustomRadioButton = ({
    id,
    group,
    currentValue,
    name,
    title,
    action,
}: CustomRadioButtonProps) => {
    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value ? 1 : 0;
        if (action) {
            action([name, newValue, group]);
        }
    };
    return (
        <div className='mb-4'>
            <div key={id}>
                <div className='form-check form-check-custom form-check-solid'>
                    <div className='me-10' key={id}>
                        <input
                            className='form-check-input cursor-pointer'
                            type='radio'
                            checked={currentValue === 1}
                            name={group}
                            id={`radio-${id}-${currentValue}`}
                            onChange={handleRadioChange}
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

export const CustomRangeInput = ({
    id,
    name,
    title,
    minValue,
    maxValue,
    step,
    currentValue,
    action,
}: CustomRangeInputProps) => {
    const [inputValue, setInputValue] = useState(currentValue);
    const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        if (action) {
            setInputValue(newValue);
            action([name, newValue]);
        }
    };

    return (
        <div className='mb-4'>
            <label htmlFor={`range-${id}`} className='form-label fs-6 fw-bolder'>
                {title}: {inputValue}
            </label>
            <input
                type='range'
                className='form-range'
                id={`range-${id}`}
                name={name}
                min={minValue}
                max={maxValue}
                step={step}
                value={inputValue}
                onChange={handleRangeChange}
            />
            <div className='d-flex justify-content-between'>
                <span>{minValue}</span>
                <span>{maxValue}</span>
            </div>
        </div>
    );
};

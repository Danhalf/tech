import { useEffect, useState } from 'react';

interface ICustomInput {
    currentValue: number;
    id: string;
    title: string;
    action?: (value: [string, number]) => void;
}

interface ICustomCheckbox extends ICustomInput {}

export const CustomCheckbox = ({ currentValue, id, title, action }: ICustomCheckbox) => {
    const [value, setValue] = useState<number>(currentValue);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = () => {
        setValue((prevValue: any) => (prevValue === 1 ? 0 : 1));
    };

    useEffect(() => {
        setIsLoading(false);
        if (currentValue !== value && action) {
            setIsLoading(true);
            action([title, value]);
        }
    }, [title, value, currentValue, action]);

    return (
        <div className='mb-10'>
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

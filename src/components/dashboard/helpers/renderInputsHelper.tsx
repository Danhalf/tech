import { useState } from 'react'

interface ICustomInput {
    currentValue: number
    id: string
    title: string
}

interface ICustomCheckbox extends ICustomInput {}

export const CustomCheckbox = ({ currentValue, id, title }: ICustomCheckbox) => {
    const [value, setValue] = useState<number>(currentValue)

    const handleChange = () => {
        setValue((prevValue: any) => (prevValue === 1 ? 0 : 1))
    }

    return (
        <div className='mb-10'>
            <div className='form-check form-check-custom form-check-solid'>
                <input
                    className='form-check-input'
                    type='checkbox'
                    value={value}
                    checked={value === 1}
                    onChange={handleChange}
                    id={`checkbox-${id}`}
                />
                <label className='form-check-label' htmlFor={`checkbox-${id}`}>
                    {title}
                </label>
            </div>
        </div>
    )
}

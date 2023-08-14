/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC, useState } from 'react'

interface PropsItems {
    menuItemName: string
    menuItemAction: () => void
}

interface Props {
    title: string
    items: PropsItems[]
}

export const CustomDropdown: FC<Props> = ({ title, items }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <div className={clsx('dropdown', { show: dropdownOpen })}>
            <button
                className='btn btn-light btn-active-light-primary btn-sm dropdown-toggle'
                onClick={toggleDropdown}
            >
                {title}
            </button>
            <div
                className={clsx(
                    'dropdown-menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4',
                    { show: dropdownOpen }
                )}
            >
                {items.map(({ menuItemName, menuItemAction }, idx) => (
                    <div key={menuItemName + idx} className='dropdown-item px-3 cursor-pointer'>
                        <a className='dropdown-item-link px-3' onClick={menuItemAction}>
                            {menuItemName}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

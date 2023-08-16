/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

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
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    useEffect(() => {
        const closeDropdown = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !(
                    dropdownRef.current instanceof Node &&
                    dropdownRef.current.contains(event.target as Node)
                )
            ) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('click', closeDropdown)

        return () => {
            document.removeEventListener('click', closeDropdown)
        }
    }, [])

    return (
        <div ref={dropdownRef} className={clsx('dropdown', { show: dropdownOpen })}>
            <button
                className='btn btn-light btn-active-light-primary btn-sm fw-bold'
                onClick={toggleDropdown}
            >
                {title}
                <i className='ki-duotone ki-down fs-5 m-0'></i>
            </button>
            <div
                className={clsx(
                    'dropdown-menu menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4 transition',
                    { show: dropdownOpen }
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {items.map(({ menuItemName, menuItemAction }, idx) => (
                    <div key={menuItemName + idx} className='menu-item px-3 cursor-pointer'>
                        <a className='menu-link px-3' onClick={menuItemAction}>
                            {menuItemName}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'

interface PropsItems {
    menuItemName: string
    menuItemAction: () => void
}

interface Props {
    title: string
    items: PropsItems[]
}

export const CustomDropdown: FC<Props> = ({ title, items }) => {
    return (
        <div className='m-0'>
            <a
                href='#'
                className='btn btn-light btn-active-light-primary btn-sm'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
            >
                Actions<i className='ki-duotone ki-down fs-5 m-0'></i>
            </a>
            <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
                data-kt-menu='true'
            >
                {items.map(({ menuItemName, menuItemAction }) => (
                    <div key={menuItemName} className='menu-item px-3'>
                        <a className='menu-link px-3' onClick={menuItemAction}>
                            {menuItemName}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

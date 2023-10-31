/* eslint-disable jsx-a11y/anchor-is-valid */
import { PropsWithChildren, useEffect } from 'react';
import { MenuComponent } from '_metronic/assets/ts/components';

interface PropsItems {
    menuItemName: string;
    icon?: string;
    menuItemAction?: () => void;
}

interface DropdownProps {
    title: string;
    weight?: number;
    items?: PropsItems[];
}

export const CustomDropdown = ({
    title,
    items,
    children,
    weight,
}: PropsWithChildren<DropdownProps>) => {
    useEffect(() => {
        MenuComponent.reinitialization();
    }, []);

    return (
        <>
            <a
                className='btn btn-light btn-active-light-primary btn-sm'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
            >
                {title}
                <i className='ki-duotone ki-down fs-5 m-0'></i>
            </a>
            <div
                className={`menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-${
                    weight || 150
                }px py-4`}
                data-kt-menu='true'
            >
                {children}
                {items &&
                    items.map(({ menuItemName, menuItemAction, icon }) => (
                        <div key={menuItemName} className='menu-item px-3' onClick={menuItemAction}>
                            <a className='menu-link px-3 text-hover-primary'>
                                {icon && <i className={`ki-outline ki-${icon} fs-2 me-2`} />}
                                {menuItemName}
                            </a>
                        </div>
                    ))}
            </div>
        </>
    );
};

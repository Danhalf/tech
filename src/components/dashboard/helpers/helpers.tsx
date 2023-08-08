import clsx from 'clsx'
import { useState } from 'react'
import { renderTable } from './renderTableHelper'
import { ITabValues } from '../interfaces/interfaces'
import { CustomCheckbox } from './renderInputsHelper'

const renderList = (data: any, checkbox: boolean = false) => {
    if (typeof data !== 'object' || data === null) {
        return (
            <div>
                <span className='text-muted d-block fw-semibold mb-6'>{data}</span>
            </div>
        )
    }

    const properties = Object.entries(data)

    return properties.map(([key, value]: [string, any], index: number) => {
        const title = key.replace(/^[^a-zа-яё]*([a-zа-яё])/i, (letter: string) =>
            letter.toUpperCase()
        )

        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                return <div key={`${key}-${index}`}>{renderTable(value)}</div>
            }
            return <div key={`${key}-${index}`}>{renderList(value)}</div>
        } else {
            const activeCheckbox = checkbox && (Number(value) === 0 || Number(value) === 1)
            return activeCheckbox ? (
                <CustomCheckbox
                    key={`${key}-${index}`}
                    currentValue={value}
                    id={key}
                    title={title}
                />
            ) : (
                <div key={`${key}-${index}`} className='d-flex align-items-center mb-4'>
                    <div className='flex-grow-1'>
                        <span className='text-dark fw-bold  fs-6'>{title}:</span>
                        <span className='text-muted d-block fw-semibold'>{value}</span>
                    </div>
                </div>
            )
        }
    })
}

export const TabNavigate = ({ activeTab, tab, onTabClick }: { activeTab: string; tab: string; onTabClick: (tab: string) => void }) => (
    <li className='nav-item'>
        <button
            className={clsx(`nav-link text-active-primary cursor-pointer`, {
                active: activeTab === tab,
            })}
            onClick={() => onTabClick(tab)}
            role='tab'
        >
            {tab}
        </button>
    </li>
)

const TabDataWrapper = ({
    title,
    data,
    checkbox = false,
}: {
    title: string
    data: string
    checkbox: boolean
}) => {
    const parsedData = JSON.parse(data)
    const [activeTab, setActiveTab] = useState('JSON view')
    const renderContent = () => {
        if (typeof parsedData === 'object' && !Array.isArray(parsedData)) {
            return renderList(parsedData, checkbox)
        } else {
            return renderTable(parsedData)
        }
    }

    return (
        <>
            <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
                <div className='col-12'>
                    <div className='card card-custom mb-5 vw-90 mx-auto'>
                        <div className='card-header d-flex flex-column justify-content-end pb-0'>
                            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                                <li className='nav-item'>
                                    <button
                                        className={clsx(
                                            `nav-link text-active-primary cursor-pointer`,
                                            {
                                                active: activeTab === 'JSON view',
                                            }
                                        )}
                                        onClick={() => setActiveTab('JSON view')}
                                        role='tab'
                                    >
                                        JSON view
                                    </button>
                                </li>
                                <li className='nav-item'>
                                    <button
                                        className={clsx(
                                            `nav-link text-active-primary cursor-pointer`,
                                            {
                                                active: activeTab === 'General view',
                                            }
                                        )}
                                        onClick={() => setActiveTab('General view')}
                                        role='tab'
                                    >
                                        General view
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className='tab-content' id='myTabContentInner'>
                            <div
                                className={clsx('tab-pane vw-90 mx-auto', {
                                    active: activeTab === 'JSON view',
                                })}
                                id='kt_tab_pane_json'
                                role='tabpanel'
                            >
                                <div className='card-body'>
                                    <pre className='fs-4'>{data}</pre>
                                </div>
                            </div>
                            <div
                                className={clsx('tab-pane vw-90 mx-auto', {
                                    active: activeTab === 'General view',
                                })}
                                id='kt_tab_pane_general'
                                role='tabpanel'
                            >
                                <div className='card-body'>
                                    {parsedData ? renderContent() : 'No data available'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export const TabContent = ({
    activeTab,
    tabName,
    tabIndex,
    tabContent,
    checkbox = false,
}: ITabValues) => (
    <div
        className={clsx('tab-pane vw-90 mx-auto', { active: activeTab === tabName })}
        id={`kt_tab_pane_${tabIndex}`}
        role='tabpanel'
    >
        {tabContent && <TabDataWrapper title={tabName} data={tabContent} checkbox={checkbox} />}
    </div>
)

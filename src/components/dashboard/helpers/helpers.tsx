import clsx from 'clsx'
import { useState } from 'react'

export interface IMicroserviceServerData {
    info: string
    status: string
    timestamp: string
    value?: string
}

interface ITabValues {
    activeTab: string
    tabName: string
    tabIndex: number
    tabContent: string
    checkbox?: boolean
}

const CustomCheckbox = ({
    currentValue,
    id,
    title,
}: {
    currentValue: number
    id: string
    title: string
}) => {
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

const getColumns = (data: IMicroserviceServerData[]) => {
    const columns = new Set<string>()

    data.forEach((obj: IMicroserviceServerData): void => {
        Object.keys(obj).forEach((key: string): void => {
            columns.add(key)
        })
    })
    return [...columns].map((column: string, index: number) => (
        <th key={`${column}-${index}`}>{column}</th>
    ))
}

const getRows = (data: IMicroserviceServerData[]) => {
    return (
        <>
            {data.map((row: IMicroserviceServerData, index: number) => (
                <tr key={`${data}-${index}`}>
                    {Object.values(row).map((cell: string) => (
                        <td key={`${Math.random()}-${cell}-${index}`}>{cell}</td>
                    ))}
                </tr>
            ))}
        </>
    )
}

const renderTable = (data: IMicroserviceServerData[]) => {
    return (
        <div className='table-responsive'>
            <table
                className={clsx(`table table-row-dashed table-row-gray-300 gy-7`, {
                    'table-striped': data.length > 5,
                })}
            >
                <thead>
                    <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200'>
                        {getColumns(data)}
                    </tr>
                </thead>
                <tbody>{getRows(data)}</tbody>
            </table>
        </div>
    )
}

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
                return (
                    <div key={`${key}-${index}`}>
                        <div className='ms-6'>{renderTable(value)}</div>
                    </div>
                )
            }
            return (
                <div key={`${key}-${index}`}>
                    <span className='text-dark fw-bold fs-6'>{title}:</span>
                    <div className='ms-6'>{renderList(value)}</div>
                </div>
            )
        } else {
            const activeCheckbox = checkbox && (Number(value) === 0 || Number(value) === 1)
            return (
                <div key={`${key}-${index}`}>
                    {activeCheckbox ? (
                        <CustomCheckbox currentValue={value} id={key} title={title} />
                    ) : (
                        <>
                            <span className='text-dark fw-bold fs-6'>{title}:</span>
                            <span className='text-muted d-block fw-semibold mb-6'>{value}</span>
                        </>
                    )}
                </div>
            )
        }
    })
}

const dataWrapper = (title: string, data: string, checkbox: boolean = false) => {
    const parsedData = JSON.parse(data)

    const renderContent = () => {
        if (typeof parsedData === 'object' && !Array.isArray(parsedData)) {
            return renderList(parsedData, checkbox)
        } else {
            return renderTable(parsedData)
        }
    }

    return (
        <>
            <div className='card card-custom mb-6'>
                <div className='card-header'>
                    <h3 className='card-title fw-bolder text-dark'>{title} as JSON view</h3>
                </div>
                <div className='card-body'>
                    <pre className='fs-4'>{data}</pre>
                </div>
            </div>
            <div className='card card-custom '>
                <div className='card-header'>
                    <h3 className='card-title fw-bolder text-dark'>{title}</h3>
                </div>
                <div className='card-body'>
                    {parsedData ? renderContent() : 'No data available'}
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
        className={clsx('tab-pane', { active: activeTab === tabName })}
        id={`kt_tab_pane_${tabIndex}`}
        role='tabpanel'
    >
        {tabContent && dataWrapper(tabName, tabContent, checkbox)}
    </div>
)

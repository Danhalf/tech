import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
    getServiceAlerts,
    getServiceAudit,
    getServiceById,
    getServiceCounters,
    getServiceLogs,
    Microservice,
} from './service'
import clsx from 'clsx'

interface IServerData {
    info: string
    status: string
    timestamp: string
    value?: string
}

enum Tabs {
    State = 'State',
    Logs = 'Logs',
    Audit = 'Audit',
    Alerts = 'Alerts',
    Counters = 'Counters',
}

interface ITabValues {
    tabName: string
    tabIndex: number
    tabContent: string
}

const getColumns = (data: string): string[] => {
    const parsedData = JSON.parse(data)
    const columns = new Set()

    parsedData.forEach((obj: IServerData) => {
        Object.keys(obj).forEach((key: string): void => {
            columns.add(key)
        })
    })
    return [...columns] as string[]
}

const getRows = (data: string) => {
    const parsedData = JSON.parse(data)
    return (
        <>
            {parsedData.map((row: IServerData, index: number) => (
                <tr key={index}>
                    {Object.values(row).map((cell) => (
                        <td key={cell}>{cell}</td>
                    ))}
                </tr>
            ))}
        </>
    )
}

const renderTable = (data: string) => (
    <div className='table-responsive'>
        <table className='table table-row-dashed table-row-gray-300 gy-7'>
            <thead>
                <tr className='fw-bold fs-6 text-gray-800 border-bottom border-gray-200'>
                    {getColumns(data).map((column: string) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{getRows(data)}</tbody>
        </table>
    </div>
)

const dataWrapper = (title: string, data: string) => (
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
            <div className='card-body'>{renderTable(data)}</div>
        </div>
    </>
)

export function MicroserviceCard() {
    const { uid } = useParams()
    const [tab, setTab] = useState('State')
    const [logs, setLogs] = useState<string>('')
    const [audit, setAudit] = useState<string>('')
    const [alerts, setAlerts] = useState<string>('')
    const [counters, setCounters] = useState<string>('')
    const [microserviceData, setMicroservice] = useState<Microservice | null>(null)

    const TabContent = ({ tabName, tabIndex, tabContent }: ITabValues) => (
        <div
            className={clsx('tab-pane', { active: tab === tabName })}
            id={`kt_tab_pane_${tabIndex}`}
            role='tabpanel'
        >
            {tabContent && dataWrapper(tabName, tabContent)}
        </div>
    )

    useEffect(() => {
        if (uid) {
            getServiceById(uid).then((response) => {
                if (response) {
                    setMicroservice(response)
                }
            })
            getServiceLogs(uid).then((response) => {
                if (response) {
                    setLogs(JSON.stringify(response, null, 2))
                }
            })
            getServiceAudit(uid).then((response) => {
                if (response) {
                    setAudit(JSON.stringify(response, null, 2))
                }
            })
            getServiceAlerts(uid).then((response) => {
                if (response) {
                    setAlerts(JSON.stringify(response, null, 2))
                }
            })
            getServiceCounters(uid).then((response) => {
                if (response) {
                    setCounters(JSON.stringify(response, null, 2))
                }
            })
        }
    }, [uid])

    return (
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
            <div className='col-12'>
                <div className='card card-custom mb-5'>
                    <div className='card-header'>
                        <h3 className='card-title fw-bolder text-dark'>{microserviceData?.name}</h3>
                    </div>
                    <div className='card-body d-flex flex-column justify-content-end pb-0'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <button
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === Tabs.State,
                                    })}
                                    onClick={() => setTab(Tabs.State)}
                                    role='tab'
                                >
                                    {Tabs.State}
                                </button>
                            </li>
                            <li className='nav-item'>
                                <button
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === Tabs.Logs,
                                    })}
                                    onClick={() => setTab(Tabs.Logs)}
                                    role='tab'
                                >
                                    {Tabs.Logs}
                                </button>
                            </li>
                            <li className='nav-item'>
                                <button
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === Tabs.Audit,
                                    })}
                                    onClick={() => setTab(Tabs.Audit)}
                                    role='tab'
                                >
                                    {Tabs.Audit}
                                </button>
                            </li>
                            <li className='nav-item'>
                                <button
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === Tabs.Alerts,
                                    })}
                                    onClick={() => setTab(Tabs.Alerts)}
                                    role='tab'
                                >
                                    {Tabs.Alerts}
                                </button>
                            </li>
                            <li className='nav-item'>
                                <button
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === Tabs.Counters,
                                    })}
                                    onClick={() => setTab(Tabs.Counters)}
                                    role='tab'
                                >
                                    {Tabs.Counters}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='tab-content' id='myTabContent'>
                    <div
                        className={clsx('tab-pane', { active: tab === Tabs.State })}
                        id='kt_tab_pane_1'
                        role='tabpanel'
                    >
                        <div className='card card-custom mb-6'>
                            <div className='card-header'>
                                <h3 className='card-title fw-bolder text-dark'>
                                    {Tabs.State} as JSON view
                                </h3>
                            </div>
                            <div className='card-body'>
                                <div className='d-flex align-items-center mb-20'>
                                    <pre className='fs-4'>
                                        {JSON.stringify(microserviceData, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        <div className='card card-custom mb-6'>
                            <div className='card-header'>
                                <h3 className='card-title fw-bolder text-dark'>{Tabs.State}</h3>
                            </div>
                            <div className='card-body'>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>Heartbit</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.heartbit}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>Index</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.index}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>IP address</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.ipv4}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>Port</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.port}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>Started</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.started}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>Status</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.status}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>Type</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.type}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>Type i</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.type_i}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>UID</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.uid}
                                        </span>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mb-7'>
                                    <div className='flex-grow-1'>
                                        <span className='text-dark fw-bold  fs-6'>Version</span>
                                        <span className='text-muted d-block fw-semibold'>
                                            {microserviceData?.version}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TabContent tabName={Tabs.Logs} tabIndex={2} tabContent={logs} />
                    <TabContent tabName={Tabs.Audit} tabIndex={3} tabContent={audit} />
                    <TabContent tabName={Tabs.Alerts} tabIndex={4} tabContent={alerts} />
                    <TabContent tabName={Tabs.Counters} tabIndex={5} tabContent={counters} />
                </div>
            </div>
        </div>
    )
}

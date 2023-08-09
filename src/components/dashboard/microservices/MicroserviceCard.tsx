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
import { TabPanel, TabNavigate, TabDataWrapper } from '../helpers/helpers'

enum MicroserviceTabs {
    State = 'State',
    Logs = 'Logs',
    Audit = 'Audit',
    Alerts = 'Alerts',
    Counters = 'Counters',
}

const microserviceTabsArray: string[] = Object.values(MicroserviceTabs) as string[]

export function MicroserviceCard() {
    const { uid } = useParams()
    const [activeTab, setActiveTab] = useState('State')
    const [logs, setLogs] = useState<string>('')
    const [audit, setAudit] = useState<string>('')
    const [alerts, setAlerts] = useState<string>('')
    const [counters, setCounters] = useState<string>('')
    const [microserviceData, setMicroservice] = useState<Microservice | null>(null)

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

    const handleTabClick = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
            <div className='col-12'>
                <div className='card card-custom mb-5 vw-90 mx-auto'>
                    <div className='card-header'>
                        <h3 className='card-title fw-bolder text-dark'>{microserviceData?.name}</h3>
                    </div>
                    <div className='card-body d-flex flex-column justify-content-end pb-0'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            {microserviceTabsArray.map((tab) => (
                                <TabNavigate
                                    key={tab}
                                    activeTab={activeTab}
                                    tab={tab}
                                    onTabClick={handleTabClick}
                                />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='tab-content' id='myTabPanel'>
                    <div
                        className={clsx('tab-pane', {
                            active: activeTab === MicroserviceTabs.State,
                        })}
                        id='kt_tab_pane_1'
                        role='tabpanel'
                    >
                        <div className='card card-custom mb-6'>
                            <div className='card-header'>
                                <h3 className='card-title fw-bolder text-dark'>
                                    {MicroserviceTabs.State} as JSON view
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
                                <h3 className='card-title fw-bolder text-dark'>
                                    {MicroserviceTabs.State}
                                </h3>
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
                    <TabPanel activeTab={activeTab} tabName={MicroserviceTabs.Logs}>
                        <TabDataWrapper data={logs} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={MicroserviceTabs.Audit}>
                        <TabDataWrapper data={audit} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={MicroserviceTabs.Alerts}>
                        <TabDataWrapper data={alerts} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={MicroserviceTabs.Counters}>
                        <TabDataWrapper data={counters} />
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}

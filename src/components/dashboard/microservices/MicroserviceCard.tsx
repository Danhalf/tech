import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    getServiceAlerts,
    getServiceAudit,
    getServiceById,
    getServiceCounters,
    getServiceLogs,
    Microservice,
} from 'components/dashboard/microservices/service';
import { TabDataWrapper, TabNavigate, TabPanel } from 'components/dashboard/helpers/helpers';

enum MicroserviceTabs {
    State = 'State',
    Logs = 'Logs',
    Audit = 'Audit',
    Alerts = 'Alerts',
    Counters = 'Counters',
}

const microserviceTabsArray: string[] = Object.values(MicroserviceTabs) as string[];

export function MicroserviceCard() {
    const { uid } = useParams();
    const [activeTab, setActiveTab] = useState('State');
    const [logs, setLogs] = useState<string>('');
    const [audit, setAudit] = useState<string>('');
    const [alerts, setAlerts] = useState<string>('');
    const [counters, setCounters] = useState<string>('');
    const [microserviceData, setMicroservice] = useState<Microservice | null>(null);

    useEffect(() => {
        if (uid) {
            getServiceById(uid).then((response) => {
                if (response) {
                    setMicroservice(response);
                }
            });
            getServiceLogs(uid).then((response) => {
                if (response) {
                    setLogs(JSON.stringify(response, null, 2));
                }
            });
            getServiceAudit(uid).then((response) => {
                if (response) {
                    setAudit(JSON.stringify(response, null, 2));
                }
            });
            getServiceAlerts(uid).then((response) => {
                if (response) {
                    setAlerts(JSON.stringify(response, null, 2));
                }
            });
            getServiceCounters(uid).then((response) => {
                if (response) {
                    setCounters(JSON.stringify(response, null, 2));
                }
            });
        }
    }, [uid]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

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
                    <TabPanel activeTab={activeTab} tabName={MicroserviceTabs.State}>
                        <TabDataWrapper data={JSON.stringify(microserviceData, null, 2)} />
                    </TabPanel>
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
    );
}

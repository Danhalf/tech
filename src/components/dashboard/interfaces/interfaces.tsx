import { IMicroserviceServerData } from './IMicroserviceServerData'

interface ITabValues {
    activeTab: string
    tabName: string
    children: string | JSX.Element | JSX.Element[]
    tabId?: number
}

export type { IMicroserviceServerData, ITabValues }

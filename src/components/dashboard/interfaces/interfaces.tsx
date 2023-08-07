import { IMicroserviceServerData } from './IMicroserviceServerData'

interface ITabValues {
    activeTab: string
    tabName: string
    tabIndex: number
    tabContent: string
    checkbox?: boolean
}

export type { IMicroserviceServerData, ITabValues }

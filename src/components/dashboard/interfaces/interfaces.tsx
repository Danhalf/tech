import { IMicroserviceServerData } from './IMicroserviceServerData'
import { IUser, IUserData } from './IUserData'

interface ITabValues {
    activeTab: string
    tabName: string
    children: string | JSX.Element | JSX.Element[]
    tabId?: number
}

export type { IMicroserviceServerData, ITabValues, IUser, IUserData }

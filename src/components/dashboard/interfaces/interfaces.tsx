import { IMicroserviceServerData } from './IMicroserviceServerData'
import { IUser, IUserEdit } from './IUserData'

interface ITabValues {
    activeTab: string
    tabName: string
    children: string | JSX.Element | JSX.Element[]
    tabId?: number
}

export type { IMicroserviceServerData, ITabValues, IUser, IUserEdit }

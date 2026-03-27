export interface ITabValues {
    activeTab: string;
    tabName: string;
    children: string | JSX.Element | JSX.Element[];
    tabId?: number;
}

import { QueryRequestProvider } from 'common/core/QueryRequestProvider';
import { QueryResponseProvider } from 'common/core/QueryResponseProvider';
import { UsersTable } from './table/UsersTable';
import { useState } from 'react';
import { TabNavigate, TabPanel } from '../helpers/helpers';
import { CustomModal } from '../helpers/modal/renderModalHelper';
import { UserModal } from './UserModal/UserModal';
import { PrimaryButton } from '../smallComponents/buttons/PrimaryButton';
import { UsersListType, UsersType } from './types/Users.types';

const usersTabsArray: string[] = Object.values(UsersType) as string[];

// const UsersList = () => {
//     const [activeTab, setActiveTab] = useState('Users');
//     const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);

//     const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled);

//     const handleTabClick = (tab: string) => {
//         setActiveTab(tab);
//     };

//     return (
//         <>
//             <TabPanel activeTab={activeTab} tabName={UsersTabs.Users}>
//                 <UsersTable list='users' />
//             </TabPanel>
//             <TabPanel activeTab={activeTab} tabName={UsersTabs.DeletedUsers}>
//                 deleted users
//             </TabPanel>
//         </>
//     );
// };

const UsersListWrapper = () => {
    const [activeTab, setActiveTab] = useState<UsersListType>(UsersType.Users);
    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);

    const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab as UsersListType);
    };
    return (
        <QueryRequestProvider>
            <QueryResponseProvider listType={activeTab}>
                {addUserModalEnabled && (
                    <CustomModal onClose={handleAddUserModalOpen} title={'Add user'}>
                        <UserModal onClose={handleAddUserModalOpen} />
                    </CustomModal>
                )}
                <div className='card'>
                    <div className='card-header d-flex flex-column justify-content-end pb-0'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            {usersTabsArray.map((tab) => (
                                <TabNavigate
                                    key={tab}
                                    activeTab={activeTab}
                                    tab={tab}
                                    onTabClick={handleTabClick}
                                />
                            ))}
                        </ul>
                    </div>

                    <div className='card-body'>
                        <div className='tab-content' id='myTabContentInner'>
                            <div className='d-flex w-100 justify-content-end px-8 mt-4'>
                                <PrimaryButton
                                    buttonText='Add User'
                                    icon='plus'
                                    buttonClickAction={handleAddUserModalOpen}
                                />
                            </div>
                            <TabPanel activeTab={activeTab} tabName={UsersType.Users}>
                                <UsersTable list={UsersType.Users} />
                            </TabPanel>
                            <TabPanel activeTab={activeTab} tabName={UsersType.DeletedUsers}>
                                <UsersTable list={UsersType.DeletedUsers} />
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </QueryResponseProvider>
        </QueryRequestProvider>
    );
};

export { UsersListWrapper };

import { QueryRequestProvider } from 'common/core/QueryRequestProvider';
import { QueryResponseProvider } from 'common/core/QueryResponseProvider';
import { UsersListType, UsersType } from 'common/interfaces/UserData';
import { useState } from 'react';
import { CustomModal } from '../helpers/modal/renderModalHelper';
import { ActionButton } from '../smallComponents/buttons/ActionButton';
import { UsersListSearchComponent } from '../smallComponents/search/Search';
import { UserModal } from './UserModal/parts/UserModal';
import { UsersTable } from './table/UsersTable';

export const Users = () => {
    const [activeTab] = useState<UsersListType>(UsersType.ACTIVE);
    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);

    const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled);

    return (
        <QueryRequestProvider>
            <QueryResponseProvider listType={activeTab}>
                {addUserModalEnabled && (
                    <CustomModal onClose={handleAddUserModalOpen} title={'Add dealer'}>
                        <UserModal onClose={handleAddUserModalOpen} />
                    </CustomModal>
                )}
                <div className='card'>
                    <div className='card-body'>
                        <div className='tab-content' id='myTabContentInner'>
                            <div className='d-flex w-100 justify-content-between my-4'>
                                <UsersListSearchComponent />
                                <ActionButton
                                    icon='plus'
                                    buttonClickAction={handleAddUserModalOpen}
                                >
                                    Add dealer
                                </ActionButton>
                            </div>
                            <UsersTable list={UsersType.ACTIVE} />
                        </div>
                    </div>
                </div>
            </QueryResponseProvider>
        </QueryRequestProvider>
    );
};

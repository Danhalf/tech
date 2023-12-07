import { MenuComponent } from '_metronic/assets/ts/components';
import { useEffect } from 'react';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { Status } from 'common/interfaces/ActionStatus';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';
import { User, UsersType } from 'common/interfaces/UserData';
import { undeleteUser } from '../../user.service';
import { useQueryResponse } from 'common/core/QueryResponseProvider';

export const DeletedUsersActionsCell = ({ useruid, username }: User) => {
    const { handleShowToast } = useToast();

    const { refetch } = useQueryResponse(UsersType.DELETED);

    const handleRestoreUser = async (userId: string): Promise<void> => {
        try {
            if (userId) {
                const response = await undeleteUser(userId);
                if (response.status === Status.OK) {
                    refetch();
                    handleShowToast({
                        message: `<strong>${username}</strong> successfully restored`,
                        type: 'success',
                    });
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    useEffect(() => {
        MenuComponent.reinitialization();
    }, []);

    return (
        <>
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Restore user',
                        menuItemAction: () => handleRestoreUser(useruid),
                    },
                ]}
            />
        </>
    );
};

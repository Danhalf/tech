import { MenuComponent } from '_metronic/assets/ts/components';
import { useEffect } from 'react';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { Status } from 'common/interfaces/ActionStatus';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';
import { User } from 'common/interfaces/UserData';
import { undeleteUser } from '../../user.service';

export const DeletedUsersActionsCell = ({ useruid }: User) => {
    const { handleShowToast } = useToast();

    const handleRestoreUser = async (userId: string): Promise<void> => {
        try {
            if (userId) {
                const response = await undeleteUser(userId);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: 'User successfully restored',
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

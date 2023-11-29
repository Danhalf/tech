import { Status } from 'common/interfaces/ActionStatus';
import { deleteImportItem, getImportItemInfo } from '../../common.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';

export const DataImportActions = ({ id }: { id: number | string }) => {
    const { handleShowToast } = useToast();
    const handleInformationClick = () => {
        getImportItemInfo(String(id))
            .then((response) => {
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${id}</strong> information successfully updated`,
                        type: 'success',
                    });
                } else {
                    throw new Error(response.error);
                }
            })
            .catch((err) => {
                handleShowToast({ message: err, type: 'danger' });
            });
    };

    const handleDeleteClick = () => {
        deleteImportItem(String(id))
            .then((response) => {
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${id}</strong> successfully deleted`,
                        type: 'success',
                    });
                } else {
                    throw new Error(response.error);
                }
            })
            .catch((err) => {
                handleShowToast({ message: err, type: 'danger' });
            });
    };

    return (
        <CustomDropdown
            title='Actions'
            items={[
                {
                    menuItemName: 'Data info',
                    icon: 'information-2',
                    menuItemAction: () => handleInformationClick(),
                },
                {
                    menuItemName: 'Delete',
                    icon: 'file-deleted',
                    menuItemAction: () => handleDeleteClick(),
                },
            ]}
        />
    );
};

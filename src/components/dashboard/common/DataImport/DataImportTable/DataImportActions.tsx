import { Status } from 'common/interfaces/ActionStatus';
import { deletePrintItem, setPrintItemInfo } from '../../common.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';

export const DataImportActions = ({ id }: { id: number }) => {
    const { handleShowToast } = useToast();
    const handleInformationClick = () => {
        setPrintItemInfo(String(id))
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
        deletePrintItem(String(id))
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

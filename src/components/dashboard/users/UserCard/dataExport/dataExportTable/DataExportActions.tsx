import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { deleteUserDataExport, resetUserDataExport } from '../DataExport.service';
import { DataExportRecord } from 'common/interfaces/DataExport';

interface DataExportsActionsProps {
    dataExport: DataExportRecord;
    updateAction?: () => void;
}

export const DataExportsActions = ({ dataExport, updateAction }: DataExportsActionsProps) => {
    const handleDeleteItem = () => {
        deleteUserDataExport(dataExport.taskuid);
        updateAction && updateAction();
    };
    const handleRestartItem = () => {
        resetUserDataExport(dataExport.taskuid);
        updateAction && updateAction();
    };

    return (
        <>
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Delete',
                        icon: 'minus-circle',
                        menuItemAction: handleDeleteItem,
                    },
                    {
                        menuItemName: 'Restart',
                        icon: 'arrows-circle',
                        menuItemAction: handleRestartItem,
                    },
                ]}
            />
        </>
    );
};

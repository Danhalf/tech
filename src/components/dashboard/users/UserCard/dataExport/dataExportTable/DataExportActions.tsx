import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { Status } from 'common/interfaces/ActionStatus';

interface DataExportsActionsProps {
    dataExport: Partial<any>;
    // DataExport: Partial<DataExportRecord>;
    updateAction?: () => void;
}

export const DataExportsActions = ({ dataExport, updateAction }: DataExportsActionsProps) => {
    return (
        <>
            <CustomDropdown
                title='Actions'
                items={[
                    {
                        menuItemName: 'Edit key',
                        icon: 'key',
                        // menuItemAction: () => setEditKeyModalEnabled(true),
                    },
                    {
                        menuItemName: 'Delete key',
                        icon: 'minus-circle',
                        // menuItemAction: () => handleDeleteClick(),
                    },
                ]}
            />
        </>
    );
};

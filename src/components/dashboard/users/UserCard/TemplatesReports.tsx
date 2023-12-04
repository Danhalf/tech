import { AxiosError } from 'axios';
import { Status } from 'common/interfaces/ActionStatus';
import { uploadPrintFile } from 'components/dashboard/common/common.service';
import { TabDataWrapper } from 'components/dashboard/helpers/helpers';
import { CustomUploadInput } from 'components/dashboard/helpers/renderInputsHelper';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';

interface TemplatesReportsProps {
    data: string;
}

const EmptyJSON = [
    {
        templatesReportsData: 'empty',
    },
];

const TemplatesReportsFormUploadInput = ({
    action,
}: {
    action: (file: File) => void;
}): JSX.Element => (
    <div className='m-4 ms-auto'>
        <CustomUploadInput id='reports-upload' name='reports-pdf' filetype='pdf' action={action} />
    </div>
);

export const TemplatesReports = ({ data }: TemplatesReportsProps): JSX.Element => {
    const { handleShowToast } = useToast();
    const handleFileUpload = (file: File) => {
        uploadPrintFile(file)
            .then((response) => {
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${file.name}</strong> successfully uploaded`,
                        type: 'success',
                    });
                }
            })
            .catch((err) => {
                const { message } = err as Error | AxiosError;
                handleShowToast({ message, type: 'danger' });
            });
    };
    return (
        <TabDataWrapper
            data={data || JSON.stringify(EmptyJSON)}
            headerElement={<TemplatesReportsFormUploadInput action={handleFileUpload} />}
        />
    );
};

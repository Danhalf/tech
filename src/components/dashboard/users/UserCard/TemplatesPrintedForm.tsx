import { AxiosError } from 'axios';
import { Status } from 'common/interfaces/ActionStatus';
import { uploadPrintFile } from 'components/dashboard/common/common.service';
import { TabDataWrapper } from 'components/dashboard/helpers/helpers';
import { CustomUploadInput } from 'components/dashboard/helpers/renderInputsHelper';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';

interface TemplatesPrintedFormProps {
    data: string;
}

const EmptyJSON = [
    {
        templatesPrintedFormData: 'empty',
    },
];

const TemplatesPrintedFormUploadInput = ({
    action,
}: {
    action: (file: File) => void;
}): JSX.Element => (
    <div className='me-4 mt-4 ms-auto'>
        <CustomUploadInput id='reports-upload' name='reports-pdf' filetype='pdf' action={action} />
    </div>
);

export const TemplatesPrintedForm = ({ data }: TemplatesPrintedFormProps): JSX.Element => {
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
        <>
            <TabDataWrapper
                data={data || JSON.stringify(EmptyJSON)}
                headerElement={<TemplatesPrintedFormUploadInput action={handleFileUpload} />}
            />
        </>
    );
};

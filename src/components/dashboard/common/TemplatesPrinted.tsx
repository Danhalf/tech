import { useState, useEffect } from 'react';
import { TableHead } from '../helpers/renderTableHelper';
import { getTemplatePrints, uploadPrintFile } from './common.service';
import { AxiosError } from 'axios';
import { Status } from 'common/interfaces/ActionStatus';
import { useToast } from '../helpers/renderToastHelper';
import { CustomUploadInput } from '../helpers/renderInputsHelper';

export const TemplatesPrinted = (): JSX.Element => {
    const [templatesPrinted, setTemplatesPrinted] = useState<any>(null);

    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const { handleShowToast } = useToast();

    const updateTemplatesPrinted = (): void => {
        getTemplatePrints().then((response) => {
            setTemplatesPrinted(response);
        });
    };

    useEffect(() => {
        updateTemplatesPrinted();
    }, []);

    const handleFileUpload = (file: File) => {
        setIsDisabled(true);
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
            })
            .finally(() => {
                setIsDisabled(false);
            });
    };

    return (
        <>
            <div className='card'>
                <div className='me-4 mt-4 ms-auto'>
                    <CustomUploadInput
                        id='reports-upload'
                        name='reports-pdf'
                        filetype='pdf'
                        disabled={isDisabled}
                        action={handleFileUpload}
                    />
                </div>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                            <TableHead columns={['id', 'Printed template', 'Actions']} />
                            <tbody className='text-gray-600 fw-bold'>
                                <tr>
                                    <td>{JSON.stringify(templatesPrinted)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

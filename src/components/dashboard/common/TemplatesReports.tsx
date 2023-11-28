import { useState, useEffect } from 'react';
import { TableHead } from '../helpers/renderTableHelper';
import { getTemplateReports, uploadReportsFile } from './common.service';
import { CustomUploadInput } from '../helpers/renderInputsHelper';
import { Status } from 'common/interfaces/ActionStatus';
import { useToast } from '../helpers/renderToastHelper';
import { AxiosError } from 'axios';

export const TemplatesReports = (): JSX.Element => {
    const [templatesReports, setTemplatesReports] = useState<any>(null);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const { handleShowToast } = useToast();

    const updateTemplatesReports = (): void => {
        getTemplateReports().then((response) => {
            setTemplatesReports(response);
        });
    };

    useEffect(() => {
        updateTemplatesReports();
    }, []);

    const handleFileUpload = (file: File) => {
        setIsDisabled(true);
        uploadReportsFile(file)
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
                            <TableHead columns={['id', 'Report template', 'Actions']} />
                            <tbody className='text-gray-600 fw-bold'>
                                <tr>
                                    <td>{JSON.stringify(templatesReports)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

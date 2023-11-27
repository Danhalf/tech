import { useState, useEffect } from 'react';
import { TableHead } from '../helpers/renderTableHelper';
import { getTemplateReports } from './common.service';
import { CustomUploadInput } from '../helpers/renderInputsHelper';

export const TemplatesReports = (): JSX.Element => {
    const [templatesReports, setTemplatesReports] = useState();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const updateTemplatesReports = (): void => {
        getTemplateReports().then((response) => {
            setTemplatesReports(response);
        });
    };

    useEffect(() => {
        updateTemplatesReports();
    }, []);

    return (
        <>
            <div className='card'>
                <div className='me-4 mt-4 ms-auto'>
                    <CustomUploadInput
                        currentValue={selectedFile}
                        id='reports-upload'
                        name='reports-pdf'
                        filetype='pdf'
                    />
                </div>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                            <TableHead columns={['id', 'Report template', 'Actions']} />
                            <tbody className='text-gray-600 fw-bold'>
                                {JSON.stringify(templatesReports)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

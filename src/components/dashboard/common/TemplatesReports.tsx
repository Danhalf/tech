import { useState, useEffect } from 'react';
import { TableHead } from '../helpers/renderTableHelper';
import { getTemplateReports } from './common.service';

export const TemplatesReports = (): JSX.Element => {
    const [templatesReports, setTemplatesReports] = useState();

    const updateTemplatesReports = (): void => {
        getTemplateReports().then((response) => {
            setTemplatesReports(response);
        });
    };

    useEffect(() => {
        updateTemplatesReports();
    });

    return (
        <>
            <div className='card'>
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

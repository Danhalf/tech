import { useState, useEffect } from 'react';
import { TableHead } from '../helpers/renderTableHelper';
import { getTemplatePrints } from './common.service';

export const TemplatesPrinted = (): JSX.Element => {
    const [templatesPrinted, setTemplatesPrinted] = useState();

    const updateTemplatesPrinted = (): void => {
        getTemplatePrints().then((response) => {
            setTemplatesPrinted(response);
        });
    };

    useEffect(() => {
        updateTemplatesPrinted();
    }, []);

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                            <TableHead columns={['id', 'Printed template', 'Actions']} />
                            <tbody className='text-gray-600 fw-bold'>
                                {JSON.stringify(templatesPrinted)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

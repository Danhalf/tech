import { useState, useEffect } from 'react';
import { getImportList } from './common.service';
import { TabDataWrapper } from '../helpers/helpers';

export const DataImport = (): JSX.Element => {
    const [dataImports, setDataImports] = useState();

    const updateDataImports = (): void => {
        getImportList().then((response) => {
            setDataImports(response);
        });
    };

    useEffect(() => {
        updateDataImports();
    }, []);

    return <TabDataWrapper data={JSON.stringify(dataImports, null, 2)} />;
};

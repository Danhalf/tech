import clsx from 'clsx';
import { Row } from 'react-table';
import { DataImportsRecord } from 'common/interfaces/DataImports';

type Props = {
    row: Row<DataImportsRecord>;
};

export const DataImportRow = ({ row }: Props) => {
    return (
        <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
            })}
        </tr>
    );
};

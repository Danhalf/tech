import clsx from 'clsx';
import { Row } from 'react-table';
import { TemplatesPrintedRecord } from 'common/interfaces/TemplatesPrintedData';

type Props = {
    row: Row<TemplatesPrintedRecord>;
};

export const PrintedRow = ({ row }: Props) => {
    return (
        <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
                return (
                    <td
                        {...cell.getCellProps()}
                        className={clsx({ 'min-w-100px': cell.column.id === 'actions' })}
                    >
                        {cell.column.id === 'actions' ? cell.render('Cell') : cell.render('Cell')}
                    </td>
                );
            })}
        </tr>
    );
};

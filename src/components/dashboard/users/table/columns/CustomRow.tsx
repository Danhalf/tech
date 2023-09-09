// @ts-nocheck
import clsx from 'clsx';
import { Row } from 'react-table';
import { User } from '../../core/_models';

type Props = {
    row: Row<User>;
};

export const CustomRow = ({ row }: Props) => {
    return (
        <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
                return (
                    <td
                        {...cell.getCellProps()}
                        className={clsx({ 'min-w-100px': cell.column.id === 'actions' })}
                    >
                        {cell.render('Cell')}
                    </td>
                );
            })}
        </tr>
    );
};

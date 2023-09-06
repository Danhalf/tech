import { WithChildren } from '_metronic/helpers';

export const UserTable = ({ children }: WithChildren): JSX.Element => (
    <div className='card-body'>
        <div className='table-responsive'>
            <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                {children}
            </table>
        </div>
    </div>
);

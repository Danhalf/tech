import { User } from 'common/interfaces/UserData';
import { Link } from 'react-router-dom';

export const UserLinkCell = ({ useruid, username }: User) => (
    <Link
        to={`/dashboard/user/${useruid}`}
        className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
    >
        {username}
    </Link>
);

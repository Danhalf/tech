import { Link } from 'react-router-dom';
import { User } from '../../types/Users.types';

export const UserLinkCell = ({ useruid, username }: User) => (
    <Link
        to={`${useruid}`}
        className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
    >
        {username}
    </Link>
);

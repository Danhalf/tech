import { Link, useNavigate } from 'react-router-dom';
import { LoginResponse, logout } from 'common/auth.service';

export function DashboardHeader() {
    const navigate = useNavigate();
    const signOut = () => {
        const user: LoginResponse = JSON.parse(localStorage.getItem('admss-admin-user') ?? '');
        if (user) {
            logout(user.useruid).then((response) => {
                if (response.status) {
                    navigate('/');
                    localStorage.removeItem('admss-admin-user');
                }
            });
        }
    };
    return (
        <header className='app-header'>
            <div className='container flex-lg-grow-1 d-flex align-items-stretch justify-content-between'>
                <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
                    <div className='app-header-menu app-header-mobile-drawer align-items-stretch'>
                        <div className='menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px 2 px-lg-0'>
                            <div className='menu-item me-lg-1'>
                                <Link
                                    className='menu-link py-3 text-hover-primary'
                                    to={'/dashboard'}
                                >
                                    <i className='ki-outline ki-gear fs-2 m-2'></i>
                                    <span className='menu-title'>Microservices</span>
                                </Link>
                            </div>
                            <div className='menu-item me-lg-1'>
                                <Link className='menu-link py-3 text-hover-primary' to={'users'}>
                                    <i className='ki-outline ki-user-tick fs-2 m-2'></i>
                                    <span className='menu-title'>Users</span>
                                </Link>
                            </div>
                            <div className='menu-item me-lg-1'>
                                <span
                                    onClick={() => signOut()}
                                    className='menu-link text-hover-primary'
                                >
                                    <i className='ki-outline ki-exit-right fs-2 m-2'></i>
                                    <span className='menu-title'>Log out</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

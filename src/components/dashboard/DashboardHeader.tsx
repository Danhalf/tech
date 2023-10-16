import { Link, useNavigate } from 'react-router-dom';
import { LoginResponse, logout } from 'common/auth.service';
import { CustomDropdown } from './helpers/renderDropdownHelper';

export function DashboardHeader() {
    const navigate = useNavigate();
    const { useruid, loginname }: LoginResponse = JSON.parse(
        localStorage.getItem('admss-admin-user') ?? ''
    );
    const signOut = () => {
        if (useruid) {
            logout(useruid).then((response) => {
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
                <div className='d-flex align-items-stretch justify-content-between flex-grow-1'>
                    <div className='app-header-menu d-flex align-items-stretch w-100'>
                        <div className='menu menu-rounded menu-column menu-row my-5 my-lg-0 align-items-stretch fw-semibold  px-lg-0 w-100'>
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
                                    <span className='menu-title w-0'>Users</span>
                                </Link>
                            </div>
                            <div className='menu-item me-lg-1 ms-auto'>
                                <CustomDropdown title={loginname}>
                                    <Link
                                        className='menu-link py-3 text-hover-primary'
                                        to={`/dashboard/user/${useruid}`}
                                    >
                                        <i className='ki-outline ki-user-tick fs-2 m-2'></i>
                                        <span className='menu-title'>{loginname}</span>
                                    </Link>
                                    <span
                                        onClick={() => signOut()}
                                        className='menu-link text-hover-primary'
                                    >
                                        <i className='ki-outline ki-exit-right fs-2 m-2'></i>
                                        <span className='menu-title'>Log out</span>
                                    </span>
                                </CustomDropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

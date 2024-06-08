import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import MenuItem from './MenuItem'
import UserMenu from './Menu/UserMenu'
import ModeratorMenu from './Menu/ModeratorMenu'
import AdminMenu from './Menu/AdminMenu'
import { FaHome } from 'react-icons/fa'

const Sidebar = () => {
    const { logOut } = useAuth();
    const [isActive, setActive] = useState(false)
    const [role] = useRole();
    const navigate = useNavigate('/');
    console.log(role);

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    const handleLogOut = async () => {
        try {
            await logOut();
            console.log('Logout successful');
            navigate('/login')
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='w-[300px]   mr-12 bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img
                                // className='hidden md:block'
                                src='https://i.ibb.co/K0GZfFK/Group-21.png'
                                alt='logo'
                                width='100'
                                height='100'
                            />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:static min-h-screen flex flex-col justify-between overflow-x-hidden bg-[#fafbff] w-80 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden  md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-[#e1e2fa] mx-auto'>
                            <Link to='/' >
                                <img
                                    // className='hidden md:block'
                                    src='https://i.ibb.co/K0GZfFK/Group-21.png'
                                    alt='logo'
                                    width='100'
                                    height='100'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>

                            {role === "user" && <UserMenu />}
                            {role === "moderator" && <ModeratorMenu />}
                            {role === "admin" && <AdminMenu />}
                            {/* <UserMenu />
                            <ModeratorMenu />
                            <AdminMenu /> */}
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />

                    {/* Profile Menu */}
                    <MenuItem label={'Home'} address={'/'} icon={FaHome} />
                    <MenuItem label={'Profile'} address={'/dashboard/profile'} icon={FcSettings} />
                    <button
                        onClick={handleLogOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar
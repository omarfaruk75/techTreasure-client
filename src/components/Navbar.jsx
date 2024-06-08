


import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Container from "./Shared/Container";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const menuItem = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>



        </>
    );

    return (
        <div className="static  w-full z-20 h-16 mb-2">
            <Container>
                <div className=' text-black shadow-lg shadow-slate-300 rounded-2xl '>
                    <div className="navbar  rounded-xl  z-30 ">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow text-black bg-white rounded-box w-52">
                                    {menuItem}
                                </ul>
                            </div>
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
                        <div className="navbar-center hidden lg:flex ">
                            <ul className="menu menu-horizontal px-1 ">
                                {menuItem}
                            </ul>
                        </div>
                        <div className="navbar-end">
                            {user ? (
                                <div className="dropdown dropdown-end">
                                    <button tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={toggleDropdown}>
                                        <div className="w-10 rounded-full">
                                            <img referrerPolicy="no-referrer" src={user.photoURL || "https://i.ibb.co/CWJcyPj/omar-faruk.jpg"} alt="User Avatar" />
                                        </div>
                                    </button>
                                    {dropdownVisible && (
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-white text-black rounded-box w-52">
                                            <li className="p-2">{user.displayName || "User"}</li>
                                            <Link
                                                to='/dashboard'
                                                className='px-4 text-center hover:bg-neutral-100 transition font-semibold cursor-pointer'
                                            >
                                                Dashboard
                                            </Link>
                                            <li>
                                                <button onClick={handleLogOut} className="btn btn-sm btn-ghost">Logout</button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="btn btn-sm btn-ghost">Login</button>
                                </Link>
                            )}
                        </div>
                    </div>


                </div>
            </Container>
        </div>
    );
};

export default Navbar;

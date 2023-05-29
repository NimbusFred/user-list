import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdownLayout from './ProfileDropdownLayout';
import Themeswitch from './Themeswitch';

export default function AuthNavbarLayout() {
    const [activeLink, setActiveLink] = useState(location.pathname);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };


    return (
        <nav>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
                <Link to="/" className="font-bold text-xl">
                    Můj web
                </Link>
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="text-gray-500 hover:text-white focus:outline-none focus:text-white ml-4"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path
                                className="heroicon-ui"
                                d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex">
                    <div className="flex items-center ml-6">
                        <Link
                            to="/"
                            className={`hover:text-gray-300 text-black px-3 py-2 rounded-md text-sm font-medium ${activeLink === '/' && 'bg-white rounded hover:text-zinc-600'
                                }`}
                            onClick={() => handleLinkClick('/')}
                        >
                            Overview
                        </Link>
                        <Link
                            to="/users"
                            className={`hover:text-gray-300 text-black px-3 py-2 rounded-md text-sm font-medium ${activeLink === '/users' && 'bg-white rounded hover:text-zinc-600'
                                }`}
                            onClick={() => handleLinkClick('/users')}
                        >
                            User List
                        </Link>
                        <Link
                            to="/users/new"
                            className={`hover:text-gray-300 text-black px-3 py-2 rounded-md text-sm font-medium ${activeLink === '/users/new' && 'bg-white rounded hover:text-zinc-600'
                                }`}
                            onClick={() => handleLinkClick('/users/new')}
                        >
                            Create New User
                        </Link>
                        <div className="ml-6">
                            <ProfileDropdownLayout />
                        </div>
                        <div className="ml-4">
                            <Themeswitch />
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className={`px-2 pt-2 pb-3 ${isMenuOpen ? 'block' : 'hidden'}`} style={{ textAlign: 'right' }}>
                    <div className=''>
                        <Link to="/" className={`block py-2 px-4 hover:text-gray-300 ${activeLink === '/' && 'text-red-500'}`} onClick={() => handleLinkClick('/')}>
                            Overview
                        </Link>

                        <Link to="/users" className={`block  py-2 px-4 hover:text-gray-300 ${activeLink === '/users' && 'text-red-500'
                            }`} onClick={() => handleLinkClick('/users')}
                        >
                            User List
                        </Link>
                        <Link
                            to="/users/new"
                            className={`block py-2 px-4 hover:text-gray-300 ${activeLink === '/users/new' && 'text-red-500'
                                }`}
                            onClick={() => handleLinkClick('/users/new')}
                        >
                            Create New User
                        </Link>
                    </div>
                    <Themeswitch />
                    <ProfileDropdownLayout />
                </div>
            </div>
        </nav>
    );
}
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Themeswitch from './Themeswitch';

export default function UnauthNavbarLayout() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <nav className='py-2 md:py-4'>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link to="/" className="font-bold text-xl">
                    Můj web
                </Link>

                <div className="flex md:hidden">
                    <button
                        type="button"
                        className='hover:text-white focus:outline-none focus:text-white ml-auto md:hidden'
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                        </svg>
                    </button>
                </div>

                <div className="hidden md:flex md:items-center">
                    <Link to="/login" className={`py-2 px-4 text-black hover:text-gray-300 ${activeLink === '/login' && 'bg-white rounded hover:text-zinc-600'}`} onClick={() => handleLinkClick('/login')}>
                        Přihlášení
                    </Link>
                    <Link to="/register" className={`py-2 px-4 ml-4 text-black hover:text-gray-300 ${activeLink === '/register' && 'bg-white rounded hover:text-zinc-600'}`} onClick={() => handleLinkClick('/register')}>
                        Registrace
                    </Link>
                    <div className="ml-4">
                        <Themeswitch />
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className={`px-2 pt-2 pb-3 ${isMenuOpen ? 'block' : 'hidden'}`} style={{ textAlign: 'right' }}>
                    <Link to="/login" className={`block py-2 px-4 hover:text-gray-300 ${activeLink === '/login' && 'text-red-500'}`} onClick={() => handleLinkClick('/login')}>
                        Přihlášení
                    </Link>
                    <Link to="/register" className={`block py-2 px-4 hover:text-gray-300 ${activeLink === '/register' && 'text-red-500'}`} onClick={() => handleLinkClick('/register')}>
                        Registrace
                    </Link>

                    <Themeswitch />
                </div>
            </div>
        </nav>
    );
}

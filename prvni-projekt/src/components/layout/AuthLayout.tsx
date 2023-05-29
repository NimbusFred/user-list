import React, { useContext, ReactNode } from 'react';
import AuthNavbarLayout from './Navbar/AuthNavbarLayout';
import { ModeContext } from '../../context/ThemeProvider';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const { theme } = useContext(ModeContext);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'bg-gray-400 text-black' :
      theme === 'dark' ? 'bg-gray-900 text-white' :
        theme === 'red' ? 'bg-red-800' :
          'bg-gray-800'
      }`}>
      <AuthNavbarLayout />
      <div className={`${theme === 'light' ? 'bg-gray-100 text-black' :
        theme === 'dark' ? 'bg-gray-700 text-white' :
          theme === 'red' ? 'bg-red-100' :
            'bg-gray-800'
        }`} >
        {children}
      </div>
    </div>
  );
}

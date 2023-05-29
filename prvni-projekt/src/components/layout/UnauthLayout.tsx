/**
 * Komponenta reprezentuje layout pro nepřihlášenou část aplikace
 */
import UnauthNavbarhLayout from './Navbar/UnauthNavbarhLayout';
import React, { ReactNode, useContext } from 'react';
import { ModeContext } from '../../context/ThemeProvider';


interface InauthLayoutProps {
  children: ReactNode;
}

export default function UnauthLayout({ children }: InauthLayoutProps) {
  const { theme } = useContext(ModeContext);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'bg-gray-400 text-black' :
      theme === 'dark' ? 'bg-gray-900 text-white' :
        theme === 'red' ? 'bg-red-800' :
          'bg-gray-800'
      }`}>
      <UnauthNavbarhLayout />
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

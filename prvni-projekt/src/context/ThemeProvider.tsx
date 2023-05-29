import React, { useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface IModeContext {
    theme: string;
    toggleTheme: (nextTheme: string) => void;
}

export const ModeContext = React.createContext<IModeContext>({
    theme: 'light',
    toggleTheme: () => {
        console.log('dd');
    },
});

interface IDarkModeProviderProps {
    children: ReactNode;
}

export default function ModeProvider(props: IDarkModeProviderProps) {
    const [theme, setTheme] = useState(Cookies.get('theme') || 'light');

    const toggleTheme = (nextTheme: string) => {
        Cookies.set('theme', nextTheme);
        setTheme(nextTheme);
    };

    const contextValue: IModeContext = {
        theme,
        toggleTheme,
    };

    return (
        <div>
            <ModeContext.Provider value={contextValue}>
                {props.children}
            </ModeContext.Provider>
        </div>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function ErorrpageScreen() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl font-medium mb-8">Stránka nebyla nalezena</p>
            <Link to={'/'}>
                <button className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full text-white font-semibold px-8 py-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none mx-auto">
                    Zpět na úvodní stránku
                </button>
            </Link>
        </div >
    )
}

// Toto je komponenta pro 404 chybovou stránku
// Využívá se při pokusu o přístup na neexistující stránku
// Obsahuje nadpis s kódem chyby, textové upozornění a tlačítko pro návrat na úvodní stránku.
// Používá styly z frameworku Tailwind.
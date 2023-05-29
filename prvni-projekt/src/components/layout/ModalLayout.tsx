import React, { ReactElement, ReactNode } from 'react';
import 'tailwindcss/tailwind.css';

interface Props {
    message: string;
    confirmText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function Modal({ message, confirmText, onConfirm, onCancel }: Props): ReactElement {
    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
            <div className='fixed inset-0 bg-gray-500 opacity-50'>{' '}</div>
            <div className='relative bg-white w-1/2 rounded-lg shadow-lg'>
                <div className='p-8'>
                    <p className='text-lg'>{message}</p>
                </div>
                <div className='p-4 flex justify-end'>
                    <button
                        className='px-4 py-2 bg-red-500 text-white rounded mr-4'
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                    <button
                        className='px-4 py-2 bg-gray-300 text-gray-800 rounded'
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

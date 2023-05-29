import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuth } from '../../../context/AuthProvider';


export default function ProfileDropdownLayout() {
    const { user } = useAuth();
    const { logout } = useAuth();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Profile
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-gradient-to-t from-gray-800 to-gray-700 rounded-md shadow-lg animate-slide-in">
                    <div className="py-1">
                        <Menu.Item>
                            <div className="p-4">
                                <span className="block font-bold text-white mb-2">Přihlášen jako:</span>
                                <span className="block text-gray-200">{user?.username}</span>
                            </div>
                        </Menu.Item>
                        <Menu.Item>
                            <div className="p-4">
                                <span className="block font-bold text-white mb-2">Role:</span>
                                <span className="block text-gray-200">{user?.role}</span>
                            </div>
                        </Menu.Item>
                        <Menu.Item>
                            <div className="p-4">
                                <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full border border-gray-400 transition duration-300 ease-in-out" onClick={logout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L5.586 11H15a1 1 0 010 2H5a1 1 0 01-.707-.293z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M10 4a1 1 0 011 1v8a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Log out
                                </button>
                            </div>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}


import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {
    Link,
    useNavigate
} from "react-router-dom";
import ToggleButton from './ToggleButton';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const Navigate = useNavigate()
    const [navigation, setNavigation] = useState([
        { name: 'Home', to: '/', current: true },
        { name: 'Favourites', to: '/favourites', current: false },
    ])
    const handleLogOut = () => {
        if (localStorage.getItem('authToken')) {
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            toast('Logged out successfully')
            Navigate('/')
        } else {
            Navigate('LogIn')
        }
        handleClickItem('Home')
    }
    const handleClickItem = (current) => {
        setNavigation(navigation.map((item) => {
            if (item.name === current) {
                return {
                    ...item,
                    current: true
                }
            } else {
                return {
                    ...item,
                    current: false
                }
            }
        }))
    }
    return (
        <div className='sticky top-0 mx-12 lg:mx-16 xl:mx-20 '>
            <Toaster position="top-center"
                reverseOrder={false}
                gutter={8} />
            <Disclosure as="nav" className="">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl ">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 dark:text-white items-center">
                                        <span className='text-3xl font-semibold'>NewsStore
                                        </span>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    onClick={(e)=>{
                                                        handleClickItem(e.target.textContent)}}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium',
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <ToggleButton />
                                <div className='flex gap-2'>
                                    <div onClick={handleLogOut} className='cursor-pointer'>
                                        <span className='dark:hover:border-gray-700 dark:border-black border-gray-400 border-2 rounded-md px-3 py-2 text-sm font-medium hover:border-2 hover:border-black' >{!localStorage.getItem('authToken') ? "LogIn/SignUp" : "Log out"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>

    )
}

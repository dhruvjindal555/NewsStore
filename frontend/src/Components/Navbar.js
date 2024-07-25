import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import NewsContext from '../contexts/favourites/NewsContext';
import {
    Link,
    useNavigate
} from "react-router-dom";
import ToggleButton from './ToggleButton';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const {
        search,
        setSearch,
        fetchQuery,
    } = useContext(NewsContext)
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
    const handleSearch = () => {

        if (search === "") {
            return toast("Try writing a search term")
        }
        fetchQuery(search)
    }

    const handleClickItem = (current) => {
        if(current==='Favourites'&&!window.localStorage.getItem('authToken')){
            window.location.href='/'
            toast("Please login to access your favorites")
        }
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
        <div className='sticky top-0 mx-2 sm:mx-8 md:mx-12  lg:mx-16 xl:mx-20 '>
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
                                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-black dark:text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                                    <a href='/' className="flex flex-shrink-0 dark:text-white items-center">
                                        <span className='text-3xl font-semibold'>NewsStore
                                        </span>
                                    </a>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    onClick={(e) => {
                                                        handleClickItem(e.target.textContent)
                                                    }}
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
                                        <span className='dark:hover:border-gray-700 dark:border-black border-gray-400 border-2 rounded-md sm:px-3 px-1.5 sm:py-2 py-1 text-sm font-medium hover:border-2 hover:border-black' >{!localStorage.getItem('authToken') ? "LogIn/SignUp" : "Log out"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}

                                        to={item.to}
                                        onClick={(e) => {
                                            handleClickItem(e.target.textContent)
                                        }}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-black hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium',
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="flex rounded-md  border-2 border-black overflow-hidden font-[sans-serif]">
                                    <input type="text" placeholder="Search Something..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                console.log("Key pressed");
                                                handleSearch()
                                            }
                                        }}
                                        className="outline-none bg-gray-200 text-gray-600 w-full text-sm px-4 py-3" />
                                    <button
                                        onClick={handleSearch} type='button' className="flex items-center justify-center bg-[#000000] px-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                                            <path
                                                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure>
        </div>

    )
}

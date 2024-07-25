import React, { useState, useEffect, useContext } from 'react';
import News from './News';
import Spinner from './Spinner';
import toast, { Toaster } from 'react-hot-toast';
import Pagination from './Pagination';
import NewsContext from '../contexts/favourites/NewsContext';

function LatestNews() {
    // Destructuring state and functions from NewsContext
    const {
        page,
        category,
        setCategory,
        search,
        setSearch,
        totalResults,
        loading,
        fetchArticles,
        fetchQuery,
    } = useContext(NewsContext);

    // Function to handle category selection and update category state
    const handleCategory = ((category = "", current = false) => {
        setCategories(categories.map((item) => {
            if (item.category === category) {
                return {
                    ...item,
                    current: current
                }
            } else {
                return {
                    ...item,
                    current: false
                }
            }
        }));
    });

    // Initial categories state
    const [categories, setCategories] = useState([
        { category: "General", current: true },
        { category: "Business", current: false },
        { category: "Entertainment", current: false },
        { category: "Health", current: false },
        { category: "Science", current: false },
        { category: "Sports", current: false },
        { category: "Technology", current: false }
    ]);

    // Function to handle search input and fetch articles based on the search term
    const handleSearch = () => {
        handleCategory();
        if (search === "") {
            return toast("Try writing a search term");
        }
        fetchQuery(search);
    };

    // useEffect hook to fetch articles on category or page change
    useEffect(() => {
        fetchArticles();
        // eslint-disable-next-line
    }, [category, page]);

    return (
        <>
            <div className='mx-3 sm:mx-8 md:mx-12 xl:mx-28'>
                <div className='my-3 sm:my-8'>
                    <h1 className='text-3xl sm:text-5xl font-semibold'>
                        Latest news - {search ? String(search.slice(0, 1)).toLocaleUpperCase() + search.slice(1) : category}
                    </h1>
                </div>
                <div className='flex justify-between my-5 items-center'>
                    {/* Dropdown for categories on small screens */}
                    <div className="lg:hidden">
                        <select
                            id="countries"
                            className="bg-gray-50 border px-2 sm:px-4 sm:py-3 py-1.5 bg-opacity-50 border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                setCategory(e.target.value);
                                handleCategory(e.target.value, true);
                            }}>
                            {
                                categories.map((category, index) => {
                                    return (
                                        <option key={index} defaultChecked={category.current}>
                                            {category.category}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {/* Categories displayed as buttons on larger screens */}
                    <div className='lg:flex gap-2 flex-wrap hidden'>
                        {
                            categories.map((category, index) => {
                                return (
                                    <div key={index} onClick={(e) => {
                                        setCategory(e.target.textContent);
                                        handleCategory(e.target.textContent, true);
                                    }}
                                        className={category.current ? "h-fit rounded-xl border-2 border-red-600 active:border-red-500 px-3 py-1 flex items-center cursor-pointer hover:border-red-500 dark:text-white dark:border-white" : 'h-fit rounded-xl border-2 border-black active:border-gray-500 px-3 py-1 flex items-center cursor-pointer hover:border-gray-500 dark:text-white dark:border-gray-800'}>
                                        <span>
                                            {category.category}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* Search input */}
                    <div className="sm:flex rounded-md hidden border-2 border-black overflow-hidden max-w-md font-[sans-serif]">
                        <input type="text" placeholder="Search Something..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    console.log("Key pressed");
                                    handleSearch();
                                }
                            }}
                            className="outline-none bg-gray-200 text-gray-600 text-sm px-4 py-3" />
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
                {
                    loading && <Spinner />
                }
                {
                    !loading &&
                    <>
                        <News />
                        <Pagination totalResults={totalResults} />
                    </>
                }
            </div>
        </>
    );
}

export default LatestNews;

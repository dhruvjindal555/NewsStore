import React, { useContext } from 'react';
import NewsContext from '../contexts/favourites/NewsContext';

function Pagination({ totalResults }) {
    const { page, setPage, search, fetchArticles, fetchQuery } = useContext(NewsContext); // Extracting context values
    const totalPages = Math.ceil(totalResults / 20)
    // Function to handle previous button click
    const handlePrevious = () => {
        // console.log(page-1);
        setPage(page - 1);
        if (search === "") {
            fetchArticles();
        } else {
            fetchQuery();
        }
    };

    // Function to handle next button click
    const handleNext = () => {
        // console.log(totalPages);
        // console.log(page+1);
        setPage(page + 1);
        if (search === "") {
            fetchArticles();
        } else {
            console.log("Search", search);
            fetchQuery();
        }
    };

    return (
        <div className="flex items-center justify-between bg-transparent px-4 py-3 sm:px-6">
            <div className="sm:flex sm:flex-1 sm:justify-between hidden  ">
                <button
                    disabled={page === 1}
                    onClick={handlePrevious}
                    className="relative inline-flex items-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    disabled={page === totalPages}
                    onClick={handleNext}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="sm:hidden flex flex-1 items-center justify-between">
                <button
                   disabled={page === 1}
                    onClick={handlePrevious}
                    className="border-black border-2 mx-2 relative inline-flex items-center rounded-l-md px-2 py-2 text-black dark:hover:text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                </button>

                <button
                    disabled={page === totalPages}
                    onClick={handleNext}
                    className="border-black mx-2 border-2 relative inline-flex items-center rounded-r-md px-2 py-2 text-black dark:hover:text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Pagination;

import React,{useContext, useState} from 'react'
import NewsContext from '../contexts/favourites/NewsContext'

function Pagination() {
    const {totalResults ,handlePrevClick,handleNextClick}= useContext(NewsContext)
    const [pageStart, setPageStart] = useState(1)
    const [pageEnd, setPageEnd] = useState(20)

    const handlePrevious = () => {
        handlePrevClick()
        setPageStart(pageStart - 20)
        setPageEnd(pageEnd - 20)
        console.log(pageStart,pageEnd);
    }
    const handleNext = () => {
        console.log(pageStart,pageEnd);
        handleNextClick()
        setPageStart(pageStart+20)    
        setPageEnd( pageEnd+20)
        if(pageEnd >totalResults) {
            setPageEnd(totalResults)
        }
        console.log(pageStart,pageEnd);
    }

    return (
        <div className="flex items-center justify-between   bg-transparent px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <div  className="relative inline-flex items-center rounded-md border  bg-tranparent px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</div>
                <div  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-gray-100">
                        Showing
                        <span className="font-medium px-1">{pageStart}</span>
                        to
                        <span className="font-medium px-1">{pageEnd}</span>
                        of
                        <span className="font-medium px-1">{totalResults}</span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm " aria-label="Pagination">
                        <button disabled={pageStart===1} onClick={handlePrevious}  className="border-black border-2 mx-2 relative inline-flex items-center rounded-l-md px-2 py-2 text-black dark:hover:text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                        
                        <button disabled={pageEnd===totalResults} onClick={handleNext}  className=" border-black mx-2 border-2 relative inline-flex items-center rounded-r-md px-2 py-2 text-black  dark:hover:text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>

    )
}

export default Pagination
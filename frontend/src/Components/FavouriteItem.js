import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

function FavouriteItem({ article, getFavourite }) {
    const removeFromFavourites = async () => {
        const url = `http://localhost:8888/favourites/remove/${article._id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authToken": localStorage.getItem('authToken')
            },

        })
        const data = await response.json()
        if (data.success) {
            toast("Article removed")
            getFavourite()
        } else {
            toast(data.message)
        }
    }
    const heading = article.title
    const description = article.description

    const onDate = new Date(Date.parse(article.publishedAt)).toDateString()
    return (
        <>
            <div className=' relative' key={article.url}>
                <Toaster position="top-center"
                    reverseOrder={false}
                    gutter={8} />
                <div className="bg-transparent border border-gray-400 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
                    <div onClick={removeFromFavourites} className='border-2 absolute top-2 right-3 p-1 px-2 bg-white rounded-full hover:border-gray-500 hover:border-2 cursor-pointer'>
                        <i className="fa-solid fa-xmark fa-xl " style={{ "color": "#d42b2b" }}></i>
                    </div>
                    <div >
                        <img className="rounded-t-lg aspect-video h-48 w-full " src={article.urlToImage ? article.urlToImage : "noImageBlack.png"} alt="" />
                    </div>
                    <div className="p-5 h-96  md:h-screen-55 hidden sm:flex flex-col justify-between">
                        <a href="/">
                            <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{
                                heading.slice(0, 60) + "..."}</h5>
                        </a>
                        <div>
                            <p className=" font-normal text-gray-700 dark:text-gray-400">{description ? description.slice(0, 90) + "..." : "No description available"}</p>
                        </div>
                        <div className='text-sm text-gray-500 dark:text-gray-400'>
                            <p>On {onDate}</p>
                            <p>Source :{article.source.name}</p>
                            <p>Author :{article.author}</p>
                        </div>
                        <a href={article.url} target='blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                    <a href={article.url} className="p-3 sm:p-5 h-1/2 sm:hidden flex flex-col justify-between">
                        <div    >
                            <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{
                                heading.slice(0, 20) + "..."}</h5>
                        </div>
                        <div className='my-1'>
                            <p className=" font-normal text-gray-700 dark:text-gray-400">{description ? description.slice(0, 90) + "..." : "No description available"}</p>
                        </div>
                        <div className='my-1 text-sm text-gray-500 dark:text-gray-400' >
                            <p className=''>On {onDate}</p>
                            <p>Source : {article.source.name}</p>
                            <p>Author : {article.author}</p>
                        </div>
                        
                    </a>
                </div>
            </div>

        </>
    )
}

export default FavouriteItem
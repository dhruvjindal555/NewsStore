import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

function NewsItem({ article }) {
    const addToFavourites = async () => {
        // Check if user is authenticated
        if (!localStorage.getItem('authToken')) {
            return toast("Try logging in first")
        }

        // Define the URL for adding favourites
        const url = `http://localhost:8888/favourites/add`

        // Send POST request to add the article to favourites
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authToken": localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                source: article.source,
                author: article.author,
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: article.publishedAt,
                content: article.content
            })
        })

        const data = await response.json()
        // Show appropriate toast message based on response
        if (data.success) {
            toast("Article added to favourites")
        } else {
            toast(data.message)
        }
    }

    const heading = article.title
    const description = article.description
    const onDate = new Date(Date.parse(article.publishedAt)).toDateString()

    return (
        <>
            <div className='relative'>
                <div className="border border-gray-400 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700">
                    {/* Heart icon for adding to favourites */}
                    <div onClick={addToFavourites} className='border-2 absolute top-2 right-3 p-1 bg-white rounded-full hover:border-gray-500 hover:border-2 cursor-pointer'>
                        <i className="fa-regular fa-heart fa-xl" style={{ "color": "#d42b2b" }}></i>
                    </div>
                    {/* Article image */}
                    <div>
                        <img className="rounded-t-lg aspect-video object-cover h-40 sm:h-48 w-full" src={article.urlToImage ? article.urlToImage : "noImageBlack.png"} alt="" />
                    </div>
                    {/* Article details for larger screens */}
                    <div className="p-5 h-96 md:h-screen-55 hidden sm:flex flex-col justify-between">
                        <a href={article.url}>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {heading.slice(0, 60) + "..."}
                            </h5>
                        </a>
                        <div>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {description ? description.slice(0, 90) + "..." : "No description available"}
                            </p>
                        </div>
                        <div className='text-sm text-gray-500 dark:text-gray-400'>
                            <p>On {onDate}</p>
                            <p>Source: {article.source.name}</p>
                            <p>Author: {article.author}</p>
                        </div>
                        <a href={article.url} target='_blank' className="flex justify-between items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>
                    {/* Article details for smaller screens */}
                    <a href={article.url} className="p-3 sm:p-5 h-1/2 sm:hidden flex flex-col justify-between">
                        <div>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {heading.slice(0, 20) + "..."}
                            </h5>
                        </div>
                        <div className='my-1'>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {description ? description.slice(0, 90) + "..." : "No description available"}
                            </p>
                        </div>
                        <div className='my-1 text-sm text-gray-500 dark:text-gray-400'>
                            <p>On {onDate}</p>
                            <p>Source: {article.source.name}</p>
                            <p>Author: {article.author}</p>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default NewsItem

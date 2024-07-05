import React from 'react'

function FavouriteItem({ article ,getFavourite}) {
    const removeFromFavourites=async ()=>{
        const url = `http://localhost:8888/favourites/remove/${article._id}`
        const response = await fetch(url,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authToken":localStorage.getItem('authToken')
            },
            
        })
        const data = await response.json()
        if(data.success){
            alert("Article removed")
            getFavourite()
        }else{
            alert(data.message)
        }
    }
    const heading = article.title
    const headingArray = heading.split(' ')

    // const today = Date.now()
    // const onDate =new Date(today - new Date(Date.parse(article.publishedAt))).getHours()
    const onDate = new Date(Date.parse(article.publishedAt)).toDateString()
    return (
        <>
            <div className='light '>
                
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="/">
                        <img className="rounded-t-lg aspect-video h-48" src={article.urlToImage ? article.urlToImage : "noImage.jpg"} alt="" />
                    </a>
                    <div className="p-5">
                        <a href="/">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{
                                headingArray.map((word, index) => {
                                    if (index <= 10) {
                                        return word
                                    }
                                    else {
                                        return ""
                                    }
                                }).join(' ') + "..."}</h5>
                        </a>
                        <div>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{article.description}</p>
                            <p>On {onDate}</p>
                        </div>
                        <div>
                            <p>Source :{article.source.name}</p>
                            <p>Author :{article.author}</p>
                        </div>
                        <a href={article.url} target='blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                        <div onClick={removeFromFavourites} target='blank' className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Remove from favourites
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default FavouriteItem
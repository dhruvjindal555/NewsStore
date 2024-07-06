import React, { useState, useEffect } from 'react'
import FavouriteItem from './FavouriteItem'
import toast, { Toaster } from 'react-hot-toast';
import Results from './Results';

function Favourites() {
    const [articles, setArticles] = useState([])
    const getFavourite = async () => {
        if (!localStorage.getItem('authToken')) {
            return toast("Please login to view your favourites")
        }
        const url = `http://localhost:8888/favourites`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authToken": localStorage.getItem('authToken')
            }
        })
        const data = await response.json()
        if (data.success) {
            setArticles(data.articles)
            // toast("Articles fetched successfully")
            console.log(data.articles)
        } else {
            console.log(data.message)
        }
    }
    useEffect(() => {
        getFavourite()
    }, [])



    return (
        <div className='mx-28'>
            <Toaster position="top-center"
                reverseOrder={false}
                gutter={8} />
            <div className='my-8'>
                <h1 className='text-5xl font-semibold'>Favourites</h1>
            </div>
            <div>
                <Results totalResults={articles.length}/>
                <div className='grid gap-3 grid-cols-4 gap-y-5'>
                    {articles ? articles.map((article) => {
                        return (
                            <FavouriteItem key={article.url} article={article} getFavourite={getFavourite} />
                        )
                    }) : "ARTICLES NOT AVAILABLE"}
                </div>
            </div>
        </div>
    )
}

export default Favourites
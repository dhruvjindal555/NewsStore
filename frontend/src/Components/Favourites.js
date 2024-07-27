import React, { useState, useEffect } from 'react';
import FavouriteItem from './FavouriteItem';
import Spinner from './Spinner';

function Favourites() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true)
    // Function to fetch favourite articles from the server
    const getFavourite = async () => {
        try {
            if (!localStorage.getItem('authToken')) {
                console.log("Please login to view your favourites");
                return;
            }
            const url = `https://cantilever-task-2.onrender.com/favourites`;
            setLoading(true)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "authToken": localStorage.getItem('authToken')
                }
            });
            const data = await response.json();
            setLoading(false)
            if (data.success) {
                setArticles(data.articles); // Update state with fetched articles
                console.log("Favourite articles fetched successfully")
                console.log(data.articles);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error("An error occurred while fetching the favourites: " + error.message);
            setLoading(false)
            setArticles([])
            console.log("Favourites fetched failed")
            console.log(error);
        }
    };

    // useEffect hook to fetch favourite articles on component mount
    useEffect(() => {
        getFavourite();
    }, []);

    return (
        <div className='mx-3 sm:mx-8 md:mx-12 xl:mx-28 '>
            <div className='my-8'>
                <h1 className='text-5xl font-semibold'>Favourites</h1>
            </div>
            <div>
                <div className='sm:grid sm:gap-3 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-y-5 flex flex-col gap-1 pb-10'>
                    {articles.length > 0 ? articles.map((article) => {
                        return (
                            <FavouriteItem key={article.url} article={article} getFavourite={getFavourite} />
                        );
                    }) : (loading ?
                        <div className='w-full mx-auto  xl:col-span-4  lg:col-span-3 col-span-2 '>
                            <Spinner />
                        </div>
                        : "ARTICLES NOT AVAILABLE")}
                </div>
            </div>
        </div>
    );
}

export default Favourites;

import React, { useState, useEffect } from 'react';
import FavouriteItem from './FavouriteItem';
import toast, { Toaster } from 'react-hot-toast';
import Pagination from './Pagination';

function Favourites() {
    const [articles, setArticles] = useState([]);

    // Function to fetch favourite articles from the server
    const getFavourite = async () => {
        if (!localStorage.getItem('authToken')) {
            console.log("Please login to view your favourites");
            return;
        }
        const url = `http://localhost:8888/favourites`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authToken": localStorage.getItem('authToken')
            }
        });
        const data = await response.json();
        if (data.success) {
            setArticles(data.articles); // Update state with fetched articles
            // toast("Articles fetched successfully")
            console.log(data.articles);
        } else {
            console.log(data.message);
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
                <div className='sm:grid sm:gap-3 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-y-5 flex flex-col gap-1'>
                    {articles.length > 0 ? articles.map((article) => {
                        return (
                            <FavouriteItem key={article.url} article={article} getFavourite={getFavourite} />
                        );
                    }) : "ARTICLES NOT AVAILABLE"}
                </div>
                <Pagination totalResults={articles.length} />
            </div>
        </div>
    );
}

export default Favourites;

import React, { useState,useEffect } from 'react'
import FavouriteItem from './FavouriteItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Favourites() {
    const [articles, setArticles] = useState([])
    const getFavourite = async () => {
        if (!localStorage.getItem('authToken')) {
            toast("Please login to view your favourites")
            return
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
            toast("Articles fetched successfully")
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
            <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition="Bounce"/>
                    <ToastContainer />
            <div className='my-8'>
                <h1 className='text-5xl font-semibold'>Favourites</h1>
            </div>
            <div>
                <div className='grid gap-3 grid-cols-4'>
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
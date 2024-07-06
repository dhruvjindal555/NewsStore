import React, { useContext } from 'react'
import NewsItem from './NewsItem'
import NewsContext from '../contexts/favourites/NewsContext'

function News() {
    const {articles}= useContext(NewsContext)
    return (
        <div>
            <div className='grid gap-3 grid-cols-4 gap-y-5'>
                {articles?articles.map((article) => {
                    return (
                        <NewsItem key={article.url} article={article}/>
                    )
                }):"ARTICLES NOT AVAILABLE"}
            </div>
        </div>
    )
}

export default News
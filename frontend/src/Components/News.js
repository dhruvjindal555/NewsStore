import React, { useContext } from 'react'
import NewsItem from './NewsItem'
import NewsContext from '../contexts/favourites/NewsContext'

function News() {
    // Use useContext hook to get articles from NewsContext
    const { articles } = useContext(NewsContext)
    
    return (
        <div>
            <div className='sm:grid sm:gap-3 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-y-5 flex flex-col gap-1'>
                {articles.length > 0 ? 
                    // Map over articles and render a NewsItem for each article
                    articles.map((article) => {
                        return (
                            <NewsItem key={article.url} article={article} />
                        )
                    }) 
                    : "ARTICLES NOT AVAILABLE"
                }
            </div>
        </div>
    )
}

export default News

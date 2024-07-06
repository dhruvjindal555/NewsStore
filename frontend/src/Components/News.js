import React from 'react'
import NewsItem from './NewsItem'

function News({articles}) {
    
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
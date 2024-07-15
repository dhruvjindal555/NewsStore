import React, { useState } from 'react'
import FavouriteContext from './NewsContext'

function NewsState(props) {
    
    const base_url = "https://newsapi.org/v2/"
    const apiKey = process.env.REACT_APP_API_KEY
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(1)
    const [category, setCategory] = useState("General")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const fetchArticles = async () => {
        let url = base_url+`top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=20`
        setLoading(true)
        setSearch("")
        const response = await fetch(url)
        const parsedData = await response.json()
        if (!parsedData.articles) {
            console.log(parsedData);
        }
        console.log(url);
        setTotalResults(parsedData.totalResults)
        console.log(parsedData.articles)
        setArticles(parsedData.articles)
        setLoading(false)
    }
    const fetchQuery = async () => {
        setCategory("General")
        let url = base_url+`everything?&q=${search}&apiKey=${apiKey}&page=${page}&pageSize=20`
        const response = await fetch(url)
        const parsedData = await response.json()
        if (!parsedData.articles) {
            console.log(parsedData);
        }
        console.log(url);
        setTotalResults(parsedData.totalResults)
        console.log(parsedData.articles)
        setArticles(parsedData.articles)
    }
    return (
        <FavouriteContext.Provider value={{
            articles, 
            page, 
            setPage,
            setCategory,
            setSearch,
            totalResults,
            category,
            search,
            loading,
            fetchArticles,
            fetchQuery,
        }} >
            {props.children}
        </FavouriteContext.Provider>
    )
}

export default NewsState
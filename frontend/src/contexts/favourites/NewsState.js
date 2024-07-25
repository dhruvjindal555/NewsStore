import React, { useState } from 'react'
import FavouriteContext from './NewsContext'

function NewsState(props) {

    // const base_url = "https://newsapi.org/v2/"
    // const apiKey = process.env.REACT_APP_API_KEY
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(1)
    const [category, setCategory] = useState("General")
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const fetchArticles = async () => {
        // let url = base_url+`top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=20`
        let url = `http://localhost:8888/server/fetchArticles/${category}/${page}`
        setLoading(true)
        setSearch("")
        const response = await fetch(url)
        const parsedData = await response.json()
        setLoading(false)
        if (parsedData.success) {
            if (!parsedData.data.articles) {
                console.log(parsedData);
            }
            console.log(url);
            setTotalResults(parsedData.data.totalResults)
            console.log(parsedData.data.articles)
            setArticles(parsedData.data.articles)
        } else {
            console.log(parsedData.message)
            console.log(parsedData.error)
            setArticles([])
            setTotalResults(0)
        }
    }
    const fetchQuery = async () => {
        setCategory("General")
        let url = `http://localhost:8888/server/fetchQuery/${search}/${page}`
        // let url = base_url+`everything?&q=${search}&apiKey=${apiKey}&page=${page}&pageSize=20`
        setLoading(true)
        const response = await fetch(url)
        const parsedData = await response.json()
        setLoading(false)
        if (parsedData.success) {
            if (!parsedData.data.articles) {
                console.log(parsedData);
            }
            console.log(url);
            setTotalResults(parsedData.data.totalResults)
            console.log(parsedData.data.articles)
            setArticles(parsedData.data.articles)
        } else {
            console.log(parsedData.message)
            console.log(parsedData.error)
            setArticles([])
            setTotalResults(0)
        }
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
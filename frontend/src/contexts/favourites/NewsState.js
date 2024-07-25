import React, { useState } from 'react'
import FavouriteContext from './NewsContext'

function NewsState(props) {

    // const base_url = "https://newsapi.org/v2/"
    // const apiKey = process.env.REACT_APP_API_KEY
    
    // State to store the list of articles
    const [articles, setArticles] =useState([])

    // State to store the current page number for pagination
    const [page, setPage] = useState(1)

    // State to store the total number of results
    const [totalResults, setTotalResults] = useState(1)

    // State to store the current category for fetching articles
    const [category, setCategory] = useState("General")

    // State to store the search query
    const [search, setSearch] = useState("")

    // State to manage the loading state
    const [loading, setLoading] = useState(false)

    // Function to fetch articles based on category and page
    const fetchArticles = async () => {
        // let url = base_url+`top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=20`
        let url = `https://cantilever-task-2.onrender.com/server/fetchArticles/${category}/${page}`
        setLoading(true) 
        setSearch("") 
        const response = await fetch(url) 
        const parsedData = await response.json() 
        setLoading(false) 
        if (parsedData.success) {
            if (!parsedData.data.articles) {
                console.log(parsedData) 
            }
            console.log(url) // Log the URL for debuggin
            setTotalResults(parsedData.data.totalResults) 
            console.log(parsedData.data.articles) 
            setArticles(parsedData.data.articles) 
        } else {
            console.log(parsedData.message)
            console.log(parsedData.error)
            setArticles([]) 
            setTotalResults(0) // Set total results to 0 if fetch fails
        }
    }

    // Function to fetch articles based on a search query
    const fetchQuery = async () => {
        setCategory("General") // Reset category to "General"
        let url = `https://cantilever-task-2.onrender.com/server/fetchQuery/${search}/${page}`
        // let url = base_url+`everything?&q=${search}&apiKey=${apiKey}&page=${page}&pageSize=20`
        setLoading(true) 
        const response = await fetch(url) // Fetch articles based on search query
        const parsedData = await response.json()
        setLoading(false) // Set loading to false after fetching
        if (parsedData.success) {
            if (!parsedData.data.articles) {
                console.log(parsedData) 
            }
            console.log(url) // Log the URL for debugging
            setTotalResults(parsedData.data.totalResults) // Set the total number of results
            console.log(parsedData.data.articles) 
            setArticles(parsedData.data.articles) // Update the articles state
        } else {
            console.log(parsedData.message) // Log error message
            console.log(parsedData.error)
            setArticles([]) // Clear the articles state if fetch fails
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

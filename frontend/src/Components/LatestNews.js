import React, { useState, useEffect } from 'react'
import News from './News'
import Results from './Results'
import Spinner from './Spinner'
import toast, { Toaster } from 'react-hot-toast';

function LatestNews() {
    const [loading, setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(1)
    const apiKey = process.env.REACT_APP_API_KEY
    const [categories] = useState(["General",
        "Business",
        "Entertainment",
        "Health",
        "Science",
        "Sports",
        "Technology"])
    const [category, setCategory] = useState("General")
    const [search, setSearch] = useState("")
    const handleCategory = (e) => {
        setCategory(e.target.textContent)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        if (search === "") {
            return toast("Try writing a search term")
        }
        fetchQuery(search)
    }
    const [articles, setArticles] = useState([])
    const fetchArticles = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=20`
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
    useEffect(() => {
        fetchArticles()
    }, [category, apiKey, page])
    const fetchQuery = async () => {
        setCategory("General")
        let url = `https://newsapi.org/v2/everything?&q=${search}&apiKey=${apiKey}&page=${page}&pageSize=20`
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
    const handlePrevClick=()=>{
        setPage(page-1)
        if(search === ""){
            fetchArticles()
        }else{
            fetchQuery()
        }
    }
    const handleNextClick=()=>{
        setPage(page+1)
        console.log("Search",search);
        if(search === ""){
            fetchArticles()
        }else{
            fetchQuery()
        }
    }
    return (
        <>
            <div className='mx-28'>
                <div>
                    <Toaster position="top-center"
                        reverseOrder={false}
                        gutter={8} />
                </div>
                <div className='my-8'>
                    <h1 className='text-5xl font-semibold'>Latest news - {category}</h1>
                </div>
                <div className='flex  justify-between my-5 items-center'>
                    <div className='flex gap-2 '>
                        {
                            categories.map((element, index) => {
                                return (
                                    <div key={index} onClick={handleCategory} className='h-fit rounded-xl border-2 border-black active:border-gray-500 px-3 py-1 flex items-center cursor-pointer hover:border-gray-500
                                    dark:text-white dark:border-gray-800'>
                                        <span>
                                            {element}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex rounded-md border-2 border-black overflow-hidden max-w-md font-[sans-serif]">
                        <input type="text" placeholder="Search Something..."
                            value={search}
                            onChange={handleSearchChange}
                            onKeyDown={(e) => {
                                if (e.key === 13) {
                                    console.log("Key pressed");
                                    handleSearch()
                                }
                            }}
                            className="outline-none bg-gray-200 text-gray-600 text-sm px-4 py-3" />
                        <button
                            onClick={handleSearch} type='button' className="flex items-center justify-center bg-[#000000] px-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
                                <path
                                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
                {
                    loading && <Spinner className='' />
                }
                {
                    !loading &&
                    <>
                        <Results totalResults={totalResults} page={page} />
                        <News articles={articles} />
                    </>
                }
                <div className='d-flex justify-content-between mt-3 mx-5'>
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / 20)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next</button>
                </div>
            </div>
        </>
    )
}

export default LatestNews
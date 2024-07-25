async function fetchArticles(req, res) {
    try {
        const {category,page} = req.params
        const apiKey = process.env.API_KEY
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=20`
        const response = await fetch(url)
        const parsedData = await response.json()
        res.status(200).json({'success': true,'data': parsedData,'message':'Successfully fetched the data'})
    } catch (e) {
        res.status(500).json({'success': false,'error':e.message ,'message':'Error fetching the data' })
        
    }
    
}
async function fetchQuery(req, res) {
    try {
        const {search,page} = req.params
        const apiKey = process.env.API_KEY
        let url = `https://newsapi.org/v2/everything?&q=${search}&apiKey=${apiKey}&page=${page}&pageSize=20`
        const response = await fetch(url)
        const parsedData = await response.json()
        res.status(200).json({'success': true,'data': parsedData,'message':'Successfully fetched the data'})
    } catch (e) {
        console.error(e)
        res.status(500).json({'success': false,'error':e.message ,'message':'Error fetching the data' })
    }
}

module.exports = { fetchArticles, fetchQuery }
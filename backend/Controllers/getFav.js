const Article = require('../Modals/ArticleSchema');

async function getArticles(req, res) {
    try{
        const user = req.user
        let articles = await Article.find({ user: user.id })
        if (articles.length < 1) {
            return res.status(404).json({ success: false, message: "No articles found" })
        }
        res.status(200).json({ success: true, articles: articles, message: "Article successfully fetched" })
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = getArticles;
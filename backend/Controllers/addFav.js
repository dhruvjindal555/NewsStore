const Article = require('../Modals/ArticleSchema');

async function addFav(req, res) {
    try {
        const user = req.user
        const { source, author, title, description, url, urlToImage, publishedAt, content } = req.body

        const oldArticle = await Article.findOne({url:url})
        if(oldArticle){
            return res.status(400).json({
                success: false,
                message: "Article already exists"
            })
        }
        const article = new Article({
            user: user.id,
            source: source,
            author: author,
            title: title,
            description: description,
            url: url,
            urlToImage: urlToImage,
            publishedAt: publishedAt,
            content: content
        })
        await article.save()
        res.status(200).json({
            success: true,
            message: "Article added successfully"
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

module.exports = addFav;
const Article = require('../Modals/ArticleSchema');

async function removeArticles(req, res) {
    try {
        const user = req.user
        const id = req.params.id

        let article = await Article.findOne({ _id: id })
        if (!article) {
            return res.status(400).json({
                success: false,
                message: "Article does not exists"
            })
        }
        if (article.user.toString() != user.id) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized to delete this article"
            })
        }
        article = await Article.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "Article removed successfully"
        })


    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
            error: err
        })
    }

}

module.exports = removeArticles;
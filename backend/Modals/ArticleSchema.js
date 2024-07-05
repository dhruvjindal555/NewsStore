const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    author: {
        type:String,
    },
    content:{
        type:String,
    } ,
    description:{
        type:String,
    },
    publishedAt:{
        type:Date
    },
    source:{
        type:Object
    },
    title:{
        type:String,
    },
    url:{
        type:String,
        unique:true
    },
    urlToImage:{
        type:String,
    },
    
});


const Article = mongoose.model('Article', ArticleSchema);

module.exports =Article;
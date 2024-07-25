const express = require("express");
const router = express.Router();
const {fetchArticles,fetchQuery}=require('../Controllers/Server')

// Home page route.
router.get("/fetchArticles/:category/:page",fetchArticles);
router.get("/fetchQuery/:search/:page",fetchQuery);


module.exports = router;
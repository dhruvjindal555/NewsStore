const express = require("express");
const fetchUser = require("../Middleware/fetchUser");
const router = express.Router();

// Home page route.
router.get("/",fetchUser,require('../Controllers/getFav'));

// About page route.
router.post("/add",fetchUser, require('../Controllers/addFav'));
router.delete("/remove/:id",fetchUser, require('../Controllers/removeFav'));

module.exports = router;
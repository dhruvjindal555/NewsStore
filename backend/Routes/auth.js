const express = require("express");
const router = express.Router();

// Home page route.
router.post("/login",require('../Controllers/LogIn'));

// About page route.
router.post("/signup", require('../Controllers/SignUp'));

module.exports = router;
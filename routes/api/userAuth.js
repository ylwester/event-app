const express = require("express");
const router = express.Router();

// @route GET api/users
// @desc Get all users json


router.post('/register', (req, res) => {
    res.send('Register');
})

module.exports = router;
// Forum area, like, comment etc

const express = require('express');
const router = express.Router();

// comment format: <REQ TYPE> <ENDPOINT>

// @route   GET api/posts
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;
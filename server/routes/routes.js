var express = require('express');
var router = express.Router();
var search = require('../controllers/search');
router.get('/', search.findAll);
module.exports = router;

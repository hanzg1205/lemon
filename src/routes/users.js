var express = require('express');
var router = express.Router();
const userApi = require('./users-api');
/* GET users listing. */
router.get('/getUser', userApi);

module.exports = router;
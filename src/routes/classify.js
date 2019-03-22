var express = require('express');
var router = express.Router();
const classifyApi = require('./classify-api');
/* 查询自定义分类 */
router.get('/getCustom', classifyApi.custom);

/* 添加自定义分类 */
router.post('/addCustom', classifyApi.addCustom);

/* 查询分类 */
router.get('/getClassify', classifyApi.classify);

module.exports = router;
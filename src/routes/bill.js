var express = require('express');
var router = express.Router();
const billApi = require('./bill-api');
/* 查询账单 */
router.post('/getBill', billApi.getBill);

/* 添加账单 */
router.post('/addBill', billApi.addBill);

/* 删除账单 */
router.get('/delBill', billApi.delBill);

module.exports = router;
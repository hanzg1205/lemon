/*
 * @Author: mikey.hanzhigang 
 * @Date: 2019-03-21 15:04:15 
 * @Last Modified by: mikey.韩志刚
 * @Last Modified time: 2019-03-21 19:09:52
 * @function [用户信息业务逻辑]
 */
const Mongo = require('Mongodb-curd');
const batabaseName = 'lemon';
const collcationName = 'user';
module.exports = function(req, res, next) {
    Mongo.find(batabaseName, collcationName, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
}
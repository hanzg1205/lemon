/*
 * @Author: mikey.hanzhigang 
 * @Date: 2019-03-21 15:39:34 
 * @Last Modified by: mikey.韩志刚
 * @Last Modified time: 2019-03-21 20:32:24
 * @function [分类的业务逻辑]
 */
const Mongo = require('mongodb-curd');
const dbName = 'lemon';
const collName = 'custom';
module.exports = {
    custom: function(req, res, next) { // 查询自定义
        Mongo.find(dbName, collName, function(result) {
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
    },
    addCustom: function(req, res, next) { // 添加自定义
        let { icon, type, title, common } = req.body;
        if (!icon || !type || !title || !common) {
            return res.send({ code: 2, mes: "参数不完整" })
        }
        Mongo.insert(dbName, 'classify', req.body, function(result) {
            if (!result) {
                res.send({
                    code: 0,
                    mes: "error"
                })
            } else {
                res.send({
                    code: 1,
                    mes: result
                })
            }
        })
    },
    classify: function(req, res, next) { // 查询分类
        let { type, common } = req.query;
        let data = { type: type, common: { $in: ['y', common] } };
        Mongo.find(dbName, 'classify', data, function(result) {
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
}
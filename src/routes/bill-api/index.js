/*
 * @Author: mikey.hanzhigang 
 * @Date: 2019-03-21 15:39:34 
 * @Last Modified by: mikey.韩志刚
 * @Last Modified time: 2019-03-29 19:06:00
 * @function [账单的业务逻辑]
 */
const Mongo = require('mongodb-curd');
const dbName = 'lemon';
const collName = 'bill';

module.exports = {
    getBill: function(req, res, next) { // 查询账单
        let { common, time, title } = req.body;
        if (!common || !time) {
            return res.send({ code: 2, mes: "参数不完整" })
        }
        let reg = new RegExp('^' + time);
        let data = { common: common, time: reg };
        console.log(title);
        if (title) {
            data = { common: common, time: reg, title: { $in: JSON.parse(title) } };
        }
        Mongo.find(dbName, collName, data, function(result) {
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
        }, {
            sort: {
                time: -1
            }
        })
    },
    addBill: function(req, res, next) { // 添加账单
        let { icon, type, money, title, common } = req.body;
        if (!icon || !type || !money || !title || !common) {
            return res.send({ code: 2, mes: "参数不完整" })
        }
        let now = new Date();
        let Time = {
            y: now.getFullYear(),
            m: now.getMonth() + 1,
            d: now.getDate()
        }
        req.body.time = Time.y + '-' + Time.m + '-' + Time.d;
        Mongo.insert(dbName, collName, req.body, function(result) {
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
        }, {
            sort: {
                time: -1
            }
        })
    },
    delBill: function(req, res, next) { // 删除账单
        let { _id } = req.query;
        if (!_id) {
            return res.send({ code: 2, mes: '参数不完整' });
        }
        Mongo.remove(dbName, collName, { _id: _id }, function(result) {
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
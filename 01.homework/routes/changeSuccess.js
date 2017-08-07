var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var handleError = require('../public/javascripts/handleError')
var option = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database: 'NewB'
};

var pool = mysql.createPool(option)
pool.getConnection(function (error,connection) {
    // // 创建数据库
    // var createDB = 'create database NewB'
    // connection.query(createDB,function (error) {
    //     handleError("创建数据库",error)
    // })
    // 使用数据库
    var useDB = 'use NewB'
    connection.query(useDB,function (error) {
        handleError("使用数据库",error)
    })
    router.post('/',function (request, response) {
        console.log(request.body)
        var select = "select * from user"
        connection.query(select,function (error,results) {
            console.log(results[0].username)
            console.log(results[0].password)
            if (!handleError('查询', error)) return
            console.log(results[0].username)
            if (request.body.username === results[0].username){
                if(request.body.newPassword !== request.body.oldPassword){
                    if(request.body.newPassword === request.body.confirm){
                        var theConfirm = `update user SET password = '${request.body.newPassword}' WHERE username = '${request.body.username}'`
                        connection.query(theConfirm,function (error) {
                            response.send('修改成功')
                        })
                    }else{
                        response.send('两次密码不一致')
                    }
                }else{
                    response.send('不能原密码一致')
                }
            }else{
                response.send('用户不存在')
            }
        })
    })


})
module.exports = router

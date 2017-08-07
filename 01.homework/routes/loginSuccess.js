var express = require('express')
var router = express.Router()
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
    // 创建数据库
    var createDB = 'create database NewB'
    connection.query(createDB,function (error) {
        handleError("创建数据库",error)
    })
    // 使用数据库
    var useDB = 'use NewB'
    connection.query(useDB,function (error) {
        handleError("使用数据库",error)
    })
    router.post('/',function (request, response) {
        console.log(request.body.username)
        console.log(request.body.password)
        // 常规写法
        var select = "select * from user where username = " + "'" + request.body.username + "'" + "and password = " + "'" + request.body.password + "'"
        connection.query(select,function (error,results) {
            if (!handleError('查询', error)) return
            console.log(results)
            if (results.length !== 0){
                var user = results[0]
                if(user.password === request.body.password){
                    response.send('登陆成功')
                }else{
                    response.send('密码错误')
                }
            }else{
                response.send('用户不存在')
            }
        })
    })


})
module.exports = router

const moment = require('moment')
const bcrypt = require("bcrypt")
const express = require('express')
const path = require('path')
// const cors = require('cors')
const app = express()

// http.use(cors())
app.use(express.static(path.join(__dirname, '../dist')))


// 准备数据库账号密码
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'cnection.cn',
    user: 'root',
    password: '294467754',
    database: 'cnection'
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/api', (req, res) => {

    // 定义hash值
    let hash = ''
    var IsCorrect = false

    // 连接数据库
    connection.connect();

    // 查询数据库中的密码
    connection.query("select password from userinfo where username = '" + req.query.username + "';", function (error, results, fields) {
        if (error) {
            console.log(`登陆失败：`+error)
            res.send(error)
        } else {
            console.log(`用户名${req.query.username}存在，哈希密码为：`+results[0])
            hash = results[0].password
            bcrypt.compare(req.query.password, hash, function(err, result) {
                result ? (IsCorrect = true) : console.log(`登录失败，密码错误`)
            })
        }
    });

    // 退出数据库
    connection.end()
    console.log(IsCorrect)
    if (IsCorrect) {res.send(getUserInfo(req.query.username))}
})

app.post('/api', (req, res) => {
    // connection.query("insert into userinfo(username, password, register_time) value ('" + req.body.username + "','" + req.body.password + "','" + moment().format('YYYY-MM-DD hh:mm:ss') + "')", function (error, results, fields) {
    //     if (error) {
    //         res.send(false)
    //     } else {
    //         res.send(true)
    //     }
    // });


})

app.listen(80, () => {
    console.log('服务器启动成功')
})

// 自定义函数getUserInfo
function getUserInfo(name) {
    connection.connection()
    connection.query("select * from userinfo_view where username = '" + name + "';", function (error, results, fields) {
        return results[0]
    })
    connection.end()
}
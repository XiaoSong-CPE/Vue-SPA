var fs = require('fs');
var http = require('http');
var https = require('https');
const path = require('path');
var privateKey = fs.readFileSync(path.join(__dirname, '../https/cnection.cn_bundle.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, '../https/cnection.cn_bundle.crt'), 'utf8');
var credentials = { key: privateKey, cert: certificate };
const moment = require('moment')
const bcrypt = require("bcrypt")
const express = require('express')
// const cors = require('cors')
const app = express()
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// http.use(cors())
app.use(express.static(path.join(__dirname, '../dist')))


// // 准备数据库账号密码
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'cnection.cn',
//     user: 'root',
//     password: '294467754',
//     database: 'cnection'
// });

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }));

// app.get('/api/login', (req, res) => {

//     // 连接数据库
//     connection.connect();

//     // 查询数据库中的密码
//     connection.query(`select password from userinfo where username = ${req.query.username};`, function (error, results, fields) {
//         if (error) {
//             console.log(`登陆失败：` + error)
//             res.send(error)
//         } else {
//             console.log(`用户名${req.query.username}存在，哈希密码为：` + results[0])
//             let hash = results[0].password
//             bcrypt.compare(req.query.password, hash, function (err, result) {
//                 result ? (IsCorrect = true) : console.log(`登录失败，密码错误`)
//             })
//         }
//     });

//     // 退出数据库
//     connection.end()
// })

// app.post('/api', (req, res) => {
//     // connection.query("insert into userinfo(username, password, register_time) value ('" + req.body.username + "','" + req.body.password + "','" + moment().format('YYYY-MM-DD hh:mm:ss') + "')", function (error, results, fields) {
//     //     if (error) {
//     //         res.send(false)
//     //     } else {
//     //         res.send(true)
//     //     }
//     // });


// })

// // app.listen(80, () => {
// //     console.log('服务器启动成功')
// // })

httpServer.listen(80, function () {
    console.log('HTTP Server is running on: http://localhost:%s', 80);
});
httpsServer.listen(443, function () {
    console.log('HTTPS Server is running on: https://localhost:%s', 443);
});
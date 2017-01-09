var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8888;

var app = express();

app.set('view engine', 'html');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'zhd',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))


var userinfo = require('./app/api/use.js');
var matterInReg = require('./app/api/matter_in_reg.js');

// 静态资料路径
app.use(express.static(__dirname + '/app/static/'));

//路由限制
app.use(function(req, res, next) {
    var url = req.originalUrl;
    console.log(url);
    // if (url != "/login" && url != '/api/login' && !req.session.user) {
    //     return res.redirect("/login");
    // }
    next();
});

//api接口
app.use('/api', userinfo);
app.use('/api', matterInReg);

// /路由
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/app/static/views/login.html');
})

//页面路由 登录
app.get('/login', function(req, res) {
    res.sendfile(__dirname + '/app/static/views/login.html');
})

//页面路由 matterInReg/add
app.get('/matterInReg', function(req, res) {
    res.sendfile(__dirname + '/app/public/views/matter_in_reg.html');
})

//页面路由 matterInReg/add
app.get('/matterInReg/add', function(req, res) {
    res.sendfile(__dirname + '/app/public/views/add_matter_in_reg.html');
})

app.listen(port, function() {
    console.log('node 服务已开启,监听端口号：' + port)
});

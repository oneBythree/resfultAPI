var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;

var app = express();

app.set('view engine', 'html');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


var matterInReg = require('./app/api/matter_in_reg.js');

app.use(function(req, res, next) {
    next();
})

//api接口
app.use('/api', matterInReg);

// app.use(express.static(path.join(__dirname, './app/public/views/')));
app.use(express.static(__dirname + '/app/public/'));

//页面路由 matterInReg/add
app.get('/matterInReg/add', function(req, res) {
    // res.render('add_matter_in_reg');
    res.sendfile(__dirname + '/app/public/views/add_matter_in_reg.html');
})

app.listen(port, function() {
    console.log('node 服务已开启,监听端口号：' + port)
});

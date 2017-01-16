/**
 * 公用api 接口
 */

var express = require('express');
var router = express.Router();

var dbhelper = require('../db/helper.js');

var config = require('../db/config.js');
var mysql = require('mysql');
var mainPool = mysql.createPool(config.main);

//引入公用函数
var common = require('../common/common.js');

var sql = {
    supplier: ''
}

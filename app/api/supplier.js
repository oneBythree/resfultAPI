/**
 * 供应商 api 接口
 */

var express = require('express');
var router = express.Router();

var dbhelper = require('../db/helper.js');

var config = require('../db/config.js');
var mysql = require('mysql');
var mainPool = mysql.createPool(config.main);

var sql = {
    index: ''
}

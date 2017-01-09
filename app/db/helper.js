// var mysql = require("mysql");
// var config = require('./config.js');
// var mainPool = mysql.createPool(config.main);
// var centerPool = mysql.createPool(config.center)

var helper = function(pool) {
    this.query = function(sql, callback) {
        pool.getConnection(function(err, conn) {
            if (err) callback(err)
                // console.log("获取连接失败,%s", err);
            conn.query(sql, function(err, rows, fields) {
                if (err) callback(err)
                callback(err, rows);
            });
            conn.release();
        });
    };
    this.queryArgs = function(sql, args, callback) {
        pool.getConnection(function(err, conn) {
            if (err) callback(err)
                // console.log("获取连接失败,%s", err);
            conn.query(sql, args, function(err, rows, fields) {
                if (err) callback(err)
                callback(err, rows);
            });
            conn.release();
        });
    };
    this.insert = function(sql, args, callback) {
        pool.getConnection(function(err, conn) {
            if (err) callback(err);
            //console.log("获取连接失败,%s", err);

            conn.query(sql, function(err, res) {
                if (err) callback(err);
                //console.log("新增失败,%s", err);
                callback(err, res.insertId);
            });

            conn.release();
        });
    };
    this.update = function(sql, callback) {
        pool.getConnection(function(err, conn) {
            if (err) console.log("获取连接失败,%s", err);

            conn.query(sql, function(err, res) {
                if (err) console.log("修改失败,%s", err);
                //callback(res.changedRows);  
                callback(res.affectedRows);
            });

            conn.release();
        })
    };
    this.delete = function(sql, callback) {
        pool.getConnection(function(err, conn) {
            if (err) console.log("获取连接失败,%s", err);

            conn.query(sql, function(err, res) {
                if (err) console.log("删除失败,%s", err);
                callback(res.affectedRows);
            });

            conn.release();
        })
    }
}

exports.helper = helper;
// exports.helper(centerPool) = helperCenter;

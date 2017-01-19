/**
 * 供应商/供货单位 api 接口
 */

var express = require('express');
var router = express.Router();

var dbhelper = require('../db/helper.js');

var config = require('../db/config.js');
var mysql = require('mysql');
var mainPool = mysql.createPool(config.main);

var helper = new dbhelper.helper(mainPool);

//引入公用函数
var common = require('../common/common.js');

var sql = {
    index: 'SELECT SUP_ID AS ID, NODE_ID, SUPPLIER_NAME AS NAME, DATA,M_TYPE,TPL_ID,USE_COUNT,LASTTIME FROM dc_my_supplier WHERE NODE_ID = ? AND M_TYPE = ? ORDER BY LASTTIME DESC',
}


/**
 * [供应商列表 description]
 * @param  {[M_TYPE]}   [查询类型 description]
 * @return {[type]}      [description]
 */
router.get('/supplier/list', function(req, res) {
    var NODE_ID = req.session.user.JG_DM;

    var M_TYPE = !req.query.type || req.query.type.toUpperCase() === 'C' ? 'C' : 'R'; // 查询供应商类型 （c 蔬菜 r 肉）

    console.log('---------------- 查询供应商成功 ----------------');
    var sqlIndex = mysql.format(sql.index, [NODE_ID, M_TYPE]);
    console.log(sqlIndex)
    console.log('--------------------------------------------------');

    helper.queryArgs(sqlIndex, function(err, result) {
        if (err) {
            res.json(common.msyqlErrorAction(err));
        } else {
            res.json(common.resResultJSON(result, '查询供应商成功'));
        }
    })

})

module.exports = router;

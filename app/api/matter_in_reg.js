/**
 * 蔬菜进场 api
 * @type {[type]}
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

//sql语句
var sql = {
    page: 'SELECT COUNT(1) as count FROM ( SELECT count(1)  as count FROM  dc_matter_in_reg WHERE dc_matter_in_reg.DC_ID = ? GROUP BY TRANS_ID) a',
    list: "SELECT DISTINCT  dc_matter_in_reg.REG_ID, dc_matter_in_reg.SUPPLIER_NAME,  dc_matter_in_reg.SUPPLIER_ID,dc_matter_in_reg.IN_DATE,dc_matter_in_reg.MATTER_NAME, dc_matter_in_reg.MATTER_ID,dc_matter_in_reg.BATCH_ID, dc_matter_in_reg.DC_ID,dc_matter_in_reg.DC_NAME,dc_matter_in_reg.WEIGHT,dc_matter_in_reg.AREA_ORIGIN_ID,dc_matter_in_reg.AREA_ORIGIN_NAME, dc_matter_in_reg.PRICE,dc_matter_in_reg.GYS_ID,dc_matter_in_reg.GYS_MC ,dc_matter_in_reg.TRANSPORTER_ID,dc_matter_in_reg.LR_SJ FROM dc_matter_in_reg WHERE",
    one: 'SELECT DISTINCT dc_matter_in_reg.REG_ID, dc_matter_in_reg.SUPPLIER_NAME, dc_matter_in_reg.SUPPLIER_ID, dc_matter_in_reg.IN_DATE,dc_matter_in_reg.MATTER_NAME,dc_matter_in_reg.MATTER_ID,dc_matter_in_reg.BATCH_ID,dc_matter_in_reg.DC_ID,dc_matter_in_reg.DC_NAME,dc_matter_in_reg.WEIGHT,dc_matter_in_reg.AREA_ORIGIN_ID,dc_matter_in_reg.AREA_ORIGIN_NAME,dc_matter_in_reg.PRICE,dc_matter_in_reg.GYS_ID,dc_matter_in_reg.GYS_MC,dc_matter_in_reg.TRANSPORTER_ID FROM dc_matter_in_reg WHERE ',
    insert: 'insert likes (TRANS_ID,DC_ID,DC_NAME,IN_DATE,BATCH_ID,MATTER_ID,MATTER_NAME,WEIGHT,PRICE,AREA_ORIGIN_ID,AREA_ORIGIN_NAME,LR_SJ,XG_SJ,CZR_ID,M_TYPE,GYS_ID,GYS_MC) VAULES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
    updata: "",
    oderBy: "dc_matter_in_reg.IN_DATE DESC,dc_matter_in_reg.WEIGHT DESC",
    index: "SELECT REG_ID,TRANS_ID,DC_ID,DC_NAME,IN_DATE,DW_JZ,DW_SL,REMARK,AREA_ORIGIN_ID,AREA_ORIGIN_NAME,BASE_NAME,TRANSPORTER_ID,SUPPLIER_ID,SUPPLIER_NAME,LR_SJ,CZR_ID,M_TYPE,GYS_ID,GYS_MC,USERDEFINE_CODE,group_concat(BATCH_ID separator ',') AS BATCH_ID,group_concat(MATTER_NAME separator ',') AS MATTER_NAME,group_concat(MATTER_ID separator ',') AS MATTER_ID,group_concat(PRICE separator ',') AS PRICE,group_concat(WEIGHT separator ',') AS WEIGHT FROM dc_matter_in_reg WHERE DC_ID = ? AND IN_DATE BETWEEN ? AND ? GROUP BY TRANS_ID ORDER BY IN_DATE DESC,WEIGHT DESC LIMIT ?, ?"
}

/**
 * 获取蔬菜进场信息 分页查询 dc_matter_in_reg  
 * @return {[type]}       [description]
 */
router.get('/matterInReg/list', function(req, res, next) {
    var selectId = '',
        data = {};

    var DC_ID = req.session.user.JG_DM;
    var cur = !!req.query.cur ? +req.query.cur : 1; //获取当前页面
    var rowcount = !!req.query.rowcount ? +req.query.rowcount : 10; //每页数据条数
    var start = !!req.query.start ? req.query.start : '2010-01-01';
    var end = req.query.start ? req.query.end : new common.Date().Format('yyyy-MM-dd');



    console.log('---------------- 查询进场信息总数据条数 ----------------');
    var sqlPage = mysql.format(sql.page, [DC_ID]);
    console.log(sqlPage)
    console.log('--------------------------------------------------------');

    console.log('---------------- 查询进场信息 ----------------');
    var sqlIndex = mysql.format(sql.index, [DC_ID, start, end, rowcount * (cur - 1), rowcount]);
    console.log(sqlIndex)
    console.log('-----------------------------------------------');


    helper.queryArgs(sqlPage, function(err, result) { //查询总数据条数
        if (err) {
            res.json(common.msyqlErrorAction(err));
        } else {
            data.cur = cur; //当前页码
            data.rowcount = rowcount; // 每页显示数据条数
            data.count = result[0].count; //总数据条数
            data.total = Math.ceil(result[0].count / rowcount); //总页码数
        }
        //分页查询
        helper.queryArgs(sqlIndex, function(err, result) {
            if (err) {
                res.json(common.msyqlErrorAction(err));
            } else {
                res.json(common.resResultJSON(result, '查询进场信息成功！', data));
            }
        })
    })
})

/**INSERT INTO `dc_matter_in_reg` (`TRANS_ID`, `DC_ID`, `DC_NAME`) VALUES ('8708106955506925809', '110108262', '北京蓝波绿农科技有限公司')
 * 查询单个进程信息
 * @return {[type]}       [description]
 */
router.get('/matterInReg/:id', function(req, res, next) {
    var selectId = '',
        selectpid = '',
        sqlOne = '';

    selectId = ' dc_matter_in_reg.DC_ID = ' + 110106223; //查询id

    var _pid = req.params.id;
    if (!_pid) {
        router.get('/');
        return false;
    } else {
        selectpid = ' dc_matter_in_reg.REG_ID = ' + _pid;
    }
    sqlOne = sql.one + selectId + ' AND ' + selectpid;

    console.log('---------------- 查询单个进场信息 ----------------');
    console.log(sqlOne)
    console.log('---------------------------------------------------');

    helper.query(sqlOne, function(err, result) {
        if (err) {
            res.json(common.msyqlErrorAction(err));
        } else {
            res.json(common.resResultJSON(result[0], '查询单个进场信息成功！'))
        }
    })
})

/**
 * [添加进场信息]
 * @return {[type]}       [description]
 */
router.post('/matterInReg/add', function(req, res, next) {
    /**
     * @ TRANS_ID 交易ID （20位随机数）
     * @ DC_ID 配送中心编码 （登录用户 user）
     * @ DC_NAME 配送中心名称
     * @ IN_DATE 进场日期
     * @ BATCH_ID 批次码
     * @ MATTER_ID 商品编码
     * @ MATTER_NAME 商品名称
     * @ WEIGHT 重量
     * @ PRICE 单价
     * @ AREA_ORIGIN_ID 产地编码
     * @ AREA_ORIGIN_NAME 产地名称
     * @ LR_SJ 录入时间
     * @ XG_SJ 修改时间
     * @ CZR_ID 操作人员编码
     * @ M_TYPE 商品类型
     * @ GYS_ID 供应商ID
     * @ GYS_MC 供应商名称
     */
    console.log(req.body.TRANS_ID)
})

module.exports = router;

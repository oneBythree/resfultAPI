/**
 * ypf 2016-12-17
 * 公用函数
 */
var _ = require('underscore');

/**
 * [resResultJSON api返回固定格式json]
 * @param  {[type]} data    [sql处理结果]
 * @param  {[type]} message [sql操作动作提示]
 * @return {[type]}         [description]
 */
function resResultJSON(data, message, pageData) {
    var rz = {};
    rz.code = 200;
    rz.result = data;
    if (pageData) {
        rz.cur = pageData.cur; //当前页码
        rz.rowcount = pageData.rowcount; //每页显示数据条数
        rz.total = pageData.total; // 总页码数
        rz.count = pageData.count; //总数据条数
    }
    rz.message = message;
    return rz;
};


/**
 * [msyqlErrorAction 数据库返回异常err处理]
 * @param  {[type]} errorJSON [description]
 * @return {[type]}           [newJson]
 */
function msyqlErrorAction(errorJSON) {
    if (isJSON(errorJSON) && jsonHasownproperty(errorJSON, 'code')) {
        switch (errorJSON.code) {
            case 'ECONNREFUSED':
                errorJSON.message = '数据库未连接，请联系管理员';
                break;
            case 'ER_PARSE_ERROR':
                errorJSON.message = '查询语句错误，请联系管理员';
                break;
            default:
                errorJSON.message = '数据库未知错误，请联系管理员';
                break;
        }
    }
}

/**
 * [isJSON 是否是json对象]
 * @param  {[type]}  obj [传入对象]
 * @return {Boolean}     [Boolean]
 */
function isJSON(obj) {
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

/**
 * [jsonHasownproperty json对象是否含有某个属性]
 * @param  {[type]} obj [json对象]
 * @param  {[type]} val [属性值]
 * @return {[type]}     [Boolean]
 */
function jsonHasownproperty(obj, val) {
    return obj.hasOwnProperty(val) ? true : false;
}

/**
 * [defaultPage 默认分页json]
 * @type {Object}
 */
var defaultPage = {
    computed: {
        cur: 1,
        rowcount: 10
    }
}

module.exports.resResultJSON = resResultJSON;
module.exports.msyqlErrorAction = msyqlErrorAction;

module.exports.isJSON = isJSON;
module.exports.jsonHasownproperty = jsonHasownproperty;
module.defaultPage = defaultPage;

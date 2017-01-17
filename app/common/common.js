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
    rz.data = data;
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
 * [resErrorJSON api错误返回固定格式]
 * @param  {[type]} message [错误提交]
 * @return {[type]}         [description]
 */
function resErrorJSON(message) {
    var rz = {};
    rz.code = 400;
    rz.data = false;
    rz.message = message;
    return rz;
}

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
 * [Format description]
 * @param {[type]} fmt [description]
 */
Date.prototype.Format = function(fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * [addDate description]
 * @param {[type]} date [description]
 * @param {[type]} days [description]
 */
function addDate(date, days) {
    if (days == undefined || days == '') {
        days = 1;
    }
    var date = new Date(date);
    date.setDate(date.getDate() + days);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return date.getFullYear() + '-' + addZero(month) + '-' + addZero(day);
}

/**
 * [addZero补零  description]
 * @param {[type]} arg [description]
 */
function addZero(arg) {
    if (arg == undefined || arg == '') {
        return '';
    }

    var re = arg + '';
    if (re.length < 2) {
        re = '0' + re;
    }

    return re;
}

module.exports.resResultJSON = resResultJSON;
module.exports.resErrorJSON = resErrorJSON;
module.exports.msyqlErrorAction = msyqlErrorAction;
module.exports.isJSON = isJSON;
module.exports.jsonHasownproperty = jsonHasownproperty;
module.exports.Date = Date;
module.exports.addDate = addDate;
module.exports.addZero = addZero;

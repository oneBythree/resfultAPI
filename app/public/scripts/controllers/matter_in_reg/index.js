"use strict";

var app = new Vue({
    el: 'body',
    data() {
        return {
            tableDatas: [],
            infoDatas: [],
            selectDatas: [],
            GYS_ID: null,
            total: null,
            cur: 1,
            count: null
        }
    },
    ready: function() {
        this.initData();
    },
    computed: {
        showLast: function() {
            return this.cur == this.total ? false : true;
        },
        showFirst: function() {
            return this.cur == 1 ? false : true;
        },
        indexs: function() {
            var left = 1;
            var right = this.total;
            var ar = [];
            if (this.total >= 5) {
                if (this.cur > 3 && this.cur < this.total - 2) { //大于6并且小于16
                    left = this.cur - 2;
                    right = this.cur + 2;
                } else {
                    if (this.cur <= 5) {
                        left = 1;
                        right = 5;
                    } else {
                        right = this.total;
                        left = this.total - 4;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        }
    },
    watch: {
        cur: function(cur, old) {
            var that = this;
            $.get('/api/matterInReg/list', { 'cur': cur }, function(rep) {
                that.tableDatas = rep.data;
                that.count = rep.count;
                that.total = rep.total;
            })
        },
        keyNum: function(curValue, old) {
            console.log(this.total)
            if (curValue > 0 && curValue <= this.total) {
                this.keyNum = curValue;
            } else {
                this.keyNum = '';
            }
        }
    },
    methods: {
        initData: function() {
            var that = this;
            $.get('/api/matterInReg/list', {}, function(rep) {
                that.tableDatas = rep.data;
                that.count = rep.count;
                that.total = rep.total;
            })

            $.get('/api/supplier/list', { type: 'c' }, function(rep) {
                that.selectDatas = rep.data;
            })
        },
        showInfo: function(item) {
            this.infoDatas = [];
            this.infoDatas = inofJson(['BATCH_ID', 'MATTER_NAME', 'WEIGHT', 'PRICE'], item);
        },
        btnClick: function(data) { //页码点击事件
            this.cur = data != this.cur ? data : this.cur;
        },
        search: function() {
            var start = this.start;
            var end = this.end;
            var GYS_ID = this.GYS_ID;
            var dataJSON;
            if (!!GYS_ID) {
                dataJSON = { 'start': start, 'end': end, 'GYS_ID': GYS_ID }
            } else {
                dataJSON = { 'start': start, 'end': end }
            }
            var that = this;
            $.get('/api/matterInReg/list', dataJSON, function(rep) {
                that.tableDatas = rep.data;
                that.count = rep.count;
                that.total = rep.total;
            })
        },
        selectedOption: function(id) {
            this.GYS_ID = id;
        },
        resetFnc: function() {
            this.start = '';
            this.end = '';
            this.GYS_ID = '';
            $('.selectpicker').selectpicker('val', '');
            this.initData();
        }
    }

});

function inofJson(nodeNames, item) {

    var itemArry = [];
    var childrenNode = item[nodeNames[0]].split(',');
    for (var i = 0; i < childrenNode.length; i++) {
        var itemjson = {};
        nodeNames.map(function(nodeName) {
            itemjson[nodeName] = item[nodeName].split(',')[i];
        })
        itemArry.push(itemjson);
    }
    return itemArry;
}


$(function() {
    $('.input-daterange').datepicker({
        language: 'zh-CN',
        orientation: "bottom auto",
        autoclose: true,
        todayHighlight: true,
        format: 'yyyy-mm-dd',
    });
})

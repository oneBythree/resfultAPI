"use strict";

var app = new Vue({
    el: 'body',
    data() {
        return {
            tableDatas: [],
            infoDatas: [],
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
        },
        showInfo: function(item) {
            this.infoDatas = [];
            this.infoDatas.push(item);
            console.log(inofJson(['BATCH_ID', 'MATTER_NAME', 'WEIGHT', 'PRICE'], item));
        },
        btnClick: function(data) { //页码点击事件
            this.cur = data != this.cur ? data : this.cur;
        },

    }

});


function inofJson(nodeNames, item) {

    var itemArry = [];
    var childrenNode = nodeNames[0].split(',');
    childrenNode.map(function(children) {
        var itemjson = {};
        nodeNames.map(function(nodeName) {
            itemjson[nodeName] = item[nodeName];
        })
        itemArry.push(itemjson);
    })

    // nodeNames.map(function(nodeName) {
    //         var itemJson = {};
    //         var childrenNode = item[0].split(',');

    //         itemjson[nodeName] = item[nodeName];
    //         console.log(item[nodeName])
    //     })
    // for (var i = 0; i < nodeNames.length; i++) {
    //     console.log(nodeNames[i])
    //     console.log(item)
    //     var infoNode = item.nodeNames.split(',');
    //     // itemjson.nodeNames[i] = item.nodeNames[i][i];

    return itemArry;
}

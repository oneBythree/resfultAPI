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
        },
        btnClick: function(data) { //页码点击事件
            this.cur = data != this.cur ? data : this.cur;
        },

    }

});

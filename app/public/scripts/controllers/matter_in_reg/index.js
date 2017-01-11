"use strict";

var app = new Vue({
    el: 'body',
    data() {
        return {
            tableDatas: [],
            infoDatas: []
        }
    },
    ready: function() {
        this.initData();
    },
    methods: {
        initData: function() {
            var that = this;
            $.get('/api/matterInReg/list', {}, function(rep) {
                that.tableDatas = rep.data;
            })
        },
        showInfo: function(item) {
            this.infoDatas = [];
            this.infoDatas.push(item);
        }
    }
});

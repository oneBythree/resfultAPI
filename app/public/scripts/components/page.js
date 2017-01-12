"use strict";

Vue.component('my-page', {
    template: '<div class="m-page clearfix">' +
        '<span class="pull-right">&nbsp;&nbsp;&nbsp;共{{total}}页 | 共{{count}}条数据</span>' +
        '<ul class="pagination pull-right">' +
        '<li v-if="showFirst"><a href="#" @click="linkFirst()">首页</a></li>' +
        '<li v-if="showFirst"><a href="#" @click="cur--">上一页</a> </li>' +
        '<li v-for="index in indexs" v-bind:class="{ \'active\': cur == index}"><a v-on:click="btnClick(index)">{{index}}</a></li>' +
        '<li v-if="showLast"><a v-on:click="cur++">下一页</a></li>' +
        '<li v-if="showLast"><a v-on:click="linkLast()">尾页</a></li>' +
        '<li class="page-all"><a>共<i>{{all}}</i>页</a></li>' +
        '</ul>' +
        '</div>',
    props: {
        total: {
            type: Number,
            require: true,
            default: 0
        },
        count: {
            type: Number,
            require: true,
            default: 0
        },
        cur: {
            type: Number,
            require: true,
            default: 1
        },
        reqJson: {
            type: Object,
            require: true,
            default: {}
        },
        reqUrl: {
            type: String,
            require: true,
            default: ''
        },
        reqAction: {
            type: String,
            require: true,
            default: 'GET'
        },
        parentData: {
            type: Array,
            require: true,
            default: []
        }
    }
    ready: function() {},
    methods: {
        btnClick: function(data) { //页码点击事件
            if (data != this.cur) {
                this.cur = data;
            }
        },
        linkFirst: function() {
            this.cur = 1;
        },
        linkLast: function() {
            this.cur = this.all;
        },
    },
    computed: {
        reqAction: function() {
            return this.reqAction.toUpperCase() == 'GET': 'GET': 'POST';
        },
        showLast: function() {
            if (this.cur == this.all) {
                return false;
            }
            return true;
        },
        showFirst: function() {
            if (this.cur == 1) {
                return false;
            }
            return true;
        },
        indexs: function() {
            var left = 1;
            var right = this.total;
            var ar = [];
            if (this.all >= 5) {
                if (this.cur > 3 && this.cur < this.total - 2) { //大于6并且小于16
                    left = this.cur - 2;
                    right = this.cur + 2;
                } else {
                    if (this.cur <= 5) {
                        left = 1;
                        right = 5;
                    } else {
                        right = this.all;
                        left = this.all - 4;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        },
    },
    watch: {
        cur: function(curValue, old) {
            var self = this;
            $.get(this.reqUrl, this.reqJson, function(rep) {
                self.$set(self.parentData, rep.data);
            })
        },
        keyNum: function(curValue, old) {
            console.log(this.all)
            if (curValue > 0 && curValue <= this.all) {
                this.keyNum = curValue;
            } else {
                this.keyNum = '';
            }
        }
    }
})

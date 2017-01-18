"use strict";

var app = new Vue({
    el: 'body',
    data() {
        return {
            breadcrumb: '',
            inDate: '',
        }
    },
    ready: function() {
        this.validateUrl();
    },
    methods: {
        validateUrl: function() {
            var urlArray = location.href.split('/');
            if (urlArray[urlArray.length - 1] == 'add') {
                this.breadcrumb = '添加';
                this.inDate = new Date();
            }
        },
        add: function() {

        }
    },
    computed: {

    }
})


$(function() {
    $('#sandbox-container input').datepicker({
        language: 'zh-CN',
        orientation: "bottom auto",
        autoclose: true,
        todayHighlight: true,
        format: 'yyyy-mm-dd',
    });

    $("#distpicker").distpicker();
})

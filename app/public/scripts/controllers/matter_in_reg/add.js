"use strict";

var app = new Vue({
    el: 'body',
    data() {
        return {
            breadcrumb: '',
            inDate: '',
            supplierDomes: []
        }
    },
    ready: function() {
        this.validateUrl();
    },
    methods: {
        validateUrl: function() {
            var urlArray = location.href.split('/');
            if (urlArray[urlArray.length - 1] == 'add') {
                this.add();
            }

            this.supplierAjax();
        },
        add: function() {
            this.breadcrumb = '添加';
            this.inDate = new Date();
            $('#distpicker').distpicker({
                province: '---- 所在省 ----',
                city: '---- 所在市 ----',
                district: '---- 所在区 ----'
            });

        },
        supplierAjax: function() {
            var that = this;
            $.get('/api/supplier/list', { 'type': 'c' }, function(rep) {
                that.supplierDomes = rep.data.slice(0, 3);
            })
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



    // $("#distpicker").distpicker();
})

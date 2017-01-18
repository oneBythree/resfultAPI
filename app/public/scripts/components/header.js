"use strict";

Vue.component('my-header', {
    template: "<div class=\'navbar navbar-fixed-top scroll-hide\'>" +
        "<div class=\'container-fluid top-bar\'>" +
        "<div class=\'pull-right\'>" +
        "<ul class=\'nav navbar-nav pull-right\'>" +
        "                    <li class=\'dropdown notifications hidden-xs\'>" +
        "                        <a class=\'dropdown-toggle\' data-toggle=\'dropdown\' href=\'#\'>" +
        "                            <span aria-hidden=\'true\' class=\'glyphicon glyphicon-flag\'></span>" +
        "                            <div class=\'sr-only\'>通知</div>" +
        "                            <p class=\'counter\'>4</p>" +
        "                        </a>" +
        "                        <ul class=\'dropdown-menu\'>" +
        "                        </ul>" +
        "                    </li>" +
        "                    <li class=\'dropdown messages hidden-xs\'>" +
        "                        <a class=\'dropdown-toggle\' data-toggle=\'dropdown\' href=\'#\'>" +
        "                            <span aria-hidden=\'true\' class=\' glyphicon glyphicon-comment\'></span>" +
        "                            <div class=\'sr-only\'>消息</div>" +
        "                            <p class=\'counter\'>3</p>" +
        "                        </a>" +
        "                        <ul class=\'dropdown-menu messages\'>" +
        "                            <li>" +
        "                                <a href=\'#\'>消息</a>" +
        "                            </li>" +
        "                        </ul>" +
        "                    </li>" +
        "                    <li class=\'dropdown settings hidden-xs\'>" +
        "                        <a class=\'dropdown-toggle\' data-toggle=\'dropdown\' href=\'#\'>" +
        "                            <span aria-hidden=\'true\' class=\'glyphicon glyphicon-cog\'></span>" +
        "                            <div class=\'sr-only\'>设置</div>" +
        "                        </a>" +
        "                        <ul class=\'dropdown-menu\'>" +
        "                            <li>" +
        "                                <a class=\'settings-link blue\' href=\'javascript:chooseStyle(\'none\', 30)\'><span></span>设置</a>" +
        "                            </li>" +
        "                        </ul>" +
        "                    </li>" +
        "                    <li class=\'dropdown user hidden-xs\'>" +
        "                        <a data-toggle=\'dropdown\' class=\'dropdown-toggle\' href=\'#\'>" +
        "                            <img width=\'34\' height=\'34\' src=\'../images/admin.png\'>{{user.YH_MC}}<b class=\'caret\'></b></a>" +
        "                        <ul class=\'dropdown-menu\'>" +
        "                            <li>" +
        "                                <a href=\'#\'>" +
        "                                    <i class=\'icon-user\'></i>我的账户</a>" +
        "                            </li>" +
        "                            <li>" +
        "                                <a href=\'#\'>" +
        "                                    <i class=\'icon-gear\'></i>账户设置</a>" +
        "                            </li>" +
        "                            <li>" +
        "                                <a href=\'/login\'>" +
        "                                    <i class=\'icon-signout\'></i>退出</a>" +
        "                            </li>" +
        "                        </ul>" +
        "                    </li>" +
        "                </ul>" +
        "            </div>" +
        "            <button class=\'navbar-toggle\'>" +
        "                <span class=\'icon-bar\'></span>" +
        "                <span class=\'icon-bar\'></span>" +
        "                <span class=\'icon-bar\'></span>" +
        "            </button>" +
        "            <a class=\'logo\' href=\'/login\'>" +
        "                志恒达" +
        "                <img src=\'../images/visionapps.svg\' alt=\'\'>" +
        "            </a>" +
        "        </div>" +
        "        <div class=\'container-fluid main-nav clearfix\'>" +
        "            <div class=\'nav-collapse\'>" +
        "                <ul class=\'nav\'>" +
        "                    <li>" +
        "                        <a class=\'current\' href=\'index.html\'>" +
        "                            <span aria-hidden=\'true\' class=\'glyphicon glyphicon-home\'></span>主页" +
        "                        </a>" +
        "                    </li>" +
        "                    <li v-for=\'role in roles\' >" +
        "                        <a href=\'{{role.url}}\'>" +
        "                            <span aria-hidden=\'true\' class=\'{{role.icon}}\'></span> {{role.CD_MC}}" +
        "                        </a>" +
        "                    </li>" +
        "                </ul>" +
        "            </div>" +
        "        </div>" +
        "</div>",
    props: {
        user: '',
        roles: ''
    },
    ready: function() {
        this.loadRole();
    },
    methods: {
        loadRole: function() {
            var self = this; 
            $.get('/api/role', {}, function(rs) {
                self.$set('roles', changeRoleJson(rs.data))
            })

            $.get('/api/user', {}, function(rs) {
                self.$set('user', rs.data)
            })
        }
    }
})


function changeRoleJson(dataJson) {
    dataJson.map(function(item) {
        switch (item.CD_DM) {
            case 65:
                item.icon = 'glyphicon glyphicon-log-in';
                item.url = '/matterInReg';
                break;
            case 68:
                item.icon = 'glyphicon glyphicon-compressed';
                item.url = '/matterInQuar';
                break;
            case 69:
                item.icon = 'glyphicon glyphicon-credit-card';
                item.url = '/matterInSale';
                break;
            default:
                item.icon = 'glyphicon glyphicon-th';
                item.url = '/';
                break;
        }
    })
    return dataJson;
}


$(window).scroll(function() {
    var scrollValue = $(window).scrollTop();
    scrollValue > 45 ? ($('.navbar,.jumbotron').addClass('closed')) : ($('.navbar,.jumbotron').removeClass('closed'));
})

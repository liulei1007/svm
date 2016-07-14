$(function () {

    var index = {

        pageName: [],

        init: function () {
            var own = this;
            // 判断用户是否登录
            setInterval(this.chkUserStatus(), 30000);

            $.when(this.getUserAuth(), this.getLoginInfo()).done(function () {

                own.bindEvent();

                var pageNameLen = own.pageName.length;
                for (var i = 0; i < pageNameLen; i++) {
                    $("[pageName='" + own.pageName[i] + "']").bind("click", function () {
                        window.location.href = own.pageName[i];
                    });
                }

            });
        },

        bindEvent: function () {

            return this;
        },

        getLoginInfo: function () {

            return $.commonAjax({
                type: "get",
                url: 'getLoginUser',
                success: function (data) {
                    if (data.ok) {
                        sessionStorage.login_mobilePhone = data.data.mobilePhone;
                        sessionStorage.login_userType = data.data.userType;
                        sessionStorage.login_id = data.data.id;
                        sessionStorage.login_openId = data.data.openId;
                        sessionStorage.login_parentId = data.data.parentId;
                        sessionStorage.login_agentsBusinessId = data.data.agentsBusinessId;
                        sessionStorage.login_manuId = data.data.manuId;
                        if (data.data.userType == 0) {
                            window.location.href = 'secondreg?fullscreen';
                        } else if (data.data.userType == 3) {
                            window.location.href = 'waitCheck?fullscreen';
                        }
                        if (sessionStorage.login_mobilePhone) {
                            if ((sessionStorage.login_mobilePhone != undefined) && (sessionStorage.login_mobilePhone != "")) {
                                $("#login-name").html(sessionStorage.login_mobilePhone.substring(0, 3) + "****" + sessionStorage.login_mobilePhone.substring(7));
                            }
                        } else {
                            window.location.href = "/";
                        }
                    } else {
                        console.log("获取登录信息失败:" + data.resDescription);
                        window.location.href = "/";
                    }
                }
            });
        },

        /**
         * 获取用户菜单权限
         * @returns {*}
         */
        getUserAuth: function () {
            var own = this;

            var showMenu = function (data) {
                var menu = '', twoMenu = '', dataLen = data.length;
                for (var i = 0; i < dataLen; i++) {
                    menu += '<ul class="nav slidebar-title" auth="' + data[i].id + '">' +
                        '<li><i class="shop"></i>' + data[i].resourceName + '</li></ul>';

                    twoMenu += '<ul class="slidebar-menu clearFix childmenu" auth="' + data[i].id + '">';
                    var childrenLen = data[i].children && data[i].children.length;
                    for (var j = 0; j < childrenLen; j++) {
                        var cData = data[i].children[j];
                        cData.resourceUrl && own.pageName.push(cData.resourceUrl);
                        twoMenu += '<li pageName="' + cData.resourceUrl + '">' + cData.resourceName + '</li>';
                    }
                    twoMenu += '</ul>';
                }
                $(".slidebar").append(menu).show();
                $(".page-content").append(twoMenu).show();
            };

            return $.commonAjax({
                type: "get",
                url: 'getSystemResourceTree',
                success: function (data) {
                    if (data.ok) {
                        showMenu(data.data);
                    } else {
                        console.log("获取登录信息失败:" + data.resDescription);
                    }
                }
            });
        },

        chkUserStatus: function () {
            $.commonAjax({
                type: "get",
                url: 'chkUserStatus',
                success: function (data) {
                    if (data.ok) {
                        console.log("用户正常登录中,session正常.-" + new Date().getTime())
                    } else {
                        window.location.href = "/";
                    }
                }
            });
        }

    };

    index.init();

});
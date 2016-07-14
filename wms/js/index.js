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

            var setSession = function (data) {
                sessionStorage.login_mobilePhone = data.mobilePhone;
                sessionStorage.login_userType = data.userType;
                sessionStorage.login_id = data.id;
                sessionStorage.login_openId = data.openId;
                sessionStorage.login_parentId = data.parentId;
                sessionStorage.login_agentsBusinessId = data.agentsBusinessId;
                sessionStorage.login_manuId = data.manuId;
            };

            var jumpPage = function (data) {
                if (data.userType == 0) {
                    window.location.href = 'secondreg?fullscreen';
                    $(".container-fixed").fadeIn();
                } else if (data.userType == 3) {
                    window.location.href = 'waitCheck?fullscreen';
                    $(".container-fixed").fadeIn();
                }
                if (sessionStorage.login_mobilePhone) {
                    if ((sessionStorage.login_mobilePhone != undefined) &&
                        (sessionStorage.login_mobilePhone != "")) {
                        $("#login-name").html(sessionStorage.login_mobilePhone.substring(0, 3) +
                            "****" + sessionStorage.login_mobilePhone.substring(7));
                    }
                } else {
                    window.location.href = "/";
                }
            };

            return $.commonAjax({
                type: "get",
                url: 'getLoginUser',
                success: function (data) {
                    if (data.ok) {
                        setSession(data.data);
                        jumpPage(data.data);
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
                    menu += '<ul class="nav slidebar-title otherMenu" auth="' + data[i].id + '">' +
                        '<li><i class="shop"></i>' + data[i].resourceName + '</li></ul>';

                    twoMenu += '<ul class="slidebar-menu clearFix childmenu other" auth="' + data[i].id + '">';
                    var childrenLen = data[i].children && data[i].children.length;
                    for (var j = 0; j < childrenLen; j++) {
                        var cData = data[i].children[j];
                        cData.resourceUrl && own.pageName.push(cData.resourceUrl);
                        twoMenu += '<li pageName="' + cData.resourceUrl + '">' + cData.resourceName + '</li>';
                    }
                    twoMenu += '</ul>';
                }

                // TODO 仅作调试使用
                menu += '<ul class="nav slidebar-title repertoryMenu" auth="1113">' +
                    '<li><i class="goods"></i>仓库管理</li></ul>';

                twoMenu += '<ul class="slidebar-menu clearFix childmenu repertory" auth="1113">' +
                    '<li pageName="shipmentManage">出库管理</li>' +
                    '<li pageName="inventoriesManage">库存管理>' +
                    '<li pageName="receiptManage">入库管理</li></ul>';

                $(".slidebar").append(menu).show();
                $(".page-content").append(twoMenu).show();

                $(".container-fixed").fadeIn();
                $(".slidebar-title").fadeIn();
            };

            var menuEvent = function () {
                $("ul.otherMenu").find("li").on("click", function () {
                    var authNum = $(this).attr("auth"),
                        $firstChild = $(".page-content").find("[auth=" + authNum + "]").find("li").eq(0),
                        pageName = $firstChild.attr("pageName");

                    window.location.href = pageName;
                });
                $("ul.repertoryMenu").on("click", function () {
                    var $thisMenu = $(this),
                        authNum = $thisMenu.attr("auth"),
                        $firstChild = $(".page-content").find("[auth=" + authNum + "]").find("li").eq(0),
                        pageName = $firstChild.attr("pageName");

                    $thisMenu.siblings(".active").addClass("animateSlidebar").removeClass("active");
                    $thisMenu.addClass("active").removeClass("animateSlidebar");

                    $(".slidebar-menu").hide();
                    $(".page-content").find("[auth=" + authNum + "]").show();
                    $(".page-content").find("[auth=" + authNum + "]").find("li").show();
                    $firstChild.addClass("active").siblings().removeClass("active");
                    $.derect('.work-space-active', pageName, null, 'changeurl', '');
                });

                $("ul.repertory").find("li").bind("click", function () {
                    var pageName = $(this).attr("pageName");
                    $(this).addClass("active").siblings().removeClass("active");
                });
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
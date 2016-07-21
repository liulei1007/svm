$(function () {

    var index = {

        pageName: [],

        init: function () {
            // 判断用户是否登录
            setInterval(this.chkUserStatus(), 30000);

            this.loginName();
            this.bindEvent();
            this.getUserAuth();
        },

        loginName: function () {
            if (sessionStorage.login_mobilePhone) {
                if ((sessionStorage.login_mobilePhone != undefined) &&
                    (sessionStorage.login_mobilePhone != "")) {
                    $("#login-name").html(sessionStorage.login_mobilePhone.substring(0, 3) +
                        "****" + sessionStorage.login_mobilePhone.substring(7));
                }
            } else {
                window.location.href = "/";
            }
        },

        bindEvent: function () {
            $("div.index-head-user").bind("mouseenter", function () {
                $("div.index-head-user .ihu-title-block").show();
            }).bind("mouseleave", function () {
                $("div.index-head-user .ihu-title-block").hide();
            });

            $("div.ihu-changepwd").bind("click", function () {
                window.location.href = '/changepwd';
                return false;
            });
            $("div.index-head-logo").bind("click", function () {
                window.location.href = '/index';
                return false;
            });
            $("div.ihu-exit").bind("click", function () {
                $.commonAjax({
                    type: "post",
                    url: "logout",
                    success: function (data) {
                        if (data.ok) {
                            window.location.href = "../";
                            sessionStorage.clear();
                        }
                    }
                });
            });
        },

        /**
         * 获取url？参数
         * @param name
         * @returns {*}
         */
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
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

                $("div.slidebar").html('').append(menu).show();
                $("div.page-content .menu").html('').append(twoMenu);
                var auth = $.session.svm_menu_suth;
                if (auth) {
                    var $menu = $('div.slidebar').find("[auth=" + auth + "]"),
                        checkPage = $.session.wms_check_page === 'undefined' ? '' : $.session.wms_check_page,
                        $firstChild = $("div.page-content").find('[pagename="/wms/' + (checkPage || utils.getPageUrl()) + '"]'),
                        pageName = $firstChild.attr("pageName");

                    $.session.nowPageName = pageName;
                    $(".page-content").find("[auth=" + auth + "]").show();
                    $(".page-content").find("[auth=" + auth + "]").find("li").show();
                    $menu.siblings().removeClass('active');
                    $menu.addClass('active');
                    $firstChild.addClass("active").siblings().removeClass("active");
                }

                $(".container-fixed").fadeIn();
            };

            var menuEvent = function () {

                $("ul.slidebar-title").on("click", function () {
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
                    if (pageName && pageName.indexOf('wms') !== -1) {
                        $.session.svm_menu_suth = authNum;
                        $.directPage(pageName);
                    } else {
                        window.location.href = '/' + pageName;
                    }
                });

                $("ul.slidebar-menu").find("li").on("click", function () {
                    var authNum = $(this).parent().attr("auth"),
                        pageName = $(this).attr("pageName");

                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');

                    $.session.svm_menu_suth = authNum;
                    $.directPage(pageName);
                });
            };

            return $.commonAjax({
                type: "get",
                url: 'getSystemResourceTree',
                success: function (data) {
                    if (data.ok) {
                        showMenu(data.data);
                        menuEvent();
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
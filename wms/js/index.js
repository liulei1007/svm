$(function () {
    //判断用户是否登录
    setInterval(chkUserStatus, 30000);
    //显示登录名称
    if ((sessionStorage.login_mobilePhone != undefined) && (sessionStorage.login_mobilePhone != "")) {
        $("#login-name").html(sessionStorage.login_mobilePhone.substring(0, 3) + "****" + sessionStorage.login_mobilePhone.substring(7));
    }
    pathInit();
    plumeLog("进入index模板自定义js-" + plumeTime());

    $(".page-content").on("click", ".welcome", function () {
        derict(this, "welcome", "nochangeurl");
    }).on("click", ".agencyList", function () {
        derict(this, "agencyList", "nochangeurl");
    });

    $("[pageName=agencyCreateCompany]").bind("click", function () {
        derict(this, "agencyCreateCompany", "nochangeurl");
    });
    $("[pageName=agencyCreatePersonal]").bind("click", function () {
        derict(this, "agencyCreatePersonal", "nochangeurl");
    });
    $("[pageName=agencyShowCompany]").bind("click", function () {
        derict(this, "agencyShowCompany", "nochangeurl");
    });
    $("[pageName=agencyShowPersonal]").bind("click", function () {
        derict(this, "agencyShowPersonal", "nochangeurl");
    });
    $("[pageName=agencyAddAccount]").bind("click", function () {
        derict(this, "agencyAddAccount", "nochangeurl");
    });

    $("[pageName=shopListAgency]").bind("click", function () {
        derict(this, "shopListAgency", "nochangeurl");
    });
    $("[pageName=shopCreateAgency]").bind("click", function () {
        derict(this, "shopCreateAgency", "nochangeurl");
    });
    $("[pageName=shopShowAgency]").bind("click", function () {
        derict(this, "shopShowAgency", "nochangeurl");
    });

    $("[pageName=shopList]").bind("click", function () {
        derict(this, "shopList", "nochangeurl");
    });

    $("[pageName=releaseSelfGoods]").bind("click", function () {
        derict(this, "releaseSelfGoods", "nochangeurl")
    });

    $("[pageName=seriesManage]").bind("click", function () {
        derict(this, "seriesManage", "nochangeurl");
    });
    $("[pageName=goodsDataManage]").bind("click", function () {
        derict(this, "goodsDataManage", "nochangeurl");
    });
    $("[pageName=goodsAuditManage]").bind("click", function () {
        derict(this, "goodsAuditManage", "nochangeurl");
    });
    $("[pageName=addGoodsData]").bind("click", function () {
        derict(this, "addGoodsData", "nochangeurl");
    });
    $("[pageName=batchlead]").bind("click", function () {
        derict(this, "batchlead", "nochangeurl");
    });
    $("[pageName=noCompleteData]").bind("click", function () {
        derict(this, "noCompleteData", "nochangeurl");
    });
    $("[pageName=amendmentInfo]").bind("click", function () {
        derict(this, "amendmentInfo", "nochangeurl");
    });
    $("[pageName=takingGoodsData]").bind("click", function () {
        derict(this, "takingGoodsData", "nochangeurl");
    });
    $("[pageName=groundGoods]").bind("click", function () {
        derict(this, "groundGoods", "nochangeurl");
    });
    $("[pageName=applySeries]").bind("click", function () {
        derict(this, "applySeries", "nochangeurl");
    });
    $("[pageName=createMyGoods]").bind("click", function () {
        derict(this, "createMyGoods", "nochangeurl");
    });
    $("[pageName=applyPriceTagManage]").bind("click", function () {
        derict(this, "applyPriceTagManage", "nochangeurl")
    });
    $("[pageName=idmanage]").bind("click", function () {
        derict(this, "idmanage", "nochangeurl");
    });
    $("[pageName=msgmanage]").bind("click", function () {
        derict(this, "msgmanage", "nochangeurl");
    });
    $("[pageName=changepwd]").bind("click", function () {
        derict(this, "changepwd", "nochangeurl");
    });
    $("[pageName=brandList]").bind("click", function () {
        derict(this, "brandList", "nochangeurl");
    });
    $("[pageName=brandAdd]").bind("click", function () {
        derict(this, "brandAdd", "nochangeurl");
    });
    $("[pageName=reviewList]").bind("click", function () {
        derict(this, "reviewList", "nochangeurl");
    });
    $("[pageName=reviewShowCompany]").bind("click", function () {
        derict(this, "reviewShowCompany", "nochangeurl");
    });
    $("[pageName=reviewShowPersonal]").bind("click", function () {
        derict(this, "reviewShowPersonal", "nochangeurl");
    });
    $("[pageName=reviewCompany]").bind("click", function () {
        derict(this, "reviewCompany", "nochangeurl");
    });
    $("[pageName=reviewPersonal]").bind("click", function () {
        derict(this, "reviewPersonal", "nochangeurl");
    });
    $("[pageName=importGoods]").bind("click", function () {
        derict(this, "importGoods", "nochangeurl");
    });
    $("[pageName=mytable]").bind("click", function () {
        derict(this, "mytable", "nochangeurl");
    });
    $("[pageName=goodsCreate]").bind("click", function () {
        derict(this, "userType", "nochangeurl");
    });
    $("[pageName=goodsCheckfailManage]").bind("click", function () {
        derict(this, "goodsCheckfailManage", "nochangeurl");
    });
    $("[pageName=goodsDraft]").bind("click", function () {
        derict(this, "goodsDraft", "nochangeurl");
    });

    // 一级菜单点击显示二级菜单，并且显示二级菜单中头一个页面
    $(".slidebar-title").bind("click", function () {
        var $thisMenu = $(this);
        $thisMenu.addClass("active").siblings().removeClass("active");
        var authNum = $(this).attr("auth");
        $(".slidebar-menu").hide();
        $(".page-content").find("[auth=" + authNum + "]").slideDown();
        var $firstChild = $(".page-content").find("[auth=" + authNum + "]").find("li").eq(0);
        var pageName = $firstChild.attr("pageName");
        $firstChild.addClass("active").siblings().removeClass("active");
        derict(this, pageName, "nochangeurl");
    });
    $(".childmenu").find("li").bind("click", function () {
        var pageName = $(this).attr("pageName");
        $(this).addClass("active").siblings().removeClass("active");
    });
    $(".index-head-user").bind("mouseenter", function () {
        $(".index-head-user .ihu-title-block").show();
    }).bind("mouseleave", function () {
        $(".index-head-user .ihu-title-block").hide();
    });
    $(".ihu-exit").bind("click", function () {
        $.ajax({
            type: "post",
            url: plumeApi["logout"],
            contentType: "application/json",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.ok) {
                    window.location.href = "../";
                    sessionStorage.clear();
                }
            }
        });
    });
    $(".ihu-changepwd").bind("click", function () {
        window.location.href = "changepwd";
    });
    $(".index-head-logo").bind("click", function () {
        window.location.href = "index";
    });
});
function onePageCount() {
    var h = $(window).height();
    var h1 = $(".title-block").height() + 30;
    var h2 = $(".search-block").height() + 20;
    var h3 = $(".alert-info").height() + 20;
    var h4 = $(".btn-block").height() + 40;
    // var n=parseInt((h-h1-h2-h3-h4-105)/40);
    n = 11;
    $(".table-block").css({"height": 40 * n});
    return n - 1;
}
//检测session失效
function chkUserStatus() {
    $.ajax({
        type: "get",
        url: plumeApi["chkUserStatus"],
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            try {
                if (data.ok) {
                    plumeLog("用户正常登录中,session未失效.")
                } else {
                    window.location.href = "/";
                }
            } catch (e) {
                window.location.href = "/";
            }

        }
    });
}
//页面定向
function derict(o, temp, cache, fun) {
    if (temp.indexOf("fullscreen") == -1) {
        if ($("[pageName=" + temp + "]").length == 1) {
            session.nowPageName = temp;
            $("[pageName=" + temp + "]").addClass("active").siblings().removeClass("active");
        }
    }
    $(".work-space").removeClass("work-space-active").hide().remove();
    $(".page-content").append('<div class="work-space work-space-active"></div>');
    $(".work-space-active").hide();
    $(this).html("").show();
    $(".work-space-active").loadTemp(temp, cache, fun);
    try {
        window.history.pushState({}, 0, temp)
    } catch (e) {
        plumeLog("提示:无法动态改变地址:" + e.message);
    }
}
//路由初始化
function pathInit() {
    plumeLog("进入pathInit-" + plumeTime());
    var path = window.location.href + "";
    if (path.indexOf(".html") != -1) {
        return;
    }
    var prams = path.substring(path.indexOf("?") + 1);
    var temp = path.substring(path.lastIndexOf("/") + 1);
    if (prams.indexOf("fullscreen") != -1) {
        $(".slidebar").hide();
        $(".page-content").show();
        $(".page-content").css({"left": 0});
        $(".container-fixed").fadeIn();
    } else {
        loading();
        getLoginInfoToSession();
        getAuth();
        getListSystemCode();
        $(".container-fixed").fadeIn();
    }
    try {
        if (temp != "index" && temp != "" && temp.indexOf("api") == -1) {
            $(".work-space").loadTemp(temp, "nochangeurl");
            $("[pageName=" + session.nowPageName + "]").addClass("active").parent().slideDown();
            var authNum = $("[pageName=" + session.nowPageName + "]").parent().attr("auth");
            $(".slidebar").find("[auth=" + authNum + "]").addClass("active");
        } else {
            $(".work-space").loadTemp("welcome", "nochangeurl");
        }
    } catch (e) {
        $(".work-space").loadTemp("welcome", "nochangeurl");
    }

}
//获取权限
function getAuth() {
    $(".slidebar-list li,.slidebar-title").show();
    $.ajax({
        type: "get",
        url: plumeApi["getSystemResourceTree"],
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.ok) {
                for (var i = 0; i < data.data.length; i++) {
                    var d = data.data[i];
                    for (var j = 0; j < d.children.length; j++) {
                        var c = d.children[j]
                        var resurl = c.resourceUrl;
                        $("." + resurl).show();
                        $("." + resurl).parent().parent().show();
                    }
                }
            } else {
                plumeLog("获取登录信息失败:" + data.resDescription);
            }
        }
    });
}
//获取当前登录用户信息，同时放入sessionStorage中
function getLoginInfoToSession() {
    $.ajax({
        type: "get",
        url: plumeApi["getLoginUser"],
        contentType: "application/json",
        dataType: "json",
        //async: false,
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
                    //window.location.href="secondreg?fullscreen";
                    derict(this, "secondreg?fullscreen", "nochangeurl");
                    $(".slidebar").hide();
                    $(".page-content").show();
                    $(".page-content").css({"left": 0});
                    $(".container-fixed").fadeIn();
                } else if (data.data.userType == 3) {
                    //window.location.href="waitCheck?fullscreen";
                    derict(this, "waitCheck?fullscreen", "nochangeurl");
                    $(".slidebar").hide();
                    $(".page-content").show();
                    $(".page-content").css({"left": 0});
                    $(".container-fixed").fadeIn();
                }
                if (sessionStorage.login_mobilePhone) {
                    if ((sessionStorage.login_mobilePhone != undefined) && (sessionStorage.login_mobilePhone != "")) {
                        $("#login-name").html(sessionStorage.login_mobilePhone.substring(0, 3) + "****" + sessionStorage.login_mobilePhone.substring(7));
                    }
                } else {
                    window.location.href = "/";
                }
            } else {
                plumeLog("获取登录信息失败:" + data.resDescription);
                //alert("获取登录信息失败!");
                window.location.href = "/";
            }
            unloading();
        }
    });
}
//获取基础数据
function getListSystemCode() {
    $.ajax({
        type: "get",
        url: plumeApi["listSystemCode"] + "/price_tpye",
        contentType: "application/json",
        dataType: "json",
        // async: false,
        success: function (data) {
            if (data.ok) {
                session.price_tpye = JSON.stringify(data);
            } else {
                plumeLog("获取price_tpye信息失败:" + data.resDescription);
            }
        }
    });
    $.ajax({
        type: "get",
        url: plumeApi["listSystemCode"] + "/product_lv",
        contentType: "application/json",
        dataType: "json",
        // async: false,
        success: function (data) {
            if (data.ok) {
                session.product_lv = JSON.stringify(data);
            } else {
                plumeLog("获取price_tpye信息失败:" + data.resDescription);
            }
        }
    });
    $.ajax({
        type: "get",
        url: plumeApi["listSystemCode"] + "/img_url",
        contentType: "application/json",
        dataType: "json",
        // async: false,
        success: function (data) {
            if (data.ok) {
                session.img_url = JSON.stringify(data);
            } else {
                plumeLog("获取price_tpye信息失败:" + data.resDescription);
            }
        }
    });
}
//设置基础数据
function setListSystemCode(data, val) {
    var str = ""
    for (var i = 0; i < data.data.length; i++) {
        var d = data.data[i];
        if (d.codeValueCode == val) {
            str = d.codeValueName;
            break;
        }
    }
    return str;
}

$.fn.extend({
    pop: function (temp, fun) {
        if (!($(".lockbg").length > 0)) {
            $(".work-space-active").append("<div class='lockbg'></div>");
        }
        $(".lockbg").fadeIn();
        var o = $(this);
        o.loadTemp(temp, "nochangeurl", function () {
            plumeLog("pop加载完毕." + plumeTime());
            o.show();
            try {
                if (fun) {
                    fun();
                }
            } catch (e) {
                plumeLog("提示:" + e.message);
            }
        });
    },
    pophide: function () {
        $(this).html("").hide();
        $(".lockbg").remove();
    }
});
//上传图片pop
function uploadPop(fun) {
    if (!($(".pop-upload").length > 0)) {
        $(".work-space-active").append("<div class='pop-upload popcenter'></div>");
    }
    $(".pop-upload").pop("popUpload", fun);
}
function closeUploadPop(fun) {
    $(".pop-upload").pophide();
    try {
        if (fun) {
            fun();
        }
    } catch (e) {
        plumeLog("提示:" + e.message);
    }
}

//loading
var transmit_a = 0;
var transmit_d = true;
var transmit_loop;
function transmit_showLoad() {
    $(".loading").hide();
    $($(".loading")[transmit_a]).show();
    if (transmit_d) {
        transmit_a++;
    } else {
        transmit_a--
    }
    if (transmit_a == 34) {
        transmit_d = false;
    }
    if (transmit_a == 0) {
        transmit_d = true;
    }
    transmit_loop = setTimeout("transmit_showLoad()", 35);
}
function loading() {
    if (!($(".lockbg").length > 0)) {
        $(document.body).append("<div class='lockbg'></div>");
        $(".lockbg").show();
    }

    if (!($(".loading").length > 0)) {
        var temp = '';
        for (var i = 1; i < 36; i = i + 1) {
            temp += '<div class="popcenter loading"><img src="images/loading/' + i + '.png"></div>';
        }
        $(document.body).append(temp);
        clearTimeout(transmit_loop)
        transmit_showLoad();
    }
}
function unloading() {
    $(".lockbg").fadeOut(function () {
        $(this).remove();

    });
    $(".loading").fadeOut(function () {
        $(this).remove();

    });
}

//弹出层
function popTips(popupTitle, popupIcon) {
    $('.pop').loadTemp("popTips", "nochangeurl", function () {
        $(".pop").find(".popup-title").html(popupTitle);
        $(".pop").find(".popup-icon").html('<i class=' + popupIcon + '></i>');
        $(".pop").find(".popup-info").html("确认");
    });
}

function showPopTips(popupTitle, popupIcon, popupTips) {
    $('.pop').loadTemp("popTips", "nochangeurl", function () {
        $(".pop").find(".popup-title").html(popupTitle);
        $(".pop").find(".popup-icon").html('<i class=' + popupIcon + '></i>');
        $(".pop").find(".popup-info").html(popupTips);
    });
}

// 检验单个必填项是否填写
function checkFormNull(checkObj) {
    // 如果当前输入框为不可修改状态，退出验证
    if ($(checkObj).prop("disabled")) {
        return true;
    }

    var $formBlock = $(checkObj).parents(".form-group");
    // 如果当前输入框已有其他提示信息，退出
    if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {
        return false;
    }
    if (!$(checkObj).val() || $(checkObj).val().trim() == "") {
        var tipsText = $(checkObj).parents(".form-group").find(".control-label span").html();
        $(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入' + tipsText + '</div>');
        return false;
    }
    else return true;
}

//页面回车事件
function keyDown(ele) {
    $("body").keydown(function () {
        if (event.keyCode == "13") {
            $(ele).click();
        }
    });
}
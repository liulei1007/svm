$(function () {
    //判断用户是否登录
    setInterval(chkUserStatus,60000);
    //显示登录名称
    if ((sessionStorage.login_mobilePhone!=undefined)&&(sessionStorage.login_mobilePhone!="")) {
        $("#login-name").html(sessionStorage.login_mobilePhone.substring(0, 3) + "****"+sessionStorage.login_mobilePhone.substring(7));
    }
   
    pathInit();
    plumeLog("进入index模板自定义js-" + plumeTime());

    $(".page-content").on("click", ".welcome", function() {
        derict(this, "welcome", "nochangeurl");
    }).on("click", ".agencyList", function() {
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
        $thisMenu.siblings(".active").addClass("animateSlidebar").removeClass("active");
        $thisMenu.addClass("active").removeClass("animateSlidebar");
        var authNum=$(this).attr("auth");
        $(".slidebar-menu,.slidebar-menu li").hide();
        $(".page-content").find("[auth="+authNum+"]").show();
        var $firstChild = $(".page-content").find("[auth="+authNum+"]").find("li").eq(0);
        PlumelistNodeShowOrder($firstChild);
        var pageName = $firstChild.attr("pageName");
        $firstChild.addClass("active").siblings().removeClass("active");
        derict(this, pageName, "nochangeurl");
    });
    $(".childmenu").find("li").bind("click",function(){
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
var PAGE_COUNT=11;
function onePageCount(){
    return PAGE_COUNT;
}
function setPageCount(){
    var h=$(window).height();
    var h1=$(".title-block").height()+30;
    var h2=$(".search-block").height()+20;
    var h3=$(".alert-info").height()+20;
    var h4=$(".btn-block").height()+40;
    var n=parseInt((h-h1-h2-h3-h4-105)/40);
    //n=11;
    if(n<2){
        n=2;
    }
    $(".table-block").css({"height":40*n});
    PAGE_COUNT= n-1;
}
//检测session失效
function chkUserStatus(){
    $.ajax({
        type: "get",
        url: plumeApi["chkUserStatus"],
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            try{
                if (data.ok) {
                    plumeLog("用户正常登录中,session正常.-"+plumeTime())
                } else {
                    window.location.href="/";
                }
            }catch(e){
                window.location.href = "/";
            }

        }
    });
}
//页面定向
var derict_lock = false;
function derict(o, temp, cache, fun) {
    if (derict_lock) {
        return;
    }
    if(temp.indexOf("fullscreen")==-1){
        if($("[pageName="+temp+"]").length==1){
            session.nowPageName=temp;
            $("[pageName="+temp+"]").addClass("active").siblings().removeClass("active");
        }
    }
    derict_lock = true;
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
    derict_lock = false;
    return;
    $(".work-space").removeClass("work-space-active").fadeIn(function () {
        $(this).remove();
        $(".page-content").append('<div class="work-space work-space-active"></div>');
       // $(".work-space-active").loadTemp("transmit", "nochangeurl");
        $(".work-space-active").hide(function () {
            $(this).html("").show();
            $(".work-space-active").loadTemp(temp, cache, fun);
            try {
                window.history.pushState({}, 0, temp)
            } catch (e) {
                plumeLog("提示:无法动态改变地址:" + e.message);
            }
            derict_lock = false;
        });
    })
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
            $("[pageName="+session.nowPageName+"]").show();
            $("[pageName="+session.nowPageName+"]").siblings().show();
            $("[pageName="+session.nowPageName+"]").addClass("active").parent().show();
            var authNum=$("[pageName="+session.nowPageName+"]").parent().attr("auth");
            $(".slidebar").find("[auth="+authNum+"]").addClass("active");
        } else {
            $(".work-space").loadTemp("welcome", "nochangeurl");
        }
    } catch (e) {
        $(".work-space").loadTemp("welcome", "nochangeurl");
    }

}
//获取权限
function getAuth() {
    //$(".slidebar-list li,.slidebar-title").show();
    //return;
    $.ajax({
        type: "get",
        url: plumeApi["getSystemResourceTree"],
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.ok) {
                for (var i = 0; i < data.data.length; i++) {
                    var d = data.data[i];
                    var id= d.id;
                    $(".slidebar").find("[auth="+id+"]").show();
                    for (var j = 0; j < d.children.length; j++) {
                        var c = d.children[j]
                        var resurl = c.resourceUrl;

                       // $("." + resurl).show();
                       // $("." + resurl).parent().parent().show();
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
                if(data.data.userType==0){
                    //window.location.href="secondreg?fullscreen";
                    derict(this, "secondreg?fullscreen", "nochangeurl");
                    $(".slidebar").hide();
                    $(".page-content").show();
                    $(".page-content").css({"left": 0});
                    $(".container-fixed").fadeIn();
                }else if(data.data.userType==3){
                    //window.location.href="waitCheck?fullscreen";
                    derict(this, "waitCheck?fullscreen", "nochangeurl");
                    $(".slidebar").hide();
                    $(".page-content").show();
                    $(".page-content").css({"left": 0});
                    $(".container-fixed").fadeIn();
                }
                if (sessionStorage.login_mobilePhone) {
                    if ((sessionStorage.login_mobilePhone!=undefined)&&(sessionStorage.login_mobilePhone!="")) {
                        $("#login-name").html(sessionStorage.login_mobilePhone.substring(0, 3) + "****" +sessionStorage.login_mobilePhone.substring(7));
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
        url: plumeApi["listSystemCode"] + "/standard_unit",
        contentType: "application/json",
        dataType: "json",
        // async: false,
        success: function (data) {
            if (data.ok) {
                session.standard_unit = JSON.stringify(data);
            } else {
                plumeLog("获取standard_unit信息失败:" + data.resDescription);
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

//获取psgId
function getGoodsPsgId(_this) {
    var removeList = $(_this).parents('tr');
    var psgId = removeList.find('.psgId').html();
    session.goods_psgId = psgId;
}

//获取productId
function getProductId(_this) {
    var removeList = $(_this).parents('tr');
    var productId = removeList.find('.productId').html();
    session.productGoods_productId=session.goods_showMyGoods_productId= productId;
}

function getProductIdm(_this) {
    session.productGoods_productIdm = $(_this).attr("productId")
}


//获取brandId
function getBrandId(_this) {
    var removeList = $(_this).parents('tr');
    var brandId = removeList.find('.brandId').html();
    session.brand_brandId = brandId;
}


//获取shopId
function getShopId(_this) {
    var removeList = $(_this).parents('tr');
    var shopId = removeList.find('.shopId').html();
    session.shop_shopId = shopId;
}




//获取单个产品信息
function getProductInfo() {
    loading();
    try {
        $.ajax({
            url: plumeApi["getProductInfo"] +"/"+ session.productGoods_productId,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                unloading();
                 if(data.data.baseCategoryId==1){
                    $(".material").show();
                    $(".material_temp").hide();
                }else{
                    $(".material").hide();
                    $(".material_temp").show();
                }
                $('.form-horizontal').setPageData(data.data);
                $(".weight-info").html($(".weight-info").html()+"KG")
                $(".priceType-info").text(setListSystemCode(JSON.parse(session.price_tpye),$(".priceType-info").text()));
                $(".level-info").text(setListSystemCode(JSON.parse(session.product_lv),$(".level-info").text()));
                var trList;
                var color = {};
                var colorList = "";
                var size = {};
                var sizeList = "";
                var formsList = "";
                $(data.data.productGoods).each(function (i, data) {
                    color[data.color] = 1;
                    size[data.standard] = 1;
                    trList += '<tr><td class="color">' + data.color + '</td><td class="productGoodsId">' + data.productGoodsId + '</td><td class="size">' + data.standard + '</td><td>' + data.marketPrice + '</td><td><input type="text" class="form-control salePrice" /></td><td><select class="form-control priceType"><option value="1">明码实价</option><option value="2">明码议价</option></select></td><td><input type="text" class="form-control inventory "/></td><td><button type="button" class="btn btn-default btn-sm btn-delect">删除</button></td></tr>'
                });

                for (c in color) {
                    colorList += '<div class="checkbox-inline"><label><input type="checkbox" checked="checked" /><p>' + c + '</p></label></div>'
                }

                for (s in size) {
                    sizeList += '<div class="checkbox-inline"><label><input type="checkbox" checked="checked"/><p>' + s + '</p></label></div>'
                }
                $("tbody").append(trList);
                $(".taking-color").append(colorList);
                $(".taking-size").append(sizeList);

                var colorArr = [];
                var sizeArr = [];
                getColorArr();
                getSizeArr();
                function getColorArr() {
                    $(".taking-color input").each(function (i) {
                        if ($(this).prop('checked') === true) {
                            colorArr.push($(this).next('p').html());
                        }
                    });
                }

                function getSizeArr() {
                    $(".taking-size input").each(function (i) {
                        if ($(this).prop('checked') === true) {
                            sizeArr.push($(this).next('p').html());
                        }
                    });
                }


                function change() {
                    $('tbody tr').hide().each(function () {
                        var tr = $(this);
                        $(colorArr).each(function (i, c) {
                            if (c == tr.find(".color").html()) {
                                $(sizeArr).each(function (i, s) {
                                    if (s == tr.find('.size').html()) {
                                        tr.show();
                                    }
                                })
                            }
                        })
                    })
                }

                $(".taking-color input").bind("change", function () {
                    colorArr = [];
                    getColorArr();
                    change();
                });

                $(".taking-size input").bind("change", function () {
                    sizeArr = [];
                    getSizeArr();
                    change();
                })

                $(data.data.productInfoAttrORMs).each(function (i, good) {
                    formsList += '<div class="form-group"><label class="col-sm-3 control-label">' + good.productAttribute.attrNameBack + '：</label><p class="col-sm-6 form-control-static">' + good.attrValue + '</p></div>'
                });

                $(".forms-block").append(formsList);

            }
        });
    } catch (e) {
        window.location.href = "/";
    }
}

//新增店铺商品
function addProductShopGoods(body) {
    loading()
    $.ajax({
        url: plumeApi["addProductShopGoods"],
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(body),
        success: function (data) {
            if (data.ok) {
                unloading();
                popTips("商品调取成功", "success");
                derict(this, "takingGoodsData", "nochangeurl");
            } else {
                unloading();
                 $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("商品调取失败");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html(data.resDescription);
                    });
                //popTips("商品调取失败", "warning");
            }
        }
    });
}



//地区下拉列表
function getlistNationRegion() {
    $.get(plumeApi["listNationRegion"], {}, function (data) {
        $(".cmg-region1").setPageData(data);
        $(".cmg-region1").find(".form-control").bind("change", function () {
            var adresscode = $(this).find("option:selected").attr("adresscode");
            loading();
            $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                unloading();
                $(".cmg-region2").setPageData(data);
            });
        });
    });
}

// getlistNationRegion();


//时间戳转日期
function _getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().substr(0, 9)
}
// 提交成功
function submitRecord(turnURL, url, data) {
    $(".pop").loadTemp("popSubmitSuccess", "nochangeurl", function () {
        var timeOut = setTimeout(function () {
            turnPage(turnURL);
        }, 3000);
        $(".pop").on("click", ".btn-back", function () {
            clearTimeout(timeOut);
            turnPage(turnURL);
        });
    });
}
// 跳转页面
function turnPage(turnURL) {
    $(".pop").off("click", ".btn-back").hide().find(".popup").remove();
    derict(this, turnURL, "nochangeurl");
}
//表单控制
function formCtrl() {
    // $(".page-content").on("click", ".form-block-contractive .block-title", function () {
    $(".form-block-contractive").on("click", ".block-title", function () {
        var $formBlock = $(this).parents(".form-block-contractive");
        $formBlock.toggleClass("contractive");
        if ($formBlock.hasClass("contractive")) {
            $(this).siblings(".form-horizontal").slideUp();
        }
        else {
            $(this).siblings(".form-horizontal").slideDown();
        }
    });
}
//表格全选
function tablecheckbox() {
    $(".table-block").find("thead input:checkbox").bind("click", function () {
        var c = $(this).is(':checked');
        $(".table-block").find("tbody input:checkbox").prop("checked", c);
    });
}
//pop
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
        //for (var i = 1; i < 36; i++) {
        //<img src="images/loading/35.png">
        temp+='';
        //temp += '<div class="popcenter1 loading-img"></div>';
        temp += '<div class="popcenter loading"></div>';
        //}
        $(document.body).append(temp);
        //clearTimeout(transmit_loop)
        //transmit_showLoad();
    }
}
function unloading() {
    $(".lockbg").fadeOut(function(){
        $(this).remove();

    });
    $(".loading,.loading-img").fadeOut(function(){
        $(this).remove();

    });

}

// 检验表单中的必填项是否填写
function checkForm() {
    // 必填项输入框或文本框失去焦点时，检查输入是否为空
    $(".body-typein").on("blur", ".form-group.required input, .form-group.required textarea", function () {
        checkNull($(this));
    });
}
// 检验单个必填项是否填写
function checkNull(checkObj) {
    // 清除可能存在的提示信息
    $(checkObj).parents(".form-group").removeClass("has-warning").find(".alert").remove();
    if ($(checkObj).val().trim() == "") {
        $(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入</div>');
        return false;
    }
    else return true;
}

// 单笔自采商品操作
function checkSelfGoods(operateName, selfGoods, url) {
    var flag = true;
    // 首先检验必填项是否都已经填写
    $(".body-typein").find(".form-group.required input, .form-group.required textarea").each(function () {
        if (!checkNull($(this))) {
            flag = false;
        }
    });
    if (flag) {
        // 获取表单中填入的信息
        selfGoods.brandName = $("#brandName").val().trim();
        selfGoods.pdtName = $("#pdtName").val().trim();
        selfGoods.categoryId = $("#sortSelect").val();
        selfGoods.categoryName = $("#sortSelect option:selected").text();

        selfGoods.pgtType = $("#pgtType").val().trim();
        selfGoods.standard = $("#standard").val().trim();
        selfGoods.standardUnit = $("#orgSize select").prop('value');
        selfGoods.material = $("#material").val();
        selfGoods.orgName = $("#orgName").val().trim();
        selfGoods.priceType = $("#priceType").val().trim();
        selfGoods.salePrice = $("#salePrice").val().trim();
        selfGoods.discount = $("#discount").val().trim();
        selfGoods.inventory = $("#inventory").val().trim();
        selfGoods.saleStatus = $('#saleStatus input[name="status"]:checked').val();
        // 操作数据库
        controlSelfGoods(operateName, selfGoods, url);
    }
}
// 单笔自采商品数据库操作
function controlSelfGoods(operateName, selfGoods, url) {
    loading();
    var newData = JSON.stringify(selfGoods);
    $.ajax({
        url: url,
        type: "POST",
        data: newData,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            unloading();
            if (result.ok) {
                $('.pop').loadTemp("popTips", "nochangeurl", function () {
                    $(".pop").find(".popup-title").html(operateName + "自采商品");
                    $(".pop").find(".popup-icon").html('<i class="success"></i>');
                    $(".pop").find(".popup-info").html("自采商品" + operateName + "成功！");
                });
            }
            else {
                $('.pop').loadTemp("popTips", "nochangeurl", function () {
                    $(".pop").find(".popup-title").html(operateName + "自采商品");
                    $(".pop").find(".popup-icon").html('<i class="danger"></i>');
                    $(".pop").find(".popup-info").html("自采商品" + operateName + "失败！");
                });
            }
            derict(this, "releaseSelfGoods", "nochangeurl");
        },
        error: function (error) {
            console.log(error);
        }
    });
}

// 获取自采商品信息
function getSelfData(showObj, stashId) {
    loading();
    $.ajax({
        url: plumeApi["getProductStashById"] + stashId,
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            unloading();
            var data = result.data;
            $(showObj).find("#brandName").val(data.brandName);
            $(showObj).find("#stashId").text(data.stashId);
            $(showObj).find("#pdtName").val(data.pdtName);
            $(showObj).find("#sortSelect").html('<option value="' + data.categoryId + '">' + data.categoryName + '</option>');
            // 获取商品一级分类信息
            getFirstCategory(showObj, data.categoryId);

            $(showObj).find("#pgtType").val(data.pgtType);
            $(showObj).find("#standard").val(data.standard);
            $(showObj).find("#material").val(data.material);
            // 单位名称
            $(showObj).find("#orgName option[value='" + data.orgName + "']").prop("selected", "selected");
            // 价格类型
            $(showObj).find("#priceType option[value='" + data.priceType + "']").prop("selected", "selected");
            $(showObj).find("#salePrice").val(data.salePrice);
            $(showObj).find("#discount").val(data.discount);
            $(showObj).find("#inventory").val(data.inventory);
            // 状态
            $(showObj).find("#saleStatus input[value='" + data.saleStatus + "']").prop("checked", "checked");
        },
        error: function (er) {
        }
    });
}


// 获取产品一级分类
function getFirstCategory(showObj, categoryId) {
    $.ajax({
        url: plumeApi["listProductCategory"],
        type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var sortHtml = "";
            result.data.map(function (sort) {
                if (sort.categoryId == categoryId) {
                    sortHtml += '<option value=' + sort.categoryId + ' selected="selected">' + sort.categoryName + '</option>';
                }
                else {
                    sortHtml += '<option value=' + sort.categoryId + '>' + sort.categoryName + '</option>';
                }
            });
            $(showObj).find("#sortSelect").html(sortHtml);
        },
        error: function (error) {
            console.log(error);
        }
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


// 检验表单中的必填项是否填写
function formControl() {
    // 必填项输入框或文本框失去焦点时，检查输入是否为空
    $(".body-typein").on("focus", ".form-group input, .form-group textarea, .form-group select", function() {
        // 清除可能存在的提示信息
        $(this).parents(".form-group").removeClass("has-warning").removeClass("has-error").find(".alert").remove();
    }).on("blur", ".form-group.required input, .form-group.required textarea", function () {
        checkFormNull($(this));
    }).on("blur", ".form-group.required select", function() {
        checkFormNull($(this));
    });
}
// 检验单个必填项是否填写
function checkFormNull(checkObj) {
    // 如果当前输入框为不可修改状态，退出验证
    if ($(checkObj).prop("disabled")) { return true; }

    var $formBlock = $(checkObj).parents(".form-group");
    // 如果当前输入框已有其他提示信息，退出
    if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {
        return false;
    }
    if (!$(checkObj).val() || $(checkObj).val().trim() == "") {
        var tipsText = $(checkObj).parents(".form-group").find(".control-label span").html();
        $(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入' + tipsText + '</div>');
        // $(checkObj).parent().after('<div class="col-sm-2 alert alert-default">请输入' + tipsText + '</div>').parents(".form-group").addClass("has-warning");
        return false;
    }
    else return true;
}

var ifPhoneSuccess = false;

// 检验手机号码
function checkPhone(checkObj, checkType) {
	// 清除可能存在的提示信息
	$(checkObj).parents(".form-group").removeClass("has-warning").removeClass("has-error").find(".alert").remove();
	ifPhoneSuccess = false;
	// 首先判断是否为空
	if (checkFormNull($(checkObj))) {
		// 其次判断是否符合手机号规则
		if (!isMobile($(checkObj).val().trim())) {
			$(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入' + tipsText + '</div>');
			// $(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入正确的手机号码</div>');
			return;
		}
		// 最后判断手机号是否已经存在
		checkPhoneExist($(checkObj), checkType);
	}
}

// 判断手机号是否已存在
function checkPhoneExist(checkObj, checkType){
	var phone = $(checkObj).val().trim();
	$.ajax({
		type: "get",
		url: plumeApi["getUserInfoByMobile"] + phone,
		contentType: "application/json",
		dataType: "json",
		success: function (data) {
			if (data.ok) {
				if (checkType == "create") { ifPhoneSuccess = true; }
				else if (checkType == "edit") {
					ifPhoneSuccess = false;
					$(checkObj).parents(".form-group").addClass("has-error").append('<div class="col-sm-2 alert alert-danger">该手机号码未注册</div>');
				}
			}
			else if (data.data == null) {
				ifPhoneSuccess = false;
				$(checkObj).parents(".form-group").addClass("has-error").append('<div class="col-sm-2 alert alert-danger">手机号码是否存在检查异常</div>');
			}
			else if(data.data > 0) {
				if (checkType == "create") {
					ifPhoneSuccess = false;
					$(checkObj).parents(".form-group").addClass("has-error").append('<div class="col-sm-2 alert alert-danger">手机号码已经存在</div>');
				}
				else if (checkType == "edit") { ifPhoneSuccess = true; }
			}
			else {
				ifPhoneSuccess = false;
				$(checkObj).parents(".form-group").addClass("has-error").append('<div class="col-sm-2 alert alert-danger">手机号码检查接口返回值不能识别</div>');
			}
		}
	});
}

// 检验是否为浮点小数
function checkFloat(checkObj) {
    var $formBlock = $(checkObj).parents(".form-group");
    // 如果当前输入框已有其他提示信息，退出
    if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {
        return false;
    }
	// 首先判断是否为空
	if ($(checkObj).val() && $(checkObj).val().trim() != "") {
		// 其次判断是否符合数字规则
		if (!isFloat($(checkObj).val())) {
			var tipsText = $(checkObj).parents(".form-group").find(".control-label span").html();
			$(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入正确的' + tipsText + '</div>');
			return false;
		}
	}
	return true;
}

// 检验是否为电话
function checkTel(checkObj) {
    var $formBlock = $(checkObj).parents(".form-group");
    // 如果当前输入框已有其他提示信息，退出
    if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {
        return false;
    }
    // 首先判断是否为空
    if ($(checkObj).val() && $(checkObj).val().trim() != "") {
        // 其次判断是否符合电话
        if (!isTel($(checkObj).val().trim())) {
            var tipsText = $(checkObj).parents(".form-group").find(".control-label span").html();
            $(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入正确的' + tipsText + '</div>');
            return false;
        }
    }
    return true;
}

//只输入数字
function onlyNum() {
   //alert(event.keyCode)
    if(event.shiftKey&&(!(event.keyCode==46)&&!(event.keyCode==8))){
        event.returnValue=false;
    }
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39)&&!(event.keyCode==16))
    if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)||(event.keyCode==190)))
    event.returnValue=false;
}

//页面回车事件
function keyDown(ele){
    $("body").keydown(function() {
             if (event.keyCode == "13") {
                 $(ele).click();
             }
    });
}

var key = {
    keydownEnter: function(ele) {
        $("body").bind('keydown',function() {
            if (event.keyCode == "13") {
                $(ele).click();
            }
        });
    },
    unkeydownEnter: function(ele){
        $("body").unbind();
    }
}



function isFloat(num) {
	return /^[0-9]+.?[0-9]*$/.test(num);
}

//密码验证: 6-15位字符，建议数字和字母组合
function pwdCheck(pwd) {
    return /^[0-9A-Za-z]{6,15}$/.test(pwd);
}

//手机号验证
function isMobile(n) {
    return /^1\d{10}$/.test(n) && n != 11111111111;
}

// 电话号码
function isTel(tel) {
    var rule = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$)/;
    return rule.test(tel);
}


// 关闭大图显示
function closeBigImage() {
	$(".form-loading .media-show").remove();
}
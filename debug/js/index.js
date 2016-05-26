$(function () {
//显示登录名称
    if (sessionStorage.login_mobilePhone) {
        $("#login-name").html(sessionStorage.login_mobilePhone.substring(0, 7) + "****");
    }
    pathInit();
    plumeLog("进入index模板自定义js-" + plumeTime());
    $(".welcome").bind("click", function () {
        derict(this, "welcome", "nochangeurl");
    });
    $(".test").bind("click", function () {
        derict(this, "test", "nochangeurl");
    });
    $(".test1").bind("click", function () {
        derict(this, "test1", "nochangeurl");
    });
    $(".agencyList").bind("click", function () {
        derict(this, "agencyList", "nochangeurl");
    });
    $(".agencyCreateCompany").bind("click", function () {
        derict(this, "agencyCreateCompany", "nochangeurl");
    });
    $(".agencyCreatePersonal").bind("click", function () {
        derict(this, "agencyCreatePersonal", "nochangeurl");
    });
    $(".agencyShowCompany").bind("click", function () {
        derict(this, "agencyShowCompany", "nochangeurl");
    });
    $(".agencyShowPersonal").bind("click", function () {
        derict(this, "agencyShowPersonal", "nochangeurl");
    });
    $(".agencyAddAccount").bind("click", function () {
        derict(this, "agencyAddAccount", "nochangeurl");
    });

    $(".shopListAgency").bind("click", function () {
        derict(this, "agencyCreatePersonal", "nochangeurl");
    });
    $(".shopCreateAgency").bind("click", function () {
        derict(this, "shopCreateAgency", "nochangeurl");
    });
    $(".shopShowAgency").bind("click", function () {
        derict(this, "shopShowAgency", "nochangeurl");
    });

    $(".shopList").bind("click", function () {
        derict(this, "shopList", "nochangeurl");
    });

    $('.releaseSelfGoods').bind("click", function () {
        derict(this, "releaseSelfGoods", "nochangeurl")
    });

    $(".seriesManage").bind("click", function () {
        derict(this, "seriesManage", "nochangeurl");
    });
    $(".goodsDataManage").bind("click", function () {
        derict(this, "goodsDataManage", "nochangeurl");
    });
    $(".goodsAuditManage").bind("click", function () {
        derict(this, "goodsAuditManage", "nochangeurl");
    });
    $(".addGoodsData").bind("click", function () {
        derict(this, "addGoodsData", "nochangeurl");
    });
    $(".batchlead").bind("click", function () {
        derict(this, "batchlead", "nochangeurl");
    });
    $(".noCompleteData").bind("click", function () {
        derict(this, "noCompleteData", "nochangeurl");
    });
    $(".amendmentInfo").bind("click", function () {
        derict(this, "amendmentInfo", "nochangeurl");
    });
    $(".takingGoodsData").bind("click", function () {
        derict(this, "takingGoodsData", "nochangeurl");
    });
    $(".groundGoods").bind("click", function () {
        derict(this, "groundGoods", "nochangeurl");
    });
    $(".applySeries").bind("click", function () {
        derict(this, "applySeries", "nochangeurl");
    });
    $(".createMyGoods").bind("click", function () {
        derict(this, "createMyGoods", "nochangeurl");
    });
    $(".applyPriceTagManage").bind("click", function () {
        derict(this, "applyPriceTagManage", "nochangeurl")
    });
    $(".idmanage").bind("click", function () {
        derict(this, "idmanage", "nochangeurl");
    });
    $(".msgmanage").bind("click", function () {
        derict(this, "msgmanage", "nochangeurl");
    });
    $(".changepwd").bind("click", function () {
        derict(this, "changepwd", "nochangeurl");
    });
    $(".brandList").bind("click", function () {
        derict(this, "brandList", "nochangeurl");
    });
    $(".brandAdd").bind("click", function () {
        derict(this, "brandAdd", "nochangeurl");
    });
    $(".reviewList").bind("click", function () {
        derict(this, "reviewList", "nochangeurl");
    });
    $(".reviewShowCompany").bind("click", function () {
        derict(this, "reviewShowCompany", "nochangeurl");
    });
    $(".reviewShowPersonal").bind("click", function () {
        derict(this, "reviewShowPersonal", "nochangeurl");
    });
    $(".reviewCompany").bind("click", function () {
        derict(this, "reviewCompany", "nochangeurl");
    });
    $(".reviewPersonal").bind("click", function () {
        derict(this, "reviewPersonal", "nochangeurl");
    });
    $(".mytable").bind("click", function () {
        derict(this, "mytable", "nochangeurl");
    });
    $('.userType').bind("click", function () {
        derict(this, "userType", "nochangeurl");
    })
    // 左侧导航栏鼠标滑过显示二级分类
    $(".slidebar-title").bind("mouseenter", function () {
        $(this).find(".slidebar-list").show();
    }).bind("mouseleave", function () {
        $(this).find(".slidebar-list").hide();
    });
    // 左侧导航栏二级分类点击隐藏
    $(".slidebar-list li").bind("click", function () {
        $(this).parents(".slidebar-list").hide().parents(".slidebar-title").addClass("active").siblings().removeClass("active");
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
})
var derict_lock = false;
function derict(o, temp, cache, fun) {
    if (derict_lock) {
        return;
    }
    derict_lock = true;
    $(".work-space").removeClass("work-space-active").fadeOut(function () {
        $(this).remove();
        $(".page-content").append('<div class="work-space work-space-active"></div>');
        $(".work-space-active").loadTemp("transmit", "nochangeurl");
        $(".work-space-active").fadeOut(function () {
            $(this).html("").fadeIn();
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
        getLoginInfoToSession();
        //获取登录信息放入session中
        loading();
       // getLoginInfoToSession();
        getAuth();
        getListSystemCode();
        unloading();
        //$(".slidebar-title,.auth-menu-ul li").show();
        //var auth = sessionStorage.auth;
        //if (auth) {
        //    $(".slidebar-title").each(function () {
        //        var slidebarAuth = $(this).attr("auth");
        //        if (auth.indexOf(slidebarAuth) != -1) {
        //            $(this).show();
        //        } else {
        //            $(this).hide();
        //        }
        //    });
        //}
        $(".container-fixed").fadeIn();
    }
    try {
        if (temp != "index" && temp != "" && temp.indexOf("api") == -1) {
            $(".work-space").loadTemp(temp, "nochangeurl");
        } else {
            $(".work-space").loadTemp("welcome", "nochangeurl");
        }
    } catch (e) {
        $(".work-space").loadTemp("welcome", "nochangeurl");
    }

}

function getAuth() {
    $.ajax({
        type: "get",
        url: plumeApi["getSystemResourceTree"],
        contentType: "application/json",
        dataType: "json",
        async: false,
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
        async: false,
        success: function (data) {
            if (data.ok) {
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
                sessionStorage.login_mobilePhone = data.data.mobilePhone;
                sessionStorage.login_userType = data.data.userType;
                sessionStorage.login_id = data.data.id;
                sessionStorage.login_openId = data.data.openId;
                sessionStorage.login_parentId = data.data.parentId;
                sessionStorage.login_agentsBusinessId = data.data.agentsBusinessId;
                sessionStorage.login_manuId = data.data.manuId;
                if (sessionStorage.login_mobilePhone) {
                    $("#login-name").html(sessionStorage.login_mobilePhone.substring(0, 7) + "****");
                } else {
                    window.location.href = "/";
                }
            } else {
                plumeLog("获取登录信息失败:" + data.resDescription);
                //alert("获取登录信息失败!");
                window.location.href = "/";
            }
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
        async: false,
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
        async: false,
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
        async: false,
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


//获取商品信息
function getGoodsInfo() {
    try {
        loading();
        $.ajax({
            url: plumeApi["getProductShopGoods"] + session.goods_psgId,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                unloading();
                $('.body-typein').setPageData(data.data);
                var formsList = "";
                $(data.data.productGoodsORM.productInfoORM.productInfoAttrORMs).each(function (i, good) {
                    formsList += '<div class="form-group"><label class="col-sm-3 control-label">' + good.productAttribute.attrNameBack + '：</label><p class="col-sm-6 form-control-static">' + good.attrValue + '</p></div>'
                });
                $(".forms-block").append(formsList);
                $(".weight-info").html($(".weight-info").html()+"KG")
                 $(".priceType-info").text(setListSystemCode(JSON.parse(session.price_tpye),$(".priceType-info").text()));
                 $(".level-info").text(setListSystemCode(JSON.parse(session.product_lv),$(".level-info").text()));
                 if(data.data.saleStatus==1){
                     $(".taking-size input").eq(0).attr('checked','checked');
                 }else{
                    $(".taking-size input").eq(1).attr('checked','checked');
                 }
            }
        })
    } catch (e) {
        window.location.href = "/";
    }
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


//待审核产品列表
function listProductInfoUpt() {
    $.ajax({
        url: plumeApi["listProductInfoUpt"],
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(
            {
                "productName": "",
                "seriesName": "",
                "saleStatus": ""
            }
        ),
        success: function (data) {
            if (data.ok) {
                unloading();
                $("[list-node]").remove();
                $(".form-body").setPageData(data);
            } else {
                alert('error');
            }
        }
    })
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
                popTips("商品调取失败", "warning");
                derict(this, "takingGoodsData", "nochangeurl");
            }
        }
    });
}

//编辑店铺商品
function editProductShopGoods() {
    var price = $("#price").val();
    var priceType = $("#priceType").val();
    var inventory = $("#inventory").val();
    var saleStatus = $("input[name='ground']:checked").val()
    loading();
    $.ajax({
        url: plumeApi["editProductShopGoods"],
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(
            {
                "psgId": session.goods_psgId,
                "salePrice": price,
                "priceType": priceType,
                "inventory": inventory,
                "saleStatus": saleStatus
            }
        ),
        success: function (data) {
            if (data.ok) {
                unloading();
                popTips("商品编辑成功", "success");
                derict(this, "groundGoods", "nochangeurl");
            } else {
                unloading();
                popTips("商品编辑失败", "warning");
                derict(this, "groundGoods", "nochangeurl");
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
    //console.log("::::::::::::" + nS + ";");
    return new Date(parseInt(nS)).toLocaleString().substr(0, 10)
}
//alert(getLocalTime(18100000001));
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
        $(".work-space-active").append("<div class='lockbg'></div>");
        $(".lockbg").show();
    }

    if (!($(".loading").length > 0)) {
        var temp = '';
        for (var i = 1; i < 36; i++) {
            temp += '<div class="popcenter loading"><img src="images/loading/' + i + '.png"></div>';
        }
        $(".work-space-active").append(temp);
        clearTimeout(transmit_loop)
        transmit_showLoad();
    }
}
function unloading() {
    $(".lockbg").remove();
    $(".loading").remove();
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
        $(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-info">请输入</div>');
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
        selfGoods.material = $("#material").val().trim();
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


//分页
function newPage(totalPage, fun) {
    var Tf = false
    var nowPage = 1;
    loadPagination(nowPage, totalPage);

    // 如果总页数大于5, 还需显示跳转表单
    if (totalPage > 10) {
        var turnHtml = '';
        turnHtml += '<div class="turn">';
        turnHtml += '<span>跳转到</span>';
        turnHtml += '<input type="text" id="turnTo" class="form-control" />';
        turnHtml += '<div class="btn btn-default btn-go">GO</div>';
        turnHtml += '</div>';
        $(".nav-pagination").prepend(turnHtml);
    }

    // 绑定分页点击事件
    $(".nav-pagination").on("click", ".num", function () {
        // 防止点击当前页
        if ($(this).hasClass("active")) {
            return;
        }

        nowPage = parseInt($(this).attr("data-page"));
        loadPagination(nowPage, totalPage);
    }).on("click", ".first", function () {
        // 防止当前已是最前页
        if ($(this).hasClass("disabled")) {
            return;
        }

        nowPage = parseInt($(".nav-pagination").find(".num").eq(0).attr("data-page"));
        loadPagination(nowPage, totalPage);
    }).on("click", ".last", function () {
        // 防止当前已是最后页
        if ($(this).hasClass("disabled")) {
            return;
        }

        nowPage = parseInt($(".nav-pagination").find(".num").last().attr("data-page"));
        loadPagination(nowPage, totalPage);
    });
    // 绑定跳转页面
    $(".nav-pagination").on("click", ".btn-go", function () {
        // 确保输入的数字
        if (!isNaN(parseInt($("#turnTo").val()))) {
            nowPage = parseInt($("#turnTo").val());
            loadPagination(nowPage, totalPage);
        }
    });


    function loadPagination(nowPage, totalPage) {

        var paginationHtml = '';
        // 回到最前页按钮
        if (nowPage == 1) {
            paginationHtml += '<li class="first disabled"><span>&laquo;</span></li>';
        }
        else paginationHtml += '<li class="first"><span>&laquo;</span></li>';

        // 如果总页数小于或者等于10
        if (totalPage <= 10) {
            for (var i = 0; i < totalPage; i++) {
                if (i == nowPage - 1) {
                    paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                }
                else paginationHtml += '<li class="num" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
            }
        }
        // 如果总页数大于10, 需显示"..."
        else {
            // 如果当前页 < 6, 左侧显示7个页码, 右侧显示2个页码
            if (nowPage < 6) {
                // 左侧7个页码
                for (var i = 0; i < 7; i++) {
                    if (i == nowPage - 1) {
                        paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                    }
                    else paginationHtml += '<li class="num" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                }
                // 中间"..."
                paginationHtml += '<li class="more"><span>...</span></li>';
                // 右侧2个页码
                paginationHtml += '<li class="num" data-page="' + (totalPage - 1) + '"><span>' + (totalPage - 1) + '</span></li>';
                paginationHtml += '<li class="num" data-page="' + totalPage + '"><span>' + totalPage + '</span></li>';
            }
            // 如果总页数 - 当前页 < 5, 左侧显示2个页码, 右侧显示7个页码
            else if (totalPage - nowPage < 5) {
                // 左侧2个页码
                paginationHtml += '<li class="num" data-page="1"><span>1</span></li>';
                paginationHtml += '<li class="num" data-page="2"><span>2</span></li>';
                // 中间"..."
                paginationHtml += '<li class="more"><span>...</span></li>';
                // 右侧7个页码
                for (var i = totalPage - 7; i < totalPage; i++) {
                    if (i == nowPage - 1) {
                        paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                    }
                    else paginationHtml += '<li class="num" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                }
            }
            // 否则, 左侧显示1个页码, 中间显示5个页码, 右侧显示2个页码
            else {
                // 左侧2个页码
                paginationHtml += '<li class="num" data-page="1"><span>1</span></li>';
                paginationHtml += '<li class="num" data-page="2"><span>2</span></li>';
                // 中间"..."
                paginationHtml += '<li class="more"><span>...</span></li>';
                // 中间5个页码
                for (var i = (nowPage - 3); i < (nowPage + 2); i++) {
                    if (i == nowPage - 1) {
                        paginationHtml += '<li class="num active" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                    }
                    else paginationHtml += '<li class="num" data-page="' + (i + 1) + '"><span>' + (i + 1) + '</span></li>';
                }
                // 中间"..."
                paginationHtml += '<li class="more"><span>...</span></li>';
                // 右侧2个页码
                paginationHtml += '<li class="num" data-page="' + (totalPage - 1) + '"><span>' + (totalPage - 1) + '</span></li>';
                paginationHtml += '<li class="num" data-page="' + totalPage + '"><span>' + totalPage + '</span></li>';
            }
        }

        // 跳到最后页按钮
        if (nowPage == totalPage) {
            paginationHtml += '<li class="last disabled"><span>&raquo;</span></li>';
        }
        else paginationHtml += '<li class="last"><span>&raquo;</span></li>';
        $(".pagination").html(paginationHtml);
        if (fun) {
            if (Tf) {fun(nowPage);}
            Tf = true;
        }
    }
}


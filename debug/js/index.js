$(function () {
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
        derict(this, "shopListAgency", "nochangeurl");
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
        window.location.href = "login";
    });
    $(".ihu-changepwd").bind("click", function () {
        window.location.href = "changepwd";
    });
    $(".index-head-logo").bind("click", function () {
        window.location.href = "index";
    });
});
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
        $(".work-space-active").delay(800).fadeOut(function () {
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
        $(".page-content").css({"width": ($(window).width() - 10), "left": 0});
        $(".container-fixed").fadeIn();
    } else {
        var auth = sessionStorage.auth;
        if (auth) {
            $(".slidebar-title").each(function () {
                var slidebarAuth = $(this).attr("auth");
                if (auth.indexOf(slidebarAuth) != -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
        $(".container-fixed").fadeIn();
    }
    try {
        if (temp != "index" && temp != "") {
            $(".work-space").loadTemp(temp, "nochangeurl");
        } else {
            $(".work-space").loadTemp("welcome", "nochangeurl");
        }
    } catch (e) {
        $(".work-space").loadTemp("welcome", "nochangeurl");
    }

}


//换取psgId
function getGoodsPsgId(_this) {
    var removeList = $(_this).parents('tr');
    var psgId = removeList.find('.psgId').html();
    session.goods = {psgId: psgId};
}

//换取productId
function getProductId(_this) {
    var removeList = $(_this).parents('tr');
    var productId = removeList.find('.productId').html();
    session.productGoods = {productId: productId};
}


//换取商品信息
function getGoodsInfo() {
    try {
        loading();
        $.ajax({
            url: "http://192.168.222.162:8080/productShopGoods/getProductShopGoods/" + session.goods.psgId,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                unloading();
                $('.body-typein').setPageData(data.data);
            }
        })
    } catch (e) {
        window.location.href = "/debug/"
    }
}

//获取单个产品信息
function getProductInfo() {
    loading();
    try {
        $.ajax({
            url: "http://192.168.222.162:8080/productInfo/getProductInfo/" +session.productGoods.productId,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                unloading();
                $('.body-typein').setPageData(data.data);
                var trList;
                var color = {};
                var colorList = "";
                var size = {};
                var sizeList = "";
                $(data.data.productGoods).each(function (i, data) {
                    color[data.color] = 1;
                    size[data.standard] = 1
                    trList += '<tr><td class="color">' + data.color + '</td><td class="productGoodsId">' +data.productGoodsId+ '</td><td class="size">' + data.standard + '</td><td>' + data.marketPrice + '</td><td><input type="text" class="form-control salePrice" /></td><td><select class="form-control priceType"><option value="1">明码实价</option><option value="2">明码议价</option></select></td><td><input type="text" class="form-control inventory "/></td><td><button type="button" class="btn btn-default btn-sm btn-delect">删除</button></td></tr>'
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
                getColorArr()
                getSizeArr()
                function getColorArr() {
                     $(".taking-color input").each(function(i) {
                        if($(this).prop('checked')===true){
                            colorArr.push($(this).next('p').html());      
                        }
                    });
                }

                 function getSizeArr() {
                     $(".taking-size input").each(function(i) {
                        if($(this).prop('checked')===true){
                            sizeArr.push($(this).next('p').html());      
                        }
                    });
                }


                function change() {
                     $('tbody tr').hide().each(function() {
                        var tr =$(this);
                        $(colorArr).each(function(i,c) {
                            if(c==tr.find(".color").html()){
                               $(sizeArr).each(function(i,s) {
                                    if(s==tr.find('.size').html()){
                                        tr.show();
                                    }
                               })
                            }
                        })
                    })
                }

                $(".taking-color input").bind("change",function() {
                    colorArr =[];
                    getColorArr();
                    change();
                });

                $(".taking-size input").bind("change",function() {
                    sizeArr=[];
                    getSizeArr();
                    change();
                })

            
              
            }
        });
    } catch (e) {
        window.location.href = "/debug/";
    }
}


//上下架商品列表
function getGoodsData(productName, modelNumber, saleStatus) {
    loading();
    $.ajax({
        url: "http://192.168.222.162:8080/productShopGoods/listProductShopGoods",
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(
            {
                "productName": productName,
                "modelNumber": modelNumber,
                "saleStatus": saleStatus
            }
        ),
        success: function (data) {
            unloading();
            $("[list-node]").remove();
            $(".table-block").setPageData(data);
            $('.createDate').each(function () {
                $(this).html(getLocalTime($(this).html()));
                var aTr = $(this).parents('tr');
                var saleStatus = aTr.find('.saleStatus');
                var btnGround = aTr.find('.btn-ground');
                if (saleStatus.html() == 0) {
                    saleStatus.html('下架中');
                    btnGround.html('上架');
                } else {
                    saleStatus.html('上架中');
                    btnGround.html('下架');
                }
            })
        }
    });
}

//工厂商品列表
function getProductGoodsData(keyword) {
    loading();
    $.ajax({
        url: "http://192.168.222.162:8080/productShopGoods/listProductGoods",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        data: {"keyword": keyword},
        success: function (data) {
            unloading();
            $("[list-node]").remove();
            $(".table-block").setPageData(data);
        }
    });
}


//商品上架
function groundGoods() {
    loading();
    $.ajax({
        url: "http://192.168.222.162:8080/productShopGoods/enableProductShopGoods/" + session.goods.psgId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            unloading();
            getGoodsData()
        }
    });
}

function soldOutGoods() {
    loading();
    $.ajax({
        url: "http://192.168.222.162:8080/productShopGoods/disableProductShopGoods/" + session.goods.psgId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        data: {"keyword": keyword},
        success: function (data) {
            unloading();
            getGoodsData()
        }
    });
}


//新增店铺商品
function addProductShopGoods(body) {
     $.ajax({
        url: "http://192.168.222.162:8080/productShopGoods/addProductShopGoods",
        type: "POST",
        contentType: "application/json;charset=UTF-8",
            data: {"body": JSON.stringify(body)},
            success: function (data) {
                alert(1)
            }
    });
} 


//删除商品数据
function delectGoodsData() {

    $('.pop').loadTemp("popConfirm", "nochangeurl", function () {
        // 改变弹出框中文字和图标显示
        $(".pop").find(".popup-title").html("删除确认？");
        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
        $(".pop").find(".popup-info").html("是否确认删除记录？");
        // 绑定按钮事件
        $('.pop').on('click', '.btn-sure', function () {
            loading();
            $.ajax({
                url: "http://192.168.222.162:8080/productShopGoods/delProductShopGoods/" + session.goods.psgId,
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    unloading();
                    getGoodsData()
                }
            });
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
        $('.pop').on('click', '.btn-cancel', function () {
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
    });
}

//时间戳转日期
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 10)
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

//缓存接口
var session = function () {
    return {};
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
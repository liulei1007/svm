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
    $(".shopAlterAgency").bind("click", function () {
        derict(this, "shopAlterAgency", "nochangeurl");
    });

    $(".shopList").bind("click", function () {
        derict(this, "shopList", "nochangeurl");
    });
    $(".shopCreate").bind("click", function () {
        derict(this, "shopCreate", "nochangeurl");
    });
    $(".shopShowCompany").bind("click", function () {
        derict(this, "shopShowCompany", "nochangeurl");
    });
    $(".shopAlter").bind("click", function () {
        derict(this, "shopAlter", "nochangeurl");
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
        $(".work-space-active").delay(300).fadeOut(function () {
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
    plumeLog("进入setPrams-" + plumeTime());
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

function delectData(_this) {
    var removeList = $(_this).parents('tr');
    $('.pop').loadTemp("popConfirmDelete", "nochangeurl", function () {
        $('.pop').on('click', '.btn-sure', function () {
            removeList.remove();
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        });
        $('.pop').on('click', '.btn-cancel', function () {
            $('.pop').hide();
            $('.pop').off('click', '.btn-sure');
            $('.pop').off('click', '.btn-cancel');
        })
    });
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
    $(".table-block").find("table").find("th").find("input:checkbox").bind("click",function(){
        var c=$(this).is(':checked');
        $(".table-block").find("table").find("td").find("input:checkbox").prop("checked",c);
    });
}
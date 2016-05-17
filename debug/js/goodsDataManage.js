$(function () {
    plumeLog("进入goodsDataManage模板自定义js-" + plumeTime());
    getTableData();
    tablecheckbox();
    $(".btn-primary").bind("click", function () {
        derict(this, "userType", "nochangeurl");
    });
    function getTableData() {
        loading();
        var pram_str = '{';
        pram_str += '"productName": "",';
        pram_str += ' "modelNumber": "",';
        pram_str += '  "categoryId": 0,';
        pram_str += ' "saleStatus": ""';
        pram_str += '}';
        $.ajax({
            type: "POST",
            url: plumeApi["listProductInfo"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                $(".gdm-table-data").setPageData(data);

                $(".gdm-btn-del").unbind().bind("click", function () {
                    if (confirm("是否确认删除?")) {
                        loading();
                        var productId = $(this).parent().parent().children().first().attr("productId");
                        $.get(plumeApi["delProductInfo"] + "/" + productId, {}, function (data) {
                            unloading();
                            if (data.ok) {
                                $("[list-node]").remove();
                                getTableData();
                                $('.pop').loadTemp("popTips", "nochangeurl", function () {
                                    $(".pop").find(".popup-title").html("信息提示");
                                    $(".pop").find(".popup-icon").html('<i class="success"></i>');
                                    $(".pop").find(".popup-info").html("删除成功");
                                });
                            } else {
                                $('.pop').loadTemp("popTips", "nochangeurl", function () {
                                    $(".pop").find(".popup-title").html("信息提示");
                                    $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                                    $(".pop").find(".popup-info").html("删除失败");
                                });
                            }
                        });
                    }
                });

                $(".gdm-btn-edit").unbind().bind("click", function () {
                    var productId = $(this).parent().parent().children().first().attr("productId");
                    session.goods_edit_productId=productId;
                    derict(this, "editMyGoods", "nochangeurl");
                });
                $('.gdm-btn-open').each(function () {
                    if ($(this).html() == 1) {
                        $(this).html('禁用');
                    } else {
                        $(this).html('启用');
                    }
                })

            }
        });
    }

    $(".table-block").on("click", ".gdm-btn-open", function () {
        getProductId(this);
        var _this = this;
        $.ajax({
            url: "http://192.168.222.162:8080/productInfo/enableSaleStatus/" + session.productGoods_productId,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                unloading();
                if ($(_this).html() == "禁用") {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("已禁用");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("禁用成功");
                    });
                } else {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("已启用");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("启用成功");
                    });
                }
                getTableData();
            }
        })
    })


});

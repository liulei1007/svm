$(function () {
    plumeLog("进入goodsDataManage模板自定义js-" + plumeTime());
    var datas = {
        "productName": "",
        "modelNumber": "",
        "categoryId": "",
        "subCategoryId": "",
        "baseCategoryId": "",
        "saleStatus": "",
        "reviewStatus": 0,
        "seriesName": ""
    }
    getTableData();
    tablecheckbox();
    $(".gdm-add-goods").bind("click", function () {
        derict(this, "userType", "nochangeurl");
    });
    $(".gdm-btn-search").bind("click", function () {
        var productName = $("#productName").val();
        var modelNumber = $("#modelNumber").val();
        var baseCategoryId = $("#baseCategoryId").val();
        var saleStatus = $("#saleStatus").val();
        var subCategoryId = $("#subCategoryId").val();
        var categoryId = $("#categoryId").val();
        var reviewStatus = $("#reviewStatus").val();
        var saleStatus = $("#saleStatus").val();
        datas.productName = productName;
        datas.modelNumber = modelNumber;
        datas.categoryId = categoryId;
        datas.subCategoryId = subCategoryId;
        datas.baseCategoryId = baseCategoryId;
        datas.saleStatus = saleStatus;
        datas.reviewStatus = reviewStatus;
        datas.seriesName = saleStatus;
        getTableData();
    });
//分类
    var cls = ["gdm-type-first", "gdm-type-second", "gdm-type-third"];

    function getFirstCategory(categoryId, tag) {
        loading();
        $.get(plumeApi["listProductCategory"] + "/" + categoryId, {}, function (data) {
            unloading();
            $("." + cls[tag]).find("[list-node]").remove();
            $("." + cls[tag]).setPageData(data);
            $("." + cls[tag]).find("select").unbind().bind("change", function () {
                var nowtag = parseInt($(this).attr("tag")) + 1;
                var cid = $(this).val();
                if (nowtag < 3) {
                    getFirstCategory(cid, nowtag)
                }
            });
        })
    }

    getFirstCategory(0, 0);
//获取表格数据
    function getTableData() {
        var newData = JSON.stringify(datas)
        loading();
        $.ajax({
            type: "POST",
            url: plumeApi["listProductInfo"] + "?currentPage=1&onePageCount=10",
            data: newData,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                totalPage = Math.ceil(data.countRecord / 10);
                newPage(totalPage, function (i) {
                    loading();
                    $.ajax({
                        type: "POST",
                        url: plumeApi["listProductInfo"] + "?currentPage=" + i + "&onePageCount=10",
                        data: newData,
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            unloading();
                            $("[list-node]").remove();
                            $(".gdm-table-data").setPageData(data);
                            binFun()
                        }
                    });
                });
                $(".gdm-table-data").find("[list-node]").remove();
                $(".gdm-table-data").setPageData(data);
                binFun()
            }
        });
    }

    $(".table-block").on("click", ".gdm-btn-open", function () {
        getProductIdm(this);
        var _this = this;
        if ($(this).attr("saleStatus") == 1) {

            $.ajax({
                url: plumeApi["disableSaleStatus"] + session.productGoods_productIdm,
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    unloading();
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("已禁用");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("禁用成功");
                    });
                    getTableData();
                }
            });
        } else {
            $.ajax({
                url: plumeApi["enableSaleStatus"] + session.productGoods_productIdm,
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    unloading();
                    $(_this).removeClass("gdm-off")
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("已启用");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("启用成功");
                    });
                    getTableData();
                }
            });
        }

    });


//批量导入按钮
    $(".btn-import-data").bind("click", function () {
        $('.pop').loadTemp("popUpLoadBatch", "nochangeurl", function () {
            $('#myform').ajaxForm(function (data) {
                unloading();
                if (data.ok) {
                    alert("上传成功");
                    $('.pop').hide();
                } else {
                    alert(data.resDescription || data.data);
                    $('.pop').hide();
                }
            });
            $('.btn-cancel').bind('click', function () {
                $(".pop").hide();
            })


            $(".ex-ok").bind("click", function () {
                if (($("#file").val())) {
                    $('#myform').submit();
                }
            });

            $(".btn-selectType").bind('click', function () {
                $(".pop").hide();
                derict(this, "userType2", "nochangeurl");
            });

            $(".text-bottom1 .btn-loadModule").bind("click", function () {
                window.location = "https://longguo.mmall.com/api/excel/exportProductGoodsTemplate/1/5/61/5"
            });

            $(".text-bottom2 .btn-loadModule").bind("click", function () {
                window.location = "https://longguo.mmall.com/api/excel/exportProductGoodsTemplate/2/22/215/5"
            });
        });
    })

//按钮绑定方法
    function binFun() {
        //$(".gdm-btn-del").unbind().bind("click", function () {
        //    if (confirm("是否确认删除?")) {
        //        loading();
        //        var uptid = $(this).attr("uptid");
        //        $.get(plumeApi["delProductInfo"] + "/" + uptid, {}, function (data) {
        //            unloading();
        //            if (data.ok) {
        //                $("[list-node]").remove();
        //                getTableData();
        //                $('.pop').loadTemp("popTips", "nochangeurl", function () {
        //                    $(".pop").find(".popup-title").html("信息提示");
        //                    $(".pop").find(".popup-icon").html('<i class="success"></i>');
        //                    $(".pop").find(".popup-info").html("删除成功");
        //                    setTimeout(function () {
        //                        window.location.reload();
        //                    }, 1000);
        //                });
        //            } else {
        //                $('.pop').loadTemp("popTips", "nochangeurl", function () {
        //                    $(".pop").find(".popup-title").html("信息提示");
        //                    $(".pop").find(".popup-icon").html('<i class="warning"></i>');
        //                    $(".pop").find(".popup-info").html("删除失败");
        //                    setTimeout(function () {
        //                        window.location.reload();
        //                    }, 1000);
        //                });
        //            }
        //        });
        //    }
        //});

        $(".gdm-btn-edit").unbind().bind("click", function () {
            session.goods_showMyGoods_uptId = $(this).attr("uptid");
            derict(this, "editMyGoods", "nochangeurl");
        });
        $('.gdm-btn-open').each(function () {
            if ($(this).attr("saleStatus") == 1) {
                $(this).html('禁用');
            } else {
                $(this).html('启用');
            }
        });
        $(".gdm-btn-edit").unbind().bind("click", function () {
            session.goods_showMyGoods_uptId = $(this).attr("uptid");
            session.goods_showMyGoods_type = "edit";
            derict(this, "myGoods", "nochangeurl");
        });
        $('.gdm-btn-copy').unbind().bind("click", function () {
            session.goods_showMyGoods_uptId = $(this).attr("uptid");
            session.goods_showMyGoods_type = "copy";
            derict(this, "myGoods", "nochangeurl");
        })
    }


//删除产品方法
//    function disableSaleStatus() {
//        $('.pop').loadTemp("popConfirm", "nochangeurl", function () {
//            // 改变弹出框中文字和图标显示
//            $(".pop").find(".popup-title").html("删除确认？");
//            $(".pop").find(".popup-icon").html('<i class="warning"></i>');
//            $(".pop").find(".popup-info").html("是否确认删除记录？");
//            $(".pop").find(".btn-sure").addClass("btn-danger").removeClass("btn-success");
//            // 绑定按钮事件
//            $('.pop').on('click', '.btn-sure', function () {
//                loading();
//                $.ajax({
//                    url: plumeApi["delProductShopGoods"] + "/" + session.goods_psgId,
//                    type: "GET",
//                    contentType: "application/json;charset=UTF-8",
//                    success: function (data) {
//                        if (data.ok) {
//                            unloading();
//                            popTips("删除成功", "success");
//                            getGoodsData();
//                        } else {
//                            unloading();
//                            popTips("删除失败", "warning");
//                            getGoodsData();
//                        }
//                    }
//                });
//                $('.pop').hide();
//                $('.pop').off('click', '.btn-sure');
//                $('.pop').off('click', '.btn-cancel');
//            });
//            $('.pop').on('click', '.btn-cancel', function () {
//                $('.pop').hide();
//                $('.pop').off('click', '.btn-sure');
//                $('.pop').off('click', '.btn-cancel');
//            });
//        });
//    }


//删除按钮
    $(".table-block").on("click", ".gdm-btn-del", function () {
        if (confirm("是否确认删除?")) {
            loading();
            var uptid = $(this).attr("uptid");
            $.get(plumeApi["delProductInfo"] + "/" + uptid, {}, function (data) {
                unloading();
                if (data.ok) {
                    $("[list-node]").remove();
                    getTableData();
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="success"></i>');
                        $(".pop").find(".popup-info").html("删除成功");
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    });
                } else {
                    $('.pop').loadTemp("popTips", "nochangeurl", function () {
                        $(".pop").find(".popup-title").html("信息提示");
                        $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                        $(".pop").find(".popup-info").html("删除失败");
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    });
                }
            });
        }
    });


});
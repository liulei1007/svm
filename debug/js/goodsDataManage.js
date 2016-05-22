$(function () {
    plumeLog("进入goodsDataManage模板自定义js-" + plumeTime());
    var datas = {
        "productName": "",
        "modelNumber": "",
        "categoryId": "",
        "subCategoryId": "",
        "baseCategoryId": "",
        "saleStatus": "",
        "reviewStatus": "",
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
            url: plumeApi["listProductInfo"]+"?currentPage=1&onePageCount=10",
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
                        url: plumeApi["listProductInfo"]+"?currentPage="+i+"&onePageCount=10",
                        data: newData,
                        contentType: "application/json",
                        dataType: "json",
                        success:function(data){
                            unloading();
                            $("[list-node]").remove();
                            $(".gdm-table-data").setPageData(data);
                            binFun()
                        }
                    });
                });
                $("[list-node]").remove();
                $(".gdm-table-data").setPageData(data);
                binFun()
            }
        });
    }

    $(".table-block").on("click", ".gdm-btn-open", function () {
        getProductId(this);
        var _this = this;
        $.ajax({
            url: plumeApi["editSaleStatus"]+"/" + session.productGoods_productId,
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

//批量导入按钮
    $(".btn-import-data").bind("click", function () {
        $('.pop').loadTemp("popUpLoadBatch", "nochangeurl", function () {
            $('#myform').ajaxForm(function (data) {
                unloading();
                if (data.ok) {
                    alert(1)
                } else {
                    alert(data.resDescription);
                }
            });
            $('.btn-cancel').bind('click',function() {
                $(".pop").hide();
            })

            $(".ex-ok").bind("click", function () {
                $('#myform').submit();
            });
            $(".btn-loadModule").bind("click", function () {
                window.location = plumeApi["exportProductGoodsTemplate"];
            });
        });
    })


//按钮绑定方法
    function binFun(){
        $(".gdm-btn-del").unbind().bind("click", function () {
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
            session.goods_showMyGoods_uptId = $(this).attr("uptid");
            derict(this, "editMyGoods", "nochangeurl");
        });
        $('.gdm-btn-open').each(function () {
            if ($(this).html() == 1) {
                $(this).html('禁用');
            } else {
                $(this).html('启用');
            }
        });
        $('.gdm-btn-copy').unbind().bind("click", function () {
            session.goods_showMyGoods_uptId = $(this).attr("uptid");
            derict(this, "copyMyGoods", "nochangeurl");
        })
    }

});



$(function () {
    plumeLog("进入goodsAuditManage模板自定义js-" + plumeTime());
    setPageCount();
    //初始化数据
    var datas = {
        "productName": "",
        "modelNumber": "",
        "categoryId": "",
        "subCategoryId": "",
        "baseCategoryId": "",
        "reviewStatus": "0",
        "seriesName": ""
    }
    listProductInfoUpt();
    tablecheckbox();
    //分类
    var cls = ["gam-type-first", "gam-type-second", "gam-type-third"];
    function getFirstCategory(categoryId, tag) {
        $.get(plumeApi["listProductCategory"] + "/" + categoryId, {}, function (data) {
            $("." + cls[tag]).find("[list-node]").remove();
            if(tag==1){
                $("." + cls[tag+1]).find("[list-node]").remove();
            }
            $("." + cls[tag]).setPageData(data);
            $("." + cls[tag]).find("select").unbind().bind("change", function () {
                var nowtag = parseInt($(this).attr("tag")) + 1;
                var cid = $(this).val();
                if (nowtag < 3) {
                    getFirstCategory(cid, nowtag);
                }
            });
        })
    }
    getFirstCategory(0, 0);
    $('.table-block').on('click', '.btn-audit', function () {
        var uptIds = [];
        uptIds.push($(this).attr("uptId"));
        auditFun(uptIds);
    });

    $('.btn-allAudit').click(function () {
        var uptIds = [];
        $('tbody input:checkbox').each(function (i, checkbox) {
            if ($(this).prop('checked') == true) {
                uptIds.push($(this).parents('tr').attr('uptId'));
            }
        });
        if (uptIds.length) {
            auditFun(uptIds);
        } else {
            popTips("您未选择审核商品", "warning");
        }
    });

//待审核产品列表
    function listProductInfoUpt() {
        loading();
        var newData = JSON.stringify(datas)
        $.ajax({
            url: plumeApi["listProductInfoUpt"] + "?currentPage=1&onePageCount="+onePageCount(),
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            data: newData,
            success: function (data) {
                if (data.ok) {
                    unloading();
                    $(".gam-table").find("[list-node]").remove();
                    $(".gam-table").setPageData(data);
                    $(".table-block").on("click", ".gam-btn-show", function () {
                        var uptId = $(this).attr("uptId");
                        session.goods_showMyGoods_uptId = uptId;
                        derict(this, "showMyGoods", "nochangeurl");
                    });

                    data.countRecord ? $('.infoNum').text(data.countRecord) : $('.infoNum').text(0);

                    totalPage = Math.ceil(data.countRecord / onePageCount());
                    newPage(totalPage, function (i) {
                        var newData = JSON.stringify(datas);
                        loading();
                        $.ajax({
                            url: plumeApi["listProductInfoUpt"] + "?currentPage=" + i + "&onePageCount="+onePageCount(),
                            type: "POST",
                            contentType: "application/json;charset=UTF-8",
                            data: newData,
                            success: function (data) {
                                unloading();
                                $(".gam-table").find("[list-node]").remove();
                                $(".gam-table").setPageData(data);
                            }
                        });
                    });
                } else {
                    console.log('error');
                }
            }
        })
    }

//商品审核
    function auditFun(uptIds) {
        $('.pop').loadTemp("popAudit", "nochangeurl", function () {
            $('.pop').on('click', '.btn-sure', function () {
                var audit = {
                    "uptIds": uptIds,
                    "reviewStatus": $('.reviewStatus').find("input[name='audit']:checked").val(),
                    "remark": $('.remark').val()
                };
                console.log(audit)
                loading();
                $.ajax({
                    url: plumeApi["reviewProductInfo"],
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(audit),
                    success: function (data) {
                        if (data.ok) {
                            unloading();
                            popTips("审核成功", "success");
                            listProductInfoUpt();
                        } else {
                            unloading();
                            $('.pop').loadTemp("popTips", "nochangeurl", function () {
                                $(".pop").find(".popup-title").html("审核失败");
                                $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                                $(".pop").find(".popup-info").html(data.resDescription);
                            });
                            listProductInfoUpt(); 
                        }
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

    function btnFunc() {
        $(".gam-btn-search").bind("click", function () {
            datas.productName = $("#agencyName").val();
            datas.reviewStatus = $("#reviewStatus").val();
            datas.modelNumber=$("#modelNumber").val();
            datas.baseCategoryId = $("#baseCategoryId").val();
            datas.subCategoryId = $("#subCategoryId").val();
            datas.categoryId = $("#categoryId").val();
            listProductInfoUpt();
            $(".nav-pagination").off();
        });
        $(".gam-btn-reload").click(function () {
            derict(null,"goodsAuditManage","nochangeurl");
        });
    }
    btnFunc();

  //回车搜索
    keyDown('.gam-btn-search');
});
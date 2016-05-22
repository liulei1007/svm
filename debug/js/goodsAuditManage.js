$(function () {
    //初始化数据
    datas = {
        "productName": "",
        "modelNumber": "",
        "categoryId": "",
        "subCategoryId": "",
        "baseCategoryId": "",
        "saleStatus": "",
        "reviewStatus": "",
        "seriesName": ""
    }


    listProductInfoUpt();
    tablecheckbox();
    $('.table-block').on('click', '.btn-audit', function () {
        var uptIds = [];
        uptIds.push($(this).parents("tr").find(".uptId").html());
        auditFun();
    });

    $('.btn-allAudit').click(function () {
        var uptIds = [];
        $('tbody input:checkbox').each(function (i, checkbox) {
            if ($(this).prop('checked') == true) {
                uptIds.push($(this).parents('tr').find('.uptId').html());
            }
        });
        auditFun();
    });


//待审核产品列表
    function listProductInfoUpt() {
        var newData = JSON.stringify(datas)
        $.ajax({
            url: plumeApi["listProductInfoUpt"],
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            data: newData,
            success: function (data) {
                if (data.ok) {
                    unloading();
                    $("[list-node]").remove();
                    $(".form-body").setPageData(data);
                    $(".gam-btn-show").bind("click", function () {
                        var uptId = $(this).attr("uptId");
                        session.goods_showMyGoods_uptId = uptId;
                        derict(this, "showMyGoods", "nochangeurl");
                    });


                    totalPage=Math.ceil(data.countRecord/10);
                    newPage(totalPage,function(i){
                    var newData = JSON.stringify(datas);
                         $.ajax({
                             url: plumeApi["listProductInfoUpt"],
                             type: "POST",
                             contentType: "application/json;charset=UTF-8",
                             data: newData,
                            success: function (data) {
                                    unloading();
                                    $("[list-node]").remove();
                                    $(".form-body").setPageData(data);
                            }
                         });
                    });
                } else {
                    console.log('error');
                }
            }
        })
    }

    function auditFun() {
        $('.pop').loadTemp("popAudit", "nochangeurl", function () {
            $('.pop').on('click', '.btn-sure', function () {
                var audit = {
                    "uptIds": uptIds,
                    "reviewStatus": $('.reviewStatus').find("input[name='audit']:checked").val(),
                    "remark": $('.remark').val()
                };
                loading();
                $.ajax({
                    url: plumeApi["reviewProductInfo"],
                    type: "POST",
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(audit),
                    success: function (data) {
                        if (data.ok) {
                            unloading();
                            totalPage = Math.ceil(data.countRecord / 10);
                            newPage(totalPage, function (i) {

                            })
                            popTips("审核成功", "success");
                            listProductInfoUpt();
                        } else {
                            unloading();
                            popTips("审核失败", "warning");
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

    function searchBtn(){
        $(".gam-btn-search").bind("click",function(){
            datas.productName=$("#agencyName").val();
            listProductInfoUpt();
        });
    }
    searchBtn();
});
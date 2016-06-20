$(function () {
    plumeLog("进入goodsCheckfailManage模板自定义js-" + plumeTime());
    //初始化数据
    var datas = {
        "productName": "",
        "modelNumber": "",
        "categoryId": "",
        "subCategoryId": "",
        "baseCategoryId": "",
        "reviewStatus": "2",
        "seriesName": ""
    }

    listProductInfoUpt();
    tablecheckbox();
    $('.table-block').on('click', '.gcm-btn-edit', function () {
        session.goods_showMyGoods_uptId = $(this).attr("uptid");
        session.goods_showMyGoods_type = "amend";
        session.goods_showMyGoods_page = "goodsCheckfailManage";
        derict(this, "myGoods", "nochangeurl");
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
                    $("[list-node]").remove();
                    $(".form-body").setPageData(data);
                    $(".table-block").on("click", ".gcm-btn-show", function () {
                        var uptId = $(this).attr("uptId");
                        session.goods_showMyGoods_uptId = uptId;
                        derict(this, "showMyGoods", "nochangeurl");
                    });

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

    function btnFunc() {
        $(".gcm-btn-search").bind("click", function () {
            datas.productName = $("#agencyName").val();
            listProductInfoUpt();
            $(".nav-pagination").off();
        });
        $(".gcm-btn-reload").click(function () {
            derict(null,"goodsCheckfailManage","nochangeurl");
        });
    }
    btnFunc();


      //回车搜索
    keyDown('.gcm-btn-search');
});
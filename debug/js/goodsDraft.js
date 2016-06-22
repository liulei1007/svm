$(function () {
    plumeLog("进入goodsDraft模板自定义js-" + plumeTime());
    setPageCount();
    var datas = {
        "page": 0,
        "limit": 0
    }
    getTableData();
    tablecheckbox();
    $(".gda-btn-search").bind("click", function () {
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
        getTableData();
        $(".nav-pagination").off();
    });
    $(".gdm-btn-reload").click(function () {
        derict(null, "goodsDataManage", "nochangeurl");
    });

//获取表格数据
    function getTableData() {
        datas.limit=onePageCount();
        datas.page=1;
        var newData = JSON.stringify(datas)
        loading();
        $.ajax({
            type: "POST",
            url: plumeApi["listDraft"],
            data: newData,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                totalPage = Math.ceil(data.countRecord / onePageCount());
                newPage(totalPage, function (i) {
                    loading();
                    datas.page=i;
                    $.ajax({
                        type: "POST",
                        url: plumeApi["listDraft"],
                        data: newData,
                        contentType: "application/json",
                        dataType: "json",
                        success: function (data) {
                            $(".gdm-table-data").find("[list-node]").remove();
                            $(".gdm-table-data").setPageData(data);
                            unloading();
                            binFun();
                            getFirstCategory(0, 0);
                        }
                    });
                });
                $(".gdm-table-data").find("[list-node]").remove();
                $(".gdm-table-data").setPageData(data);
                binFun();
                unloading();
            }
        });
    }

//按钮绑定方法
    function binFun() {
        $(".gda-btn-edit").unbind().bind("click", function () {
            session.goods_code=$(this).attr("code");
            session.goods_showMyGoods_type = "draft";
            session.goods_showMyGoods_page = "goodsDraft";
            derict(this, "myGoods", "nochangeurl");
        });
    }

//回车搜索
    $(".search-block input[type=text]").bind('focus',function() {
       key.keydownEnter('.gdm-btn-search');   
    });

    $(".search-block input[type=text]").bind('blur',function() {
       key.unkeydownEnter('.gdm-btn-search');   
    });    
});
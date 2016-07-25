$(function () {
    plumeLog("进入takingGoodsData模板自定义js-" + plumeTime());
    var datas = {
        "keyword": "",
        "currentPage": 0,
        "onePageCount": 10
    }

    $('.table-block').on('click', '.btn-taking', function () {
        getProductId(this);
        derict(this, "takingGoods", "nochangeurl");
    });

    $('.table-block').on('click', '.btn-compile', function () {

        derict(this, "editMyGoods", "nochangeurl");
    });

    $(".btn-search").bind('click', function () {
        datas.keyword = $('#keyword').val();
        getProductGoodsData()
        $(".nav-pagination").off();
        $(".page-search").show();
    });

    $('.btn-selfGoods').bind('click', function () {
        derict(this, "releaseSelfGoods", "nochangeurl");
    });


    //清空搜索
    $('.btn-empty').bind('click', function() {
        window.location.reload()
    });

//工厂商品列表
    $('.alert-info strong').html(0);
    function getProductGoodsData() {
        loading();
        $.ajax({
            url: plumeApi["listProductGoods"],
            type: "GET",
            data: datas,
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                totalPage = Math.ceil(data.countRecord / onePageCount());
                unloading();
                if (data.countRecord) {
                    $('.alert-info strong').html(data.countRecord);
                } else {
                    $('.alert-info strong').html(0);
                }
                $("[list-node]").remove();
                $(".table-block").setPageData(data);

                newPage(totalPage, function (i) {
                    datas.currentPage = i;
                    var newData = JSON.stringify(datas);
                    loading();
                    $.ajax({
                        url: plumeApi["listProductGoods"] + "?currentPage=" + i + "&onePageCount="+onePageCount(),
                        type: "GET",
                        data: datas,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            unloading();
                            $('.alert-info strong').html(data.countRecord);
                            $("[list-node]").remove();
                            $(".table-block").setPageData(data);
                        },
                    });
                });
            }
        });
    }

//回车搜索
    $(".search-block input[type=text]").bind('focus',function() {
       key.keydownEnter('.btn-search');
    });

    $(".search-block input[type=text]").bind('blur',function() {
       key.unkeydownEnter('.btn-search');   
    }); 
    
});
$(function () {
    setPageCount();
    var datas = {
        "start": 0,
        "limit": 0,
        "brandName": "",
        "contract": "",
        "contractTel": "",
        "objectId": 0
    };

    plumeLog("进入brandList模板自定义js-" + plumeTime());
    //getTableData();
    $(".btn-addbrand").bind("click", function () {
        session.pram1 = "xxxxx";
        derict(this, "brandAdd", "nochangeurl", function () {
            $(".ba-back").bind("click", function () {
                derict(this, "brandList", "nochangeurl");
            })
        });
    });

    $("tbody").on("click", '.bl-btn-look', function () {
        getBrandId(this);
        session.brand_type = "brand";
        derict(this, "brandListShow", "nochangeurl");
    }).on("click", ".btn-manage", function() {
        getBrandId(this);
        derict(this, "brandListManage", "nochangeurl");
    });

    $(".bl-btn-search").bind('click', function () {
        datas.brandName = $("#brandName").val();
        datas.contract = $("#contract").val();
        datas.contractTel = $("#contractTel").val();
        $.setSearchData(datas);
        getTableData();
        $(".nav-pagination").off();
    });

    //商品管理列表
    function getTableData() {
        $.commonAjax({
            url: "listAgentsBrandInfoList-brand",
            type: "POST",
            data: datas,
            list: true,
            success: function (data) {
                $("[list-node]").remove();
                $(".table-block").setPageData(data);
                totalPage = Math.ceil(data.countRecord / 10);
                newPage(totalPage, function (i) {
                    datas.start = (i - 1) * 10;
                    $.commonAjax({
                        url: "listAgentsBrandInfoList-brand",
                        type: "POST",
                        data: datas,
                        list: true,
                        success: function (data) {
                            $("[list-node]").remove();
                            $(".table-block").setPageData(data);
                        }
                    });
                });
            }
        });
    }

    getTableData();
    
//清空搜索
    $('.btn-empty').bind('click', function() {
        $.clearSearchData();
        derict(this, "brandList", "nochangeurl");
    });

//回车搜索
$(".search-block input[type=text]").bind('focus',function() {
   key.keydownEnter('.bl-btn-search'); 
});

$(".search-block input[type=text]").bind('blur',function() {
   key.unkeydownEnter('.bl-btn-search');   
});

});

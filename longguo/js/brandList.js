$(function () {
    setPageCount();
    var datas = {
        "start": 0,
        "limit": 0,
        "brandName": "",
        "contract": "",
        "contractTel": "",
        "objectId": 0
    }

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
        datas.contractTel = $("#telNumber").val();
        getTableData();
        $(".nav-pagination").off();
    })
    $(".bl-btn-reload").bind("click", function () {
        window.location.reload();
    });

    

    //商品管理列表
    function getTableData() {
        loading();
        var newData = JSON.stringify(datas)
        $.ajax({
            url: plumeApi["listAgentsBrandInfoList-brand"],
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            data: newData,
            success: function (data) {
                unloading();
                $("[list-node]").remove();
                $(".table-block").setPageData(data);
                totalPage = Math.ceil(data.countRecord / 10);
                newPage(totalPage, function (i) {
                    datas.start = (i - 1) * 10;
                    var newData = JSON.stringify(datas);
                    loading();
                    $.ajax({
                        url: plumeApi["listAgentsBrandInfoList-brand"],
                        type: "POST",
                        data: newData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            $("[list-node]").remove();
                            $(".table-block").setPageData(data);
                            unloading();
                        },
                    });
                });
            }
        });
    }

    getTableData()
    
//清空搜索
    $('.btn-empty').bind('click', function() {
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

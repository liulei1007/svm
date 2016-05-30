$(function () {
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

    $("tbody").on("click", '.btn-look', function () {
        getBrandId(this)
        derict(this, "brandListShow", "nochangeurl");
    })

    $(".btn-search").bind('click', function () {
        datas.brandName = $("#brandName").val();
        datas.contract = $("#contract").val();
        datas.contractTel = $("#telNumber").val();
        getTableData();
        $(".nav-pagination").off();
    })

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
});

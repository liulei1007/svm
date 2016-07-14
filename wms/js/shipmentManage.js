$(function () {

    $('#createdFrom').cxCalendar();
    $('#createdTo').cxCalendar();
    var datas = {
        "warehouseCode": "SJZ01",
        "companyCode": "RS",
        "leadingSts": "100",
        "createdFrom": "2013-01-01 00:00:00",
        "createdTo": "2017-01-01 00:00:00",
        "fields": "id,warehouseCode,companyCode,code,leadingSts,totalQty,shipToAttentionTo,carrierCode,shipmentNote,processType,createdBy,payTime",
        "pageNo": "1",
        "pageSize": "3"
    };

    $.tableCheckBox();
    $.plumeLog("进入shipmentManage模板自定义js-" + $.plumeTime());

    $('.table-block').on('click', '.btn-delect', function () {
        getGoodsPsgId(this);
        delectShipmentList();
    });

    $('.table-block').on('click', '.btn-compile', function () {
        getGoodsPsgId(this);
        derict(this, "compileGoods", "nochangeurl");
    });

    $("tbody").on("click", '.bl-btn-look', function () {
        getShipmentId(this)
        derict(this, "shipmentDetail", "nochangeurl");
    })

    var nowPage = 1;
    getShipmentList();
    $('.btn-search').bind('click', function () {
        datas.warehouseCode = $('#warehouseCode').val();
        datas.companyCode = $('#companyCode').val();
        datas.shipmentCode = $('#shipmentCode').val();
        datas.leadingSts = $("#leadingSts option:selected").val();
        datas.createdFrom = $('#createdFrom').val();
        datas.createdTo = $('#createdTo').val();
        datas.fields = "id,warehouseCode,companyCode,code,leadingSts,totalQty,shipToAttentionTo,carrierCode,shipmentNote,processType,createdBy,payTime";

        getShipmentList();
        $(".nav-pagination").off();
    });


    // 获取出库单列表
    function getShipmentList() {
        var newData = JSON.stringify(datas)
        $.ajax({
            url: 'getShipmentList', /*+"?currentPage=1&onePageCount="+onePageCount(),*/
            type: "POST",
            data: newData,
            success: function (data) {
                if (data.ok == false) {
                    alert(data.resDescription);
                    return;
                }
                $("[list-node]").remove();
                $(".table-block").setPageData(data);
                //filter();

                totalPage = Math.ceil(data.data.total / onePageCount());
                datas[pageSize] = onePageCount();

                newPage(totalPage, function (i) {
                    datas[pageNo] = i;
                    var newData = JSON.stringify(datas);
                    loading();
                    $.ajax({
                        url: plumeApi["getShipmentList"], /* +"?currentPage="+i+"&onePageCount="+onePageCount(),*/
                        type: "POST",
                        data: newData,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            unloading();
                            $("[list-node]").remove();
                            $(".table-block").setPageData(data);
                            filter();
                        }
                    });
                });
            },
            error: function () {
                alert(jqXHR.responseText);
            }
        });
    }

    // 信息过滤
    function filter() {
        $('.createDate').each(function () {
            $(this).html(_getLocalTime($(this).html()));
            var aTr = $(this).parents('tr');
            var saleStatus = aTr.find('.saleStatus');
            var btnGround = aTr.find('.btn-ground');
            if (saleStatus.html() == 0) {
                saleStatus.html('下架中');
                btnGround.html('上架');
            } else {
                saleStatus.html('上架中');
                btnGround.html('下架');
            }
        });

    }

    // 清空搜索
    $('.btn-empty').bind('click', function () {
        window.location.reload();
    });

    // 回车搜索
    $.key.keydownEnter('.btn-search');
});


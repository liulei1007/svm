$(function () {
    $.setPageCount();

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

    $("tbody").on("click", '.bl-btn-look', function () {
        $.getShipmentId(this)
        $.directPage('.work-space-active', 'shipmentDetail', null, '', 'changeurl');
    })

    $('#createdFrom').cxCalendar();
    $('#createdTo').cxCalendar();

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
        $.commonAjax({
            url: 'getShipmentList',
            type: "POST",
            data: datas,
            urlParams: {
                currentPage: 1,
                onePageCount: $.onePageCount()
            },
            list: true,
            success: function (data) {
                if (data.ok == false) {
                    alert(data.resDescription);
                    return;
                }
                $("[list-node]").remove();
                $(".table-block").setPageData(data);

                var totalPage = Math.ceil(data.data.total / $.onePageCount());

                newPage(totalPage, function (page) {
                    $.commonAjax({
                        url: plumeApi["getShipmentList"], /* +"?currentPage="+i+"&onePageCount="+onePageCount(),*/
                        type: "POST",
                        data: datas,
                        urlParams: {
                            currentPage: page,
                            onePageCount: $.onePageCount()
                        },
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

    // 清空搜索
    $('.btn-empty').bind('click', function () {
        window.location.reload();
    });

    // 回车搜索
    $.key.keydownEnter('.btn-search');

});


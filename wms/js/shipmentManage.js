$(function () {

    $.setPageCount();
//    success、danger、tips、warning、download、question、check
//    $.popTips('提示信息', 'success');
//    $.showPopTips('提示信息', 'success', 'test');
   
    var shipmentQue = {
        "warehouseCode":"",
        "companyCode":"",
        "pageNo":"1"
    };

    $.tableCheckBox();
    $.plumeLog("进入shipmentManage模板自定义js-" + $.plumeTime());

    $("tbody").on("click", '.bl-btn-look', function () {
        $.getShipmentHeader(this);
        $.directPage('shipmentDetail');
    })
    
    $("#createdFrom").cxCalendar();
    $("#createdTo").cxCalendar();


    $.when(getCompanyByUserId(), getWarehouseByUserId(),getLeadingStatusList()).done(function () {
          getShipmentList(); 
    });

    //引入默认公司
    function getCompanyByUserId() {
    return $.commonAjax({
        url: "selectCompanyByUserId",
        type: "GET",
        urlParams: {
            userId: sessionStorage.login_id
        },
        list: false,
        success: function (data) {
            if(data.ok==false) {
                $.popTips(data.resDescription, 'question');
                return;
            }

            $.each(data, function (index, value) {
              //alert(value.name );
                $("#companyCode").append("<option value='" + value.companyCode + "'> " + value.companyName + " </option>");
            });
            shipmentQue.companyCode=$('#companyCode option:selected').val();
                
        }
    });
}

    //引入默认仓库
    function getWarehouseByUserId() {
       return $.commonAjax({
        url: "selectWarehouseByUserId",
        type: "GET",
        urlParams: {
            userId: sessionStorage.login_id
        },
        list: false,
        success: function (data) {
            if(data.ok==false) {
                $.popTips(data.resDescription, 'question');
                return;
            }
            $.each(data, function (index, value) {
              //alert(value.name );
                $("#warehouseCode").append("<option value='" + value.warehouseCode + "'> " + value.warehouseName + " </option>");
            });
            shipmentQue.warehouseCode=$('#warehouseCode option:selected').val();
                
        }
    });
    }
    

    //引入出库单状态类型

    function getLeadingStatusList() {
        return $.commonAjax({
          url: "getLeadingStatusList",
          type: "GET",
          list: false,
          success: function (data) {
              if(data.ok==false) {
                  $.popTips(data.resDescription, 'question');
                  return;
              }
              $.each(data.data, function (index, value) {
                  $("#beginningStatus").append("<option value='" + value.id + "'> " + value.label + " </option>");
              });
              $.each(data.data, function (index, value) {
                  $("#endStatus").append("<option value='" + value.id + "'> " + value.label + " </option>");
              });

              shipmentQue.beginningStatus = $("#beginningStatus option:selected").val();
              shipmentQue.endStatus = $("#endStatus option:selected").val();                 
          }
      });
    }
    
    $(".btn-search").bind("click", function () {
        shipmentQue.warehouseCode = $("#warehouseCode option:selected").val();
        shipmentQue.companyCode = $("#companyCode option:selected").val();
        shipmentQue.shipmentCode = $("#shipmentCode").val();
        shipmentQue.beginningStatus = $("#beginningStatus option:selected").val();
        shipmentQue.endStatus = $("#endStatus option:selected").val();
        shipmentQue.shipToName = $("#shipToName").val();
        shipmentQue.itemBrand = $("#itemBrand").val();
        shipmentQue.itemName = $("#itemName").val();
        shipmentQue.createdFrom = $("#createdFrom").val();
        shipmentQue.createdTo = $("#createdTo").val();

        getShipmentList();
        $(".nav-pagination").off();
    });


    // 获取出库单列表
    function getShipmentList() {
        shipmentQue.pageSize=$.onePageCount();
        $.commonAjax({
            url: "getShipmentList",
            type: "POST",
            data: shipmentQue,
            list: true,
            success: function (data) {
                if (data.ok == false) {
                    $.popTips(data.resDescription, 'question');
                    return;
                }
                $("[list-node]").remove();
                $(".table-block").setPageData(data);

                var totalPage = Math.ceil(data.data.total / $.onePageCount());

                newPage(totalPage, function (page) {    
                    shipmentQue.pageNo=page;
                    $.commonAjax({
                        url: "getShipmentList",
                        type: "POST",
                        data: shipmentQue,
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
    $(".btn-empty").bind("click", function () {
        window.location.reload();
    });

    // 回车搜索
    $.key.keydownEnter(".btn-search");

});
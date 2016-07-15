$(function() {
    
    //调整布局
   //$(".row").children(":first").css("margin-left","1.5px"); 
/*   $(".row").each(function(i,element){
      element.children(":first").css("margin-left","1.5px"); 
   });*/
  
   $("#Section1").click(function(){
            $("#Section1").addClass("active");            
            $("#SectionShow1").show();
            $("#SectionShow2").hide();
            $("#SectionShow3").hide();
            $("#Section2").removeClass("active");
            $("#Section3").removeClass("active");
    });
    $("#Section2").click(function(){
            $("#Section2").addClass("active");
            $("#SectionShow2").show();
            $("#SectionShow1").hide();
            $("#SectionShow3").hide();
            $("#Section1").removeClass("active");
            $("#Section3").removeClass("active");
    });
    $("#Section3").click(function(){
            $("#Section3").addClass("active");
            $("#SectionShow3").show();
            $("#SectionShow2").hide();
            $("#SectionShow1").hide();
            $("#Section1").removeClass("active");
            $("#Section2").removeClass("active");
    });
    
    $('.btn-back').bind('click',function() {
        $.directPage("shipmentManage");
    });
    
    //更新
	/*$('.btn-back').bind('click',function() {
        loading();

        var shipment=new Object();
        var shipment.warehouseCode=$("#warehouseCode").val();
        var shipment.companyCode=$("#companyCode").val();
        var shipment.code=$("#code").val();
        var shipment.erpOrderCode=$("#erpOrderCode").val();
        var shipment.erpOrderType=$("#erpOrderType").val();
        var shipment.erpOrderId=$("#erpOrderId").val();
        var shipment.shipmentType=$("#shipmentType").val();
        var shipment.route=$("#route").val();
        var shipment.sourcePlatform=$("#sourcePlatform").val();
        var shipment.shipTo=$("#shipTo").val();
        var shipment.shipToName=$("#shipToName").val();
        var shipment.shipToAddress1=$("#shipToAddress1").val();
        var shipment.shipToAddress2=$("#shipToAddress2").val();
        var shipment.shipToDistrict=$("#shipToDistrict").val();
        var shipment.shipToCity=$("#shipToCity").val();
        var shipment.shipToState=$("#shipToState").val();
        var shipment.shipToCountry=$("#shipToCountry").val();
        var shipment.shipToPostalCode=$("#shipToPostalCode").val();
        var shipment.shipToAttentionTo=$("#shipToAttentionTo").val();
        var shipment.shipToPhoneNum=$("#shipToPhoneNum").val();
        var shipment.shipToMobile=$("#shipToMobile").val();
        var shipment.shipToFaxNum=$("#shipToFaxNum").val();
        var shipment.shipToEmailAddress=$("#shipToEmailAddress").val();
        var shipment.requestedDeliveryDate=$("#requestedDeliveryDate").val();
        var shipment.deliveryNote=$("#deliveryNote").val();
        var shipment.allocateComplete=$("#allocateComplete").val();
        var shipment.carrierCode=$("#carrierCode").val();
        var shipment.carrierService=$("#carrierService").val();
        var shipment.processType=$("#processType").val();
        var shipment.shipmentNote=$("#shipmentNote").val();
        var shipment.codRequired=$("#codRequired").val();
        var shipment.codValue=$("#codValue").val();
        var shipment.storeCode=$("#storeCode").val();
        var shipment.storeName=$("#storeName").val();
        var shipment.primaryWaybillCode=$("#primaryWaybillCode").val();
        var shipment.shortAddress=$("#shortAddress").val();
        var shipment.shipment.payTime=$("#payTime").val();
        var shipment.payNo=$("#payNo").val();

		$.ajax({
            url:plumeApi[saveOrUpdateShipment],
            type:"POST",
            data: shipment,
            dataType:"json",
            contentType:"application/json;charset=UTF-8",
            success: function(data) {
                if(data.ok==false) {
                alert(data.resDescription);
                unloading();
                return;
            }
            unloading();
        }
        })
	});*/

	function getShipmentDetail() {

    $.commonAjax({
        url: "getShipment",
        type: "GET",
        urlParams: {
            id: $.session.shipment_shipmentId
        },
        list: false,
        success: function (data) {
            if(data.ok==false) {
                alert(data.resDescription);
                return;
            }
            
            $(".table-block").setPageData(data);
            $(".body-typein").setPageData(data.data.header.shipmentHeader);            
        }
    });
}

getShipmentDetail();
});

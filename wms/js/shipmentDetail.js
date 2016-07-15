$(function() {

    var shipment = null;

   $("#Section1").click(function(){
            $("#Section1").addClass("active");            
            $("#SectionShow1").show();
            $("#SectionShow2").hide();
            $("#SectionShow3").hide();
            $("#SectionShow4").hide();
    });
    $("#Section2").click(function(){
            $("#Section2").addClass("active");
            $("#SectionShow2").show();
            $("#SectionShow1").hide();
            $("#SectionShow3").hide();
            $("#SectionShow4").hide();
    });
    $("#Section3").click(function(){
            $("#Section3").addClass("active");
            $("#SectionShow3").show();
            $("#SectionShow2").hide();
            $("#SectionShow1").hide();
            $("#SectionShow4").hide();
    });
    $("#Section4").click(function(){
            $("#Section4").addClass("active");
            $("#SectionShow4").show();
            $("#SectionShow2").hide();
            $("#SectionShow1").hide();
            $("#SectionShow3").hide();
    });
    
    
    $('.btn-back').bind('click',function() {
        derict(this,"shipmentManage","nochangeurl");
    });

    $('.btn-back').bind('click',function() {
        derict(this,"shipmentManage","nochangeurl");
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
    loading();
    $.ajax({
        url: plumeApi["getShipment"] +"?id="+session.shipment_shipmentId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if(data.ok==false) {
                alert(data.resDescription);
                unloading();
                return;
            }
        	unloading();

            $(".table-block").setPageData(data);
            $(".body-typein").setPageData(data.data.header.shipmentHeader);
            
        }
    });
}


getShipmentDetail();
});

$(function() {
    
   //只读
   $('input').attr("readonly","readonly");

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

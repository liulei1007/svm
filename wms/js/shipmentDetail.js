$(function() {
   //只读
   $('input').attr("readonly","readonly");

	$('.btn-back').bind('click',function() {
		$.directPage("shipmentManage");
	});
	
	function getShipmentDetail() {

	$.commonAjax({
		url: "getShipment",
		type: "GET",
		urlParams: {
			id: JSON.parse($.session.shipment_header).id
		},
		list: false,
		success: function (data) {
			if(data.ok==false) {
				$.popTips(data.resDescription, 'question');
				return;
			}
			var object=$.session.shipment_header;
            var shipmentDetail = {} ;
			shipmentDetail.base = JSON.parse(object);
			shipmentDetail.detail = data;
            $(".body-typein").setPageData(shipmentDetail); 
		}
	});
}

getShipmentDetail();
});
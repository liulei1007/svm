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
			id: $.session.shipment_id
		},
		list: false,
		success: function (data) {
			if(data.ok==false) {
				alert(data.resDescription);
				return;
			}
			var object=$.session.shipment_header;
			//alert($.session.shipment_header);
			$(".table-block").setPageData(data);
			$(".body-typein").setPageData(JSON.parse(object));            
		}
	});
}

getShipmentDetail();
});
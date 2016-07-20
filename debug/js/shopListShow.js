$(function() {
	$('.btn-back').bind('click',function() {
		derict(this,"shopListAgency","nochangeurl");
	});

	function getOmsBrandDetail() {
    loading();
    $.ajax({
        url: plumeApi["getShopDetail"]+session.shop_shopId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
        	unloading();
            $(".form-block").setPageData(data.data);
        }
    });
}

getOmsBrandDetail()
});
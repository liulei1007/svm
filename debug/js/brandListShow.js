$(function() {
	$('.btn-back').bind('click',function() {
		derict(this,"brandList","nochangeurl");
	});

	function getOmsBrandDetail() {
    loading();
    $.ajax({
        url: plumeApi["getOmsBrandDetail"]+session.brand_brandId,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
        	unloading();
            $(".body-typein").setPageData(data.data);
        }
    });
}

getOmsBrandDetail()
});
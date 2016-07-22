$(function() {
	formCtrl();
	// 绑定“返回”按钮
	$('.btn-back').bind('click',function() {
		console.log("session.brand_type: " + session.brand_type);
		if (session.brand_type == "agency") {
			derict(this, "brandListAgency", "nochangeurl");
		}
		else derict(this, "brandList", "nochangeurl");
	});

	// 获取数据
	getOmsBrandDetail();

	function getOmsBrandDetail() {
		loading();
		$.ajax({
			url: plumeApi["getOmsBrandInfo"]+session.brand_brandId,
			type: "GET",
			contentType: "application/json;charset=UTF-8",
			success: function (data) {
				unloading();
				// 如果原先已有品牌logo，显示
				if (data.data.brandLogo) {
					var baseUrl = JSON.parse(session.img_url).data;

					$("#brand-logo").html('<img src="' +baseUrl[parseInt(Math.random() * (baseUrl.length))].codeValueCode+data.data.brandLogo + '" />');
				}
				else {
					$("#brand-logo").html('<img src="images/brand-default.jpg" />');
				}
				$(".form-horizontal").setPageData(data.data);
			}
		});
	}
});
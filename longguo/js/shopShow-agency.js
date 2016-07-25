$(function() {
	// 表单操作
	formCtrl();

	// 获取数据
	getData();

	// 绑定“返回”按钮
	$(".body-typein .btn-back").bind("click", function() {
		derict(this, "shopListAgency", "nochangeurl");
	});

	// 从服务器获取数据
	function getData() {
		loading();
		$.ajax({
			// url: "datas/shopDetail.txt",
			url: "http://192.168.222.162:8080/shopInfo/getShopDetail/" + session.shopID,
			type: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				unloading();
				$(".body-typein").setPageData(result.data);
			},
			error:function(er){}
		});
	}
});
$(function() {
	// 表单操作
	formCtrl();

	getData();

	// 从服务器获取数据
	function getData() {
		$.ajax({
			url: "datas/shopDetail.txt",
			// url: "http://192.168.222.162:8080/shopInfo/getShopInfo/" + session.shopID,
			// type: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				$(".body-typein").setPageData(result.data);
			},
			error:function(er){}
		});
	}
});
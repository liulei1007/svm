$(function() {
	// 获取自采商品编号
	var stashId = session.stashGoods.stashId;

	getData();

	// 从服务器获取数据
	function getData() {
		loading();
		$.ajax({
			// url: "datas/shopDetail.txt",
			url: "http://192.168.222.162:8080/productStash/getProductStashById/" + stashId,
			type: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				unloading();
				$(".body-typein").setPageData(result.data);
				var status = result.data.saleStatus;
				if (status == "0") {$("#saleStatus").text("下架中");}
				else if (status == "1") {$("#saleStatus").text("上架中");}
				
			},
			error:function(er){}
		});
	}
});
$(function() {
	// 获取自采商品编号
	var stashId = session.stashGoods_stashId;

	getData();

	// 绑定“返回”按钮
	$(".form-block .btn-back").bind("click", function() {
		derict(this, "releaseSelfGoods", "nochangeurl");
	});

	// 从服务器获取数据
	function getData() {
		loading();
		$.ajax({
			// url: "datas/shopDetail.txt",
			url: plumeApi["getProductStashById"] + stashId,
			type: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				unloading();
				$(".form-block").setPageData(result.data);
				var status = result.data.saleStatus;
				if (status == "0") {$("#saleStatus").text("下架中");}
				else if (status == "1") {$("#saleStatus").text("上架中");}
				
			},
			error:function(er){}
		});
	}
});
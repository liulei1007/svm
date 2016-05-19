$(function() {
	// 初始化传输数据
	var data = {
		"pdtName": "",
		"brandName": "",
		"page": 0,
		"perPage": 10
	}
	// 获取数据
	getData();

	// 绑定“搜索”按钮
	$(".btn-search").bind("click", function() {
		data.pdtName = $("#pdtName").val();
		data.brandName = $("#brandName").val();
		getData();
	});

	// 绑定“单笔新增自采商品”按钮
	$(".btn-createNew").bind("click", function() {
		session.stashGoods_operate = "create";
		derict(this, "createSelfGoods", "nochangeurl");
	});

	
	$(".table-block").on("click", ".link-show", function() {
		// 查看自采商品
		var stashId = $(this).parents("tr").find(".stashId").text();
		session.stashGoods_stashId = stashId;
		derict(this, "showSelfGoods", "nochangeurl");
	}).on("click", ".btn-edit", function() {
		// 编辑自采商品
		var stashId = $(this).parents("tr").find(".stashId").text();
		session.stashGoods_stashId = stashId;
		derict(this, "editSelfGoods", "nochangeurl");
	}).on("click", ".btn-copy", function() {
		// 复制自采商品
		var stashId = $(this).parents("tr").find(".stashId").text();
		session.stashGoods_operate = "edit";
		session.stashGoods_stashId = stashId;
		// session.stashGoods = {stashId: stashId, operate: "edit"};
		derict(this, "createSelfGoods", "nochangeurl");
	});

	// 从服务器获取数据
	function getData() {
		loading();
		$("[list-node]").remove();
		$.ajax({
			// url: "datas/shopList.txt",
			url: "http://192.168.221.92:8080/productStash/listProductStash",
			type: "GET",
			data: data,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(result) {
				unloading();
				$(".doc-commodityManagement").setPageData(result);
			},
			error:function(error) {console.log(error);}
		});
	}
});
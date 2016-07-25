$(function() {
	// 初始化传输数据
	var datas = {
		"stashId": session.stashGoods_stashId,
		"brandName": "",
		"pdtName": "",
		"categoryId": 0,
		"categoryName": "",
		"pgtType": "",
		"standard": "",
		"material": "",
		"orgName": "",
		"priceType": "",
		"salePrice": 0,
		"discount": 0,
		"inventory": 0,
		"saleStatus": "",
		"standardUnit":""
	}

	// 获取当前商品的数据，并将信息写入表单
	getSelfData($(".body-typein"), session.stashGoods_stashId);


	//单位规格
	var standardUnit = JSON.parse(session.standard_unit);

	var unit = JSON.parse(session.unit)
	
	$("#orgSize").setPageData(standardUnit);

	$("#priceUnit").setPageData(unit);

	// 绑定“确定”按钮
	$(".btn-sure").bind("click", function() {
		checkSelfGoods("修改", datas, plumeApi["editProductStash"]);
	});

	// 绑定“取消”按钮
	$(".body-typein .btn-cancel").bind("click", function() {
		derict(this, "releaseSelfGoods", "nochangeurl");
	});
});
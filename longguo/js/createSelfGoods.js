$(function() {
	// 初始化传输数据
	var datas = {
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
		"saleStatus": "",
		"standardUnit":""
	}

	// 如果是复制，将复制的商品的信息写入表单
	if (session.stashGoods_operate == "edit") {
		getSelfData($(".form-block"), session.stashGoods_stashId);
	}
	// 如果是新增商品信息，获取产品一级分类
	else getFirstCategory($(".form-block"), null);

	// 绑定检验表单事件
	checkForm();

	// 绑定“提交”按钮
	$(".form-block .btn-submit").bind("click", function() {
		checkSelfGoods("发布", datas, plumeApi["addProductStash"]);
	});

	// 绑定“取消”按钮
	$(".form-block .btn-cancel").bind("click", function() {
		derict(this, "releaseSelfGoods", "nochangeurl");
	});

	//单位规格
	var standardUnit = JSON.parse(session.standard_unit);

	$("#standardUnit").setPageData(standardUnit);

	$("#standardUnit").find("option").eq(1).prop('selected','selected');

	//计价单位

	var unit = JSON.parse(session.unit);

	$("#chargeUnit").setPageData(unit);

	$("#chargeUnit").find("option").eq(1).prop('selected','selected');
});
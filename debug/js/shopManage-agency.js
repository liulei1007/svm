$(function() {
	// ifNull: 判断必填项信息是否都输入了, isTimeRight: 判断关门时间是否晚于开门时间
	var ifNull = false, isTimeRight = false;
	// 获取店铺ID、所属卖场
	var shopId = session.shopAgency_shopId;
	var marketName = session.shopAgency_marketName;
	// 将店铺ID、所属卖场显示在页面上
	$("#shopId").html(shopId);
	$("#marketName").html(marketName);
	
	// 时间控件
	$('.form-datetime').datetimepicker({
		weekStart: 1,
		todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 1,
		minView: 0,
		maxView: 1,
		forceParse: 0
	});

	// 表单验证
	formControl();

	// 获取店铺信息
	getShopInfo(shopId);

	// 检验门店电话
	$("#tel").blur(function() {
		checkTel($(this));
	});

	// 点击“返回”按钮
	$(".btn-back").click(function() {
		derict(this, "shopListAgency", "nochangeurl");
	});

	// 点击“提交”按钮
	$(".btn-submit").click(function() {
		ifNull = false;
		// 首先确保数据都输入了
		$(".form-group.required input, .form-group.required select, .form-group.required textarea").each(function() {
			if (!checkFormNull($(this))) ifNull = true;
		});
		// 确保输入的数据都有效
		if (!checkTime($("#startTime")) || ifNull) { return; }
		var shopName = $("#shopName").val().trim();
		var marketBoothNumber = $("#marketBoothNumber").val().trim();
		var marketFloor = $("#marketFloor").val().trim();
		var salesStartTime = $("#startTime").val().trim();
		var salesEndTime = $("#endTime").val().trim();
		var shopTel = $("#tel").val().trim();
		var shopIntroduction = $("#shopIntroduction").val().trim();
		var data = {
			"id": session.shopAgency_shopId,
			"shopName": shopName,
			"marketBoothNumber": marketBoothNumber,
			"marketFloor": marketFloor,
			"salesStartTime": salesStartTime,
			"salesEndTime": salesEndTime,
			"shopTel": shopTel,
			"shopIntroduction": shopIntroduction
		};
		loading();
		$.ajax({
            // url: "datas/shopList.txt",
            url: plumeApi["editShopInfo"],
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
            	unloading();
                if (result.ok) {
                	showPopTips("提交成功", "success", "店铺信息提交成功");
                	derict(this, "shopListAgency", "nochangeurl");
                }
                else {
                	showPopTips("提交失败", "warning", result.resDescription);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
		// alert("ok");
	});

	// 获取店铺信息
	function getShopInfo(shopId) {
		$.ajax({
			url: plumeApi["getShopMainInfo"] + shopId,
			type: "GET",
			contentType: "application/json;charset=UTF-8",
			success: function (data) {
				unloading();
				if (data.ok) {
					console.log(data.data);
					if (data.data.shopName) {$("#shopName").val(data.data.shopName);}
					if (data.data.marketBoothNumber) {$("#marketBoothNumber").val(data.data.marketBoothNumber);}
					if (data.data.shopTel) {$("#tel").val(data.data.shopName);}
					if (data.data.salesStartTime) {$("#startTime").val(data.data.salesStartTime);}
					if (data.data.salesEndTime) {$("#endTime").val(data.data.salesEndTime);}
					if (data.data.shopIntroduction) {$("#shopIntroduction").val(data.data.shopIntroduction);}
					// 门店楼层
					if (data.data.marketFloor) {
						$("#marketFloor option[value='" + data.data.marketFloor + "']").val(data.data.marketFloor);
					}
					// var shopName = $("#shopName").val().trim();
					// var marketBoothNumber = $("#marketBoothNumber").val().trim();
					// var marketFloor = $("#marketFloor").val().trim();
					// var salesStartTime = $("#startTime").val().trim();
					// var salesEndTime = $("#endTime").val().trim();
					// var shopTel = $("#tel").val().trim();
					// var shopIntroduction = $("#shopIntroduction").val().trim();
				}
				else {
					showPopTips("店铺信息获取失败", "warning", data.resDescription);
				}
			}
		});
	}

	// 检验门店营业时间是否正确
	function checkTime(checkObj) {
		var $formBlock = $(checkObj).parents(".form-group");
		// 如果当前输入框已有其他提示信息，退出
		if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {
			return false;
		}
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		// 如果关门时间早于开门时间，报错
		if (endTime <= startTime) {
			var tipsText = $(checkObj).parents(".form-group").find(".control-label span").html();
			$(checkObj).parents(".form-group").addClass("has-error").append('<div class="col-sm-3 alert alert-danger">您的营业结束时间早于营业开始时间</div>');
			return false;
		}
		else return true;
	}
});

$(function() {
	// 绑定表单输入框验证不为空事件
	formControl();

	// ifEdit: 判断是"新增"还是"编辑"
	var ifEdit = false;
	// ifPhoneSuccess: 判断手机号码是否合格, ifPasswordSuccess: 判断密码是否合格, ifNull: 判断是否有必填项为空
	var ifPasswordSuccess = false, ifNull = false;
	// userType: 登录用户的角色: 1 —— 工厂, 2 —— 经代商
	var userType = sessionStorage.login_userType;
	// modifyAcId: 点击"编辑"带进来的用户ID
	var modifyAcId = sessionStorage.modifyAcId;
	// 定义调用接口地址, 接口数据
	var url = "", dataString;
	// initRole: 初始化状态下的用户权限配置, nowRole: 修改后的用户权限配置, chooseShopID: 经销商角色选择的店铺ID
	var initRole = "", nowRole = "", chooseShopID = "", chooseBrandIds = "";

	console.log("userType: " + userType, ", modifyAcId: " + modifyAcId);
	
	// 如果是编辑状态
	if (modifyAcId && modifyAcId != "") {
		ifEdit = true;

		// 页面元素的修改: 标题文字修改, 密码、确认密码隐藏, 员工姓名、手机号码不能修改
		$(".title-block").html("修改子账号");
		$("#pwd").parents(".form-group").remove();
		$("#repwd").parents(".form-group").remove();

	    // 首先判断用户的角色
	    if (userType == 1) {
	    	// 工厂角色
	        url = plumeApi["getManuSubUserUpView"];
	    }
	    else if (userType == 2) {
	    	// 经代商角色
	        url = plumeApi["getAgentsSubUserUpView"];
	    }
		// 获取需要修改的子账号的员工姓名、手机号码
		loading();
		$.ajax({
			url: url + "?id=" + modifyAcId,
	        type: "GET",
	        contentType: "application/json;charset=UTF-8",
	        success: function (data) {
	        	unloading();
	        	if (data.ok) {
	        		// 绑定员工姓名、手机号码
	        		$("#remark").html('<p class="form-control-static">' + data.data.remark + '</p>');
	        		$("#tel").html('<p class="form-control-static">' + data.data.mobilePhone + '</p>');
	        		// 工厂模式展示关联品牌
	        		if (userType == 1) {
	        			console.log(data.data);
	        			var addHtml = "";
	        			var relationbrandList = "";

	        			// 如果该用户已经有关联的品牌，记录下来
	        			if(data.data.relationbrandList.length > 0) {
	        				for (var i = 0; i < data.data.relationbrandList.length; i++) {
	        					relationbrandList = relationbrandList.concat(data.data.relationbrandList[i]).concat(",");
	        				}
	        			}
	        			console.log(relationbrandList);
	        			for (var i = 0; i < data.data.brandList.length; i++) {
	        				if (relationbrandList.indexOf(data.data.brandList[i].id) > -1) {
	        					addHtml += '<label class="checkbox-inline"><input type="checkbox" name="brands" value="' + data.data.brandList[i].id + '" checked="checked">' + data.data.brandList[i].brandName + '</label>';
	        				}
	        				else {
	        					addHtml += '<label class="checkbox-inline"><input type="checkbox" name="brands" value="' + data.data.brandList[i].id + '">' + data.data.brandList[i].brandName + '</label>';
	        				}
	        			}
	        			$(".manuBrand").html(addHtml);
	        			// getBrandLink();
	        			$(".brandShops").show();
	        			// ---------------------------------------------------
	        		}
	        		// 经代商模式展示所属卖场、所属品牌、所属系列
	        		if (userType == 2) {
	        			if (!data.data.omsShopInfo) { return; }
	        			$("#agencyMarket").html('<p class="form-control-static">' + data.data.omsShopInfo.marketName + '</p>');
	        			$("#agencyBrand").html('<p class="form-control-static">' + data.data.omsShopInfo.brandName + '</p>');
	        			$("#agencySeries").html('<p class="form-control-static">' + data.data.omsShopInfo.seriesName + '</p>');
	        			$(".agencyShops").show();
	        		}
	        	}
	        }
		});

		// 获取用户的配置权限
		getConfigLimits();
	}
	// 如果是新添状态
	else {
		// 工厂角色
		if (userType == 1) {
			getBrandLink();
			$(".brandShops").show();
		}
		// 经代商角色
		else {
			$(".agencyShops").show();
			// 获取该用户对应的卖场
			getShopLink($("#agencyMarket"), {"type": 1});
			// 绑定三级联动事件
			$("#agencyMarket select").change(function() {
				getShopLink($("#agencyBrand"), {"type": 2, "marketId": $(this).val()});
			});
			$("#agencyBrand select").change(function() {
				var chooseMarketId = $("#agencyMarket select").val();
				getShopLink($("#agencySeries"), {"type": 3, "marketId": chooseMarketId, "brandId": $(this).val()});
			});
			$("#agencySeries select").change(function() {
				chooseShopID = $(this).val();
			})
		}
	}

    // "手机号码"输入框失去焦点
    $("#tel input").blur(function() {
    	checkPhone($(this), "create");
    });

	// "密码/确认密码"输入框失去焦点
	$("#pwd, #repwd").blur(function() {
		checkPassword($(this));
	});

	// 点击“配置”, 配置权限
	$(".btn-myset").bind("click", function() {
		$('.pop').loadTemp("popAuth", "nochangeurl", function() {
			console.log("nowRole: " + nowRole);
			// 工厂角色
			if (userType == 1) {
				$(".digmanubox").show();
				if(nowRole.indexOf("digital_manu_emp") > -1) {
					$(".digmanubox [type='checkbox']").attr("checked", "checked");
				}
			}
			// 经代商角色
			else {
				$(".digagentbox").show();
				if(nowRole.indexOf("digital_dealer_emp") > -1) {
					$(".digagentbox [type='checkbox']").attr("checked", "checked");
				}
			}
			// 调整显示高度
			var popHeight = $(".pop .form-horizontal").height() + 145;
			$(".popup-fill").css({"margin-top": -popHeight / 2, "height": popHeight});

			// 点击“确定”按钮, 记录选中的信息
			$(".pa-sure").bind("click", function() {
				nowRole = "";
				$("input[name='rolebox']:checked").each(function() {
					nowRole = nowRole.concat($(this).val()).concat(",");
				});
				$(".pop").html("").hide();
			});

			// 点击“取消”按钮, 关闭弹出框, 权限会到初始状态
			$(".pa-cancel").bind("click", function() {
				nowRole = initRole;
				$(".pop").html("").hide();
			});
		});
	})

	// 点击“提交”按钮
	$(".btn-next").bind("click", function() {
		// 如果是新增状态
		if (!ifEdit) {
			ifNull = false;
			// 首先确保数据都输入了
			$(".form-group.required input:visible, .form-group.required select:visible").each(function() {
				if (!checkFormNull($(this))) ifNull = true;
			});
			// 确保员工姓名、手机号码、密码和确认密码输入无误
			if (!ifPhoneSuccess || !ifPasswordSuccess || ifNull) { return; }

			// 获取信息
			var remark = $("#remark input").val();
			var tel = $("#tel input").val();
			var pwd = $("#pwd").val();
			var repwd = $("#repwd").val();

			// 工厂角色
			if (userType == 1) {
				if (!checkBrandSubmit()) return;
				url = plumeApi["addManuSubUserInfo"];
				dataString = {
					"mobilePhone": tel,
					"password": pwd,
					"rePassword": repwd,
					"remark": remark,
					"brandIds": chooseBrandIds,
					"roleCodes": nowRole
				};
			}
			// 经代商角色
			else {
				if (chooseShopID == "") { return; }
				url = plumeApi["addAgentsSubUserInfo"];
				dataString = {
					"mobilePhone": tel,
					"password": pwd,
					"rePassword": repwd,
					"remark": remark,
					"shopId": chooseShopID,
					"roleCodes": nowRole
				};
			}
		}
		// 如果是编辑状态
		else {
			// 工厂角色
			if (userType == 1) {
				if (!checkBrandSubmit()) return;
				url = plumeApi["editManuSubUserInfo"];
				dataString = {
					"id": modifyAcId,
					"remark": $("#remark p").html(),
					"brandIds": chooseBrandIds,
					"roleCodes": nowRole
				};
			}
			// 经代商角色
			else {
				url = plumeApi["editAgentsSubUserInfo"];
				dataString = {
					"id": modifyAcId,
					"remark": $("#remark p").html(),
					"roleCodes": nowRole
				};
			}
		}
		console.log(dataString);
		// 尝试添加子账号
		$.ajax({
			url: url,
			type: "POST",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(dataString),
			success: function (data) {
				unloading();
				if (data.ok) {
					if (!ifEdit) {showPopTips("添加成功", "success", "子账号添加成功");}
					else {showPopTips("修改成功", "success", "子账号修改成功");}
					derict(this, "idmanage", "nochangeurl");
				}
				else {
					if (!ifEdit) {showPopTips("添加失败", "warning", data.resDescription);}
					else {showPopTips("修改失败", "warning", data.resDescription);}
				}
			}
		});
	});

	// 点击“取消”按钮
	$(".btn-back").bind("click", function() {
		derict(this, "idmanage", "nochangeurl");
	})

	// 获取用户的配置权限
	function getConfigLimits() {
		loading();
		$.ajax({
			url: plumeApi["listUserRole"] + "?id=" + modifyAcId,
			type: "GET",
			contentType: "application/json;charset=UTF-8",
			success: function (data) {
				unloading();
				if (data.ok) {
					var roles = "";
					for (var i = 0; i < data.data.length; i++) {
						roles = roles.concat(data.data[i]).concat(",");
					}
					initRole = nowRole = roles;
				}
				else {
					showPopTips("权限获取失败", "warning", data.resDescription);
				}
			}
		});
	}

	// 工厂模式提交前检验是否至少选择了一个品牌
	function checkBrandSubmit() {
		// 首先确保必须选择一个关联品牌
		var flag_brand = false;
		chooseBrandIds = "";
		$("input[name='brands']:checked").each(function() {
			flag_brand = true;
			chooseBrandIds = chooseBrandIds.concat($(this).val());
		});
		if (!flag_brand) {
			showPopTips("提交失败", "warning", "请至少选择一个关联品牌！");
			return false;
		}
		return true;
	}

    // 检验密码/确认密码
	function checkPassword(checkObj) {
		// 清除可能存在的两次输入密码不一致的提示框
		$("#repwd").parents(".form-group").removeClass("has-error").find(".alert-danger").remove();
		ifPasswordSuccess = false;
		// 首先判断是否为空
		if (checkFormNull($(checkObj))) {
			var password = $(checkObj).val();
			// 其次判断是否符合密码规范
			if (!pwdCheck(password)) {
				$(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-info">请输入6-15位数字或字母组合</div>');
				return;
			}
			// 最后检验两次输入的密码是否一致
			if ($("#repwd").val().trim() != "") {
				checkPasswordSame();
			}
		}
	}

	// 检验两次输入的密码是否一致
	function checkPasswordSame() {
		// 清除确认密码可能存在的提示信息
		$("#repwd").parents(".form-group").removeClass("has-warning").removeClass("has-error").find(".alert").remove();
		var password = $("#pwd").val();
		var rePassword = $("#repwd").val();
		if (password == rePassword) {
			ifPasswordSuccess = true;
		}
		else {
			ifPasswordSuccess = false;
			$("#repwd").parents(".form-group").addClass("has-error").append('<div class="col-sm-2 alert alert-danger">密码和确认密码不一致</div>');
		}
	}
});

// 工厂角色获取当前用户所有的品牌
function getBrandLink() {
	var addHtml = "";
	url = plumeApi["listManuBrand"];
	loading();
	$.ajax({
		url: url,
		type: "GET",
		contentType: "application/json;charset=UTF-8",
		success: function (data) {
			for (var i = 0; i < data.data.length; i++) {
				addHtml += '<label class="checkbox-inline"><input type="checkbox" name="brands" value="' + data.data[i].id + '">' + data.data[i].brandName + '</label>';
			}
			$(".manuBrand").html(addHtml);
		}
	});
}

// 经销商角色获取三级联动店铺信息
function getShopLink(linkObj, dataString) {
	var addHtml;
	url = plumeApi["listShopLinkage"];
	loading();
	$.ajax({
		url: url,
		data: JSON.stringify(dataString),
		type: "POST",
		contentType: "application/json;charset=UTF-8",
		success: function (data) {
			unloading();
			var tipsName = $(linkObj).siblings(".control-label").find("span").html();
			// 防止获取失败
			if (!data.ok) {
				showPopTips(tipsName + "获取失败", "warning", data.resDescription);
				return;
			}
			// 防止返回数据为空
			if (data.data.length == 0) {
				showPopTips(tipsName + "获取失败", "warning", "没有数据");
			}
			
			// 如果是获取所属卖场
			if ($(linkObj).is("#agencyMarket")) {
				addHtml += "<option disabled='disabled' selected='selected'>请选择" + tipsName + "</option>";
				for (var i = 0; i < data.data.length; i++) {
					addHtml += '<option value="' + data.data[i].marketId + '">' + data.data[i].marketName + '</option>';
				}
				$(linkObj).find("select").html(addHtml);
				$("#agencyBrand select").html("<option disabled='disabled' selected='selected'>请选择所属品牌</option>");
				$("#agencySeries select").html("<option disabled='disabled' selected='selected'>请选择所属系列</option>");
				chooseShopID = "";
			}
			// 如果是获取品牌
			else if ($(linkObj).is("#agencyBrand")) {
				addHtml += "<option disabled='disabled' selected='selected'>请选择" + tipsName + "</option>";
				for (var i = 0; i < data.data.length; i++) {
					addHtml += '<option value="' + data.data[i].brandId + '">' + data.data[i].brandName + '</option>';
				}
				$(linkObj).find("select").html(addHtml);
				$("#agencySeries select").html("<option disabled='disabled' selected='selected'>请选择所属系列</option>");
				chooseShopID = "";
			}
			// 如果是获取系列
			else if ($(linkObj).is("#agencySeries")) {
				addHtml += "<option disabled='disabled' selected='selected'>请选择" + tipsName + "</option>";
				for (var i = 0; i < data.data.length; i++) {
					addHtml += '<option value="' + data.data[i].id + '">' + data.data[i].seriesName + '</option>';
				}
				$(linkObj).find("select").html(addHtml);
				chooseShopID = "";
			}
		}
	});
}
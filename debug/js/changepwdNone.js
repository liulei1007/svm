$(function () {
	var ifNull = false, ifPasswordSuccess = false;
    plumeLog("进入changepwd模板自定义js-" + plumeTime());

    if ((sessionStorage.login_mobilePhone!=undefined)&&sessionStorage.login_mobilePhone!="") {
        $(".mobile").val(sessionStorage.login_mobilePhone).attr("readOnly",true);
    }else{
        $(".mobile").val("").attr("readOnly",false);
    }

	$('button.btn-close').on('click', function () {
		$('div.popup').hide();
	});

    // 绑定表单输入框验证不为空事件
	// 必填项输入框或文本框失去焦点时，检查输入是否为空
	$(".body-typein").on("focus", ".form-group input, .form-group textarea, .form-group select", function () {
		// 清除可能存在的提示信息
		$(this).parents(".form-group").removeClass("has-warning").removeClass("has-error").find(".alert").remove();
	}).on("blur", ".form-group.required input, .form-group.required textarea", function () {
		checkFormNull($(this));
	}).on("blur", ".form-group.required select", function () {
		checkFormNull($(this));
	});

    // 验证手机号码是否已经注册
    $(".mobile").blur(function() {
        checkPhone($(this), "edit");
    });

    // "密码/确认密码"输入框失去焦点
	// -------------------------------------------------------
	$("#pwd, #repwd").blur(function() {
		checkPassword($(this));
	});

	$("div.fmg-back").on("click", function () {
		window.location.href = '/';
	});

    // 获取验证码按钮
    $("#cpdsendcode").bind("click", function () {
    	console.log("click");
    	if ($(".mobile").prop("readOnly")) { ifPhoneSuccess = true; }

        // 首先检验手机号是否已经注册
        else checkFormNull($(".mobile"));

        if (!ifPhoneSuccess) { return; }

        // 确保没有倒计时
        if (!sendMsgCount) { return; }

        var mobile = $(".mobile").val();
        loading();
        $.get(plumeApi["sendMsg"] + "/" + mobile + "/10003", {}, function (data) {
        	unloading();
        	if (data.ok) {
        		showPopTips("发送成功", "success", "短信验证码已成功发送到手机");
        		settime(60);
        	}
            else {
            	showPopTips("发送失败", "warning", data.resDescription);
            }
        });
    })

    // 提交按钮
    $("#cpdsub").bind("click", function () {
    	ifNull = false;
		// 首先确保数据都输入了
		$(".form-group.required input").each(function() {
			if (!checkFormNull($(this))) ifNull = true;
		});
		// 确保输入的数据都有效
		if (!ifPhoneSuccess || !ifPasswordSuccess || ifNull) { return; }

		var mobile = $(".mobile").val();
		var verifycode = $('.verifycode').val();
		var password = $('.password').val();
		var repassword = $('.repassword').val();

		loading();
		$.ajax({
			url: plumeApi["resetPassword"],
			type: "POST",
			data: JSON.stringify({
				"mobilePhone": mobile,
				"password": password,
				"rePassword": repassword,
				"verifyCode": verifycode
			}),
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				unloading();
				if (data.ok) {
					showPopTips("重置成功", "success", "密码重置成功", true);
	            } else {
					showPopTips("重置失败", "warning", data.resDescription);
	            }
			},
			error: function (error) {
				console.log(error);
			}
		});
	});

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

//密码验证: 6-15位字符，建议数字和字母组合
function pwdCheck(pwd) {
	return /^[0-9A-Za-z]{6,15}$/.test(pwd);
}

function loading() {
	if (!($(".lockbg").length > 0)) {
		$(document.body).append("<div class='lockbg'></div>");
		$(".lockbg").show();
	}

	if (!($(".loading").length > 0)) {
		var temp = '<div class="popcenter loading"></div>';
		$(document.body).append(temp);
	}
}

function unloading() {
	$(".lockbg").fadeOut(function () {
		$(this).remove();

	});
	$(".loading,.loading-img").fadeOut(function () {
		$(this).remove();
	});
}

var sendMsgCount = true;
function settime(countdown) {
    if (countdown == 0) {
        $(".timeshow").html("获取验证码").removeProp("disabled");
        sendMsgCount = true;
        return;
    } else {
        $(".timeshow").html(countdown + "s后重新发送").prop("disabled", "disabled");
        sendMsgCount = false;
        countdown--;
        setTimeout(function () {
            settime(countdown)
        }, 1000);
    }
}

function showPopTips(popupTitle, popupIcon, popupTips, flag) {
	$('div.popup-title').html(popupTitle);
	$('div.popup-info').html(popupTips);
	$("div.popup-icon").html('<i class="' + popupIcon + '"></i>');
	$('div.popup').show();
	flag ? setTimeout(function () {
		$('div.popup').hide();
		window.location.href = "/";
	}, 2000) : setTimeout(function () {
		$('div.popup').hide();
	}, 2000);
}

// 检验单个必填项是否填写
function checkFormNull(checkObj) {
	// 如果当前输入框为不可修改状态，退出验证
	if ($(checkObj).prop("disabled")) {
		return true;
	}

	var $formBlock = $(checkObj).parents(".form-group");
	// 如果当前输入框已有其他提示信息，退出
	if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {
		return false;
	}
	if (!$(checkObj).val() || $(checkObj).val().trim() == "") {
		var tipsText = $(checkObj).parents(".form-group").find(".control-label span").html();
		$(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入' + tipsText + '</div>');
		// $(checkObj).parent().after('<div class="col-sm-2 alert alert-default">请输入' + tipsText + '</div>').parents(".form-group").addClass("has-warning");
		return false;
	}
	else return true;
}

var ifPhoneSuccess = false;

// 检验手机号码
function checkPhone(checkObj, checkType) {
	// 清除可能存在的提示信息
	$(checkObj).parents(".form-group").removeClass("has-warning").removeClass("has-error").find(".alert").remove();
	ifPhoneSuccess = false;
	// 首先判断是否为空
	if (checkFormNull($(checkObj))) {
		// 其次判断是否符合手机号规则
		if (!isMobile($(checkObj).val().trim())) {
			var tipsText = $(checkObj).parents(".form-group").find(".control-label span").html();
			$(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入' + tipsText + '</div>');
			// $(checkObj).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请输入正确的手机号码</div>');
			return;
		}
		// 最后判断手机号是否已经存在
		checkPhoneExist($(checkObj), checkType);
	}
}

// 判断手机号是否已存在
function checkPhoneExist(checkObj, checkType) {
	var phone = $(checkObj).val().trim();
	$.ajax({
		type: "get",
		url: plumeApi["getUserInfoByMobile"] + phone,
		contentType: "application/json",
		dataType: "json",
		success: function (data) {
			if (data.ok) {
				if (checkType == "create") {
					ifPhoneSuccess = true;
				}
				else if (checkType == "edit") {
					ifPhoneSuccess = false;
					$(checkObj).parents(".form-group").addClass("has-error").append('<div class="col-sm-2 alert alert-danger">该手机号码未注册</div>');
				}
			}
			else if (data.data == null) {
				ifPhoneSuccess = false;
				$(checkObj).parents(".form-group").addClass("has-error").append('<div class="col-sm-2 alert alert-danger">手机号码是否存在检查异常</div>');
			}
			else if (data.data > 0) {
				if (checkType == "create") {
					ifPhoneSuccess = false;
					$(checkObj).parents(".form-group").addClass("has-error").append('<div class="col-sm-2 alert alert-danger">手机号码已经存在</div>');
				}
				else if (checkType == "edit") {
					ifPhoneSuccess = true;
				}
			}
			else {
				ifPhoneSuccess = false;
				$(checkObj).parents(".form-group").addClass("has-error").append('<div class="col-sm-2 alert alert-danger">手机号码检查接口返回值不能识别</div>');
			}
		}
	});
}

//手机号验证
function isMobile(n) {
	return /^1\d{10}$/.test(n) && n != 11111111111;
}
$(function () {
	var ifNull = false, ifPasswordSuccess = false;
    plumeLog("进入changepwd模板自定义js-" + plumeTime());

    if ((sessionStorage.login_mobilePhone!=undefined)&&sessionStorage.login_mobilePhone!="") {
        $(".mobile").val(sessionStorage.login_mobilePhone).attr("readOnly",true);
    }else{
        $(".mobile").val("").attr("readOnly",false);
    }

    // 绑定表单输入框验证不为空事件
    formControl();

    // 验证手机号码是否已经注册
    $(".mobile").blur(function() {
        checkPhone($(this), "edit");
    });

    // "密码/确认密码"输入框失去焦点
	// -------------------------------------------------------
	$("#pwd, #repwd").blur(function() {
		checkPassword($(this));
	});


    // 获取验证码按钮
    $("#cpdsendcode").bind("click", function () {
        // 首先检验手机号是否已经注册
        checkFormNull($(".mobile"), "edit");
        if (!ifPhoneSuccess) { return; }

        // 确保没有倒计时
        if (!sendMsgCount) { return; }

        var mobile = $(".mobile").val();
        loading();
        $.get(plumeApi["sendMsg"] + "/" + mobile + "/10003", {}, function (data) {
        	unloading();
        	if (data.ok) {
        		$('.pop').loadTemp("popTips", "nochangeurl", function () {
        			$(".pop").find(".popup-title").html("发送成功");
        			$(".pop").find(".popup-icon").html('<i class="success"></i>');
        			$(".pop").find(".popup-info").html("短信验证码已成功发送到手机");
        		});
        		settime(60);
        	}
            else {
            	$('.pop').loadTemp("popTips", "nochangeurl", function () {
        			$(".pop").find(".popup-title").html("发送失败");
        			$(".pop").find(".popup-icon").html('<i class="warning"></i>');
        			$(".pop").find(".popup-info").html(data.resDescription);
        		});
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
	                $('.pop').loadTemp("popTips", "nochangeurl", function () {
	                    $(".pop").find(".popup-title").html("重置成功");
	                    $(".pop").find(".popup-icon").html('<i class="success"></i>');
	                    $(".pop").find(".popup-info").html("密码重置成功");
	                });
	                window.location.href = "/";
	            } else {
	                $('.pop').loadTemp("popTips", "nochangeurl", function () {
	                    $(".pop").find(".popup-title").html("重置失败");
	                    $(".pop").find(".popup-icon").html('<i class="warning"></i>');
	                    $(".pop").find(".popup-info").html(data.resDescription);
	                });
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
})

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
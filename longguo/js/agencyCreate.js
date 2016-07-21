$(function () {
	var ifNull = false, ifRegionChoosed = false;
	// 绑定表单输入框验证不为空事件
	formControl();

	// 显示地区下拉列表
	getlistNationRegion();

	// // 验证手机号
	// $("#mobliephone1, #mobliephone2").blur(function() {
	// 	checkPhone($(this), "create");
	// });

	// 绑定Tab切换事件
    $(".form-block").on("click", "#li-hasAgency", function () {
        // 防止重复点击
        if ($(this).hasClass("active")) {
            return;
        }
        $(this).addClass("active").siblings().removeClass("active");

        // 显示不同表单
        $("#form-hasAgency").show().siblings(".form-horizontal").hide();
    }).on("click", "#li-findAgency", function () {
        // 防止重复点击
        if ($(this).hasClass("active")) {
            return;
        }
        $(this).addClass("active").siblings().removeClass("active");

        // 显示不同表单
        $("#form-findAgency").show().siblings(".form-horizontal").hide();
    });

    // 地区下拉列表
    function getlistNationRegion() {
        loading();
        $.get(plumeApi["listNationRegion"], {}, function (data) {
            unloading();
            $(".ac-provinceId").setPageData(data);
            $("#provinceId1").bind("change", function () {
                var adresscode = $(this).find("option:selected").attr("adresscode");
                loading();
                $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                    unloading();
                    $(".ac-cityId1").find("[list-node]").remove();
                    $(".ac-cityId1").setPageData(data);
                    $(".ac-cityId1").bind("change",function(){
                        listMarketInfo();
                    });
                });
            });
            $("#provinceId2").bind("change", function () {
                var adresscode = $(this).find("option:selected").attr("adresscode");
                loading();
                $.get(plumeApi["listNationRegion"] + "/" + adresscode, {}, function (data) {
                    unloading();
                    $(".ac-cityId2").find("[list-node]").remove();
                    $(".ac-cityId2").setPageData(data);
                    $(".ac-cityId2").bind("change",function(){
                        listMarketInfo();
                    });
                });
            });
        });
    }

    // 检验所在城市是否填写了
    function checkRegion(checkForm) {
    	var $regionForm = $(checkForm).find(".notNull");
    	var $formBlock = $regionForm.parents(".form-group");
    	// 如果当前输入框已有其他提示信息，退出
    	if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {
    		ifRegionChoosed = false;
        	return;
    	}
    	if ($regionForm.find("option:selected").text() == "") {
    		ifRegionChoosed = false;
    		$formBlock.addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请选择所在城市</div>');
    	}
    	else {
    		ifRegionChoosed = true;
    	}
    }

    // 点击“提交”按钮
    $(".btn-success").bind("click", function () {
    	
    	// 已有代理品牌
        if ($("#li-hasAgency").hasClass("active")) {
        	ifNull = false;
			// 首先确保数据都输入了
			$("#form-hasAgency .form-group.required input").each(function() {
				if (!checkFormNull($(this))) ifNull = true;
			});
			// 检验是否选择了所在城市
			checkRegion($("#form-hasAgency"));
			// 确保输入的数据都有效
			// if (!ifPhoneSuccess || !ifRegionChoosed || ifNull) { return; }
            if (!ifRegionChoosed || ifNull) { return; }

            var pram_str = '{';
            pram_str += '"brandName": "' + $("#brandName1").val() + '",';
            pram_str += '"contacts": "' + $("#contacts1").val() + '",';
            pram_str += '"mobliephone": "' + $("#mobliephone1").val() + '",';
            pram_str += '"provinceId": "' + $("#provinceId1").val() + '",';
            pram_str += '"provinceName": "' + $("#provinceId1").find("option:selected").text() + '",';
            pram_str += '"cityId": "' + $("#cityId1").val() + '",';
            pram_str += '"cityName": "' + $("#cityId1").find("option:selected").text() + '",';
            pram_str += '"marketId": "' + $("#marketId1").val() + '"';
            pram_str += '}';
            loading();
            $.ajax({
                type: "POST",
                url: plumeApi["addCompanyInfoCompany"],
                data: pram_str,
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    unloading();
                    if (data.ok) {
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("信息提示");
                            $(".pop").find(".popup-icon").html('<i class="success"></i>');
                            $(".pop").find(".popup-info").html("提交成功");
                        });
                        window.location.href = "waitCheck?fullscreen";
                    } else {
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("信息提示");
                            $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                            $(".pop").find(".popup-info").html("提交失败:" + data.data);
                        });
                    }
                }
            });
        }
        else {
            ifNull = false;
			// 首先确保数据都输入了
			$("#form-findAgency .form-group.required input").each(function() {
				if (!checkFormNull($(this))) ifNull = true;
			});
			// 检验是否选择了所在城市
			checkRegion($("#form-findAgency"));
			// 确保输入的数据都有效
            if (ifNull) { return; }
			// if (!ifPhoneSuccess || ifNull) { return; }

            var pram_str = '{';
            pram_str += '"brandName": "' + $("#brandName2").val() + '",';
            pram_str += '"categoryName": "' + $("#categoryName2").val() + '",';
            pram_str += '"contacts": "' + $("#contacts2").val() + '",';
            pram_str += '"mobliephone": "' + $("#mobliephone2").val() + '",';
            pram_str += '"provinceId": "' + $("#provinceId2").val() + '",';
            pram_str += '"provinceName": "' + $("#provinceId2").find("option:selected").text() + '",';
            pram_str += '"cityId": "' + $("#cityId2").val() + '",';
            pram_str += '"cityName": "' + $("#cityId2").find("option:selected").text() + '"';
            pram_str += '}';
            loading();
            $.ajax({
                type: "POST",
                url: plumeApi["addCompanyInfoPersonal"],
                data: pram_str,
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    unloading();
                    if (data.ok) {
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("信息提示");
                            $(".pop").find(".popup-icon").html('<i class="success"></i>');
                            $(".pop").find(".popup-info").html("提交成功");
                        });
                        window.location.href = "waitCheck?fullscreen";
                    } else {
                        $('.pop').loadTemp("popTips", "nochangeurl", function () {
                            $(".pop").find(".popup-title").html("信息提示");
                            $(".pop").find(".popup-icon").html('<i class="warning"></i>');
                            $(".pop").find(".popup-info").html("提交失败:" + data.data);
                        });
                    }
                }
            });
        }
    });
    function listMarketInfo() {
        var pram_str='{';
        pram_str+='"provinceId": '+$("#provinceId1").val()+',';
        pram_str+='"cityId": '+$("#cityId1").val()+',';
        pram_str+='"districtId": 0';
        pram_str+='}';
        loading();
        $.ajax({
            type: "POST",
            url: plumeApi["listMarketInfo"],
            data: pram_str,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                unloading();
                if (data.ok) {
                    $(".marketId1").find("[list-node]").remove();
                    $(".marketId1").setPageData(data);
                }
            }
        });
    }

    // 点击“返回”
    $(".btn-back").bind("click", function () {
        window.location.href = "/secondreg?fullscreen";
    });
});
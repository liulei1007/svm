$(function() {
	// 保存图片地址
	var imgSrc = "";
	var _imgSrc="";
	var ifNull = false;
	formControl();

	var brandId = session.brand_brandId;
	getBrand(brandId);

	// 点击上传品牌logo
	$("#upload-logo").bind("click", function() {
		$(this).parents(".form-group").removeClass("has-warning").removeClass("has-error").find(".alert").remove();
		uploadPop(function () {
			$('#myform').ajaxForm({
				dataType: 'json',
				success: function (data) {
					unloading();
					if (!data.data) {
						showPopTips("错误提示", "warning", "未查询到数据!");
						return;
					}
					if (data.ok) {
						var baseUrl = JSON.parse(session.img_url).data,
                            imgUrl = data.data || 0;
                        imgSrc = baseUrl[parseInt(Math.random() * (baseUrl.length))].codeValueCode + imgUrl[0].path;
						_imgSrc=imgUrl[0].path;
						var addHtml = '<img src="' + imgSrc + '" data_src="'+_imgSrc+'"/>'
						$("#upload-logo").html(addHtml);
						closeUploadPop();
					} else {
						showPopTips("上传失败", "warning", data.resDescription);
					}
				}

			});
			$(".pu-ok").bind("click", function () {
				if ($("[name=file]").val() == "") {
					showPopTips("上传提示", "warning", "请选择图片!");
				} else {
					loading();
					$('#myform').submit();
				}
			});
			$(".pu-cancel").bind("click", function () {
				closeUploadPop();
			});
		});
	});

	// 点击“返回”按钮
	$(".btn-back").bind("click", function() {
		derict(this,"brandList","nochangeurl");
	})
	
	// 点击“提交”按钮
	$(".btn-submit").click(function() {
		ifNull = false;
		// 首先检验品牌介绍是否输入了
		if (!checkFormNull($("#introduce"))) {ifNull = true;}

		// 其次判断是否上传了图片
		var $formBlock = $("#upload-logo").parents(".form-group");
		// 如果当前输入框已有其他提示信息，退出
		if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {ifNull = true;}
		else {
			if (imgSrc == "") {
				ifNull = true;
				$formBlock.addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请上传品牌logo</div>');
			}
		}
		
		if (ifNull) {return;}

		var data = {
			"id": brandId,
			"brandDescription": $("#introduce").val(),
			"brandLogoUrl": _imgSrc
		};

		loading();
		$.ajax({
			url: plumeApi["addBrandLogoAndDescInfo"],
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json;charset=UTF-8",
			success: function (data) {
				unloading();
				if (data.ok) {
					showPopTips("提交成功", "success", "品牌信息已提交成功");
					derict(this,"brandList","nochangeurl");
				}
				else {
					showPopTips("提交失败", "warning", data.resDescription);
				}
			}
		});
	});

	function getBrand(brandId) {
		loading();
		$.ajax({
			url: plumeApi["getOmsBrandInfo"] + brandId,
			type: "GET",
			contentType: "application/json;charset=UTF-8",
			success: function (data) {
				unloading();
				// 如果原先已有品牌logo，显示
				if (data.data.brandLogo) {
					var baseUrl = JSON.parse(session.img_url).data;
					imgSrc = baseUrl[parseInt(Math.random() * (baseUrl.length))].codeValueCode +data.data.brandLogo;
					console.log(imgSrc);
					$("#upload-logo").html('<img src="' + imgSrc + '" data_src="'+data.data.brandLogo+'"/>');
					_imgSrc=$('#upload-logo>img').attr('data_src');
					// console.log(_imgSrc);
				}
				// 如果原先已有品牌介绍，显示
				if (data.data.brandDescription) {
					$("#introduce").val(data.data.brandDescription);
				}
			}
		});
	}
});
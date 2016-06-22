$(function() {
	var ifNull = false;
	formControl();

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
						var imgSrc = data.data;
						var addHtml = '<img src="' + (JSON.parse(session.img_url).data)[parseInt(Math.random() * (JSON.parse(session.img_url).data.length))].codeValueCode + imgSrc + '" />'
						$("#upload-logo").html(addHtml);
						closeUploadPop();
					} else {
						alert(data.resDescription);
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
			if ($formBlock.find("img").html() == null) {
				ifNull = true;
				$formBlock.addClass("has-warning").append('<div class="col-sm-2 alert alert-default">请上传品牌logo</div>');
			}
		}
		
		if (ifNull) {return;}
	})
});
// 删除记录
function deleteRecode($removeLine, url, key) {
	$(".pop").loadTemp("popConfirmDelete", "nochangeurl", function() {
		$(".pop").show();
		
		// 弹出层的绑定事件：“确定”删除当前记录；“取消”隐藏弹出层
		$(".pop").on("click", ".btn-sure", function() {
			alert("yes");
			$removeLine.remove();
			$(".pop").off("click", ".btn-sure");
			$(".pop").hide();
			// unBind();
		}).on("click", ".btn-cancel", function() {
			alert("cancel");
			$(".pop").off("click", ".btn-cancel");
			$(".pop").hide();
			// unBind();
		});
	});
}

// 解绑
function unBind() {
	$(".pop").off("click", ".btn-sure");
	$(".pop").off("click", ".btn-cancel");
	// $(".pop .popup").remove();
	$(".pop").hide().find(".popup").remove();
	// $(".pop .popup").hide();
}


// 提交成功
function submitRecord(turnURL, url, data) {
	alert("already");
	$(".pop").loadTemp("popSubmitSuccess", "nochangeurl", function() {
		var timeOut = setTimeout(function() { turnPage(turnURL); }, 3000);
		$(".pop").on("click", ".btn-back", function() {
			clearTimeout(timeOut);
			turnPage(turnURL);
		});
	});
}
// 跳转页面
function turnPage(turnURL) {
	$(".pop").off("click", ".btn-back").hide().find(".popup").remove();
	derict(this, turnURL, "nochangeurl");
}
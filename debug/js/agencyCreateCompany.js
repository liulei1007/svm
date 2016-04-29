var thisUrl = "agencyCreateCompany";

$(function() {
	$('#startTime').cxCalendar();
	$("#endTime").cxCalendar();
	// 上传资料
	$(".btn-onload-info").on("click", function() {
		$(this).parents(".clearFix").append('<div class="col-sm-3"><span class="file-name">文件名称</span><span class="btn btn-link btn-link-delete" onclick="deleteInfo(this)">删除</span></div>');
	});
	// 点击“下一步”，提交表单
	$(".btn-next").on("click", function() {
		derict(this, "agencyAddAccount", "nochangeurl");
		// $(".work-space").loadTemp("agencyAddAccount","nochangeurl");
		// $("#addAccount").on("click", ".back", function() {
		// 	alert("back");
		// 	$(".work-space").loadTemp("agencyCreateCompany","nochangeurl");
		// });
	});
	// 点击“取消”，返回至列表页
	$(".btn-back").on("click", function() {
		derict(this, "agencyList", "nochangeurl");
		// $(".work-space").loadTemp("agencyList","nochangeurl");
	});
});

// 删除打包上传的资料
function deleteInfo(deleteObj) {
	$(deleteObj).parents(".col-sm-3").remove();
}

function turnBack() {
	alert("BACK!!");
	$(".back").bind("click", function() {
		alert("NOWBACK");
		$(".work-space").loadTemp("agencyCreateCompany","nochangeurl");
	});
	// $("#addAccount").on("click", ".back", function() {
	// 	alert("back");
	// 	$(".work-space").loadTemp("agencyCreateCompany","nochangeurl");
	// });
}